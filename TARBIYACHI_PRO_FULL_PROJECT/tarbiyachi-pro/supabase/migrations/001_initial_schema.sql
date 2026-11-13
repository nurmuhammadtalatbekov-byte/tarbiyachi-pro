-- TARBIYACHI PRO initial schema
-- Run in Supabase SQL Editor. UUIDs and answer keys remain server-side.
create extension if not exists pgcrypto;

create type public.app_role as enum ('learner','admin');
create type public.question_difficulty as enum ('easy','medium','hard');
create type public.test_status as enum ('draft','review','published','archived');
create type public.organization_type as enum ('state_mtt','family_non_state_mtt','other_non_state_mtt','other');
create type public.educator_role as enum ('educator','senior_educator','methodologist','mtt_leader','other');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  region text,
  organization_type public.organization_type not null default 'state_mtt',
  organization_name text,
  educator_role public.educator_role not null default 'educator',
  prep_track text,
  role public.app_role not null default 'learner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin') $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public
as $$
begin
  insert into public.profiles(id,full_name)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name',''))
  on conflict(id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  title text not null,
  description text,
  content_md text,
  video_url text,
  duration_minutes int,
  status public.test_status not null default 'draft',
  created_at timestamptz not null default now()
);
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.topics(id) on delete set null,
  prompt text not null,
  explanation text,
  difficulty public.question_difficulty not null default 'medium',
  source_note text,
  is_approved boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create table public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false,
  sort_order int not null default 0
);
create table public.question_versions (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  version_number int not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique(question_id,version_number)
);
create table public.weekly_tests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status public.test_status not null default 'draft',
  duration_minutes int not null default 60 check(duration_minutes between 1 and 240),
  published_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create table public.weekly_test_versions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.weekly_tests(id) on delete cascade,
  version_number int not null,
  title text not null,
  duration_minutes int not null,
  question_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique(test_id,version_number)
);
create table public.weekly_test_questions (
  test_id uuid not null references public.weekly_tests(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  sort_order int not null default 0,
  primary key(test_id,question_id)
);
create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  test_id uuid not null references public.weekly_tests(id) on delete restrict,
  test_version_id uuid references public.weekly_test_versions(id),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score_percent numeric(5,2),
  correct_count int,
  total_count int,
  created_at timestamptz not null default now()
);
create table public.attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  selected_option_id uuid references public.question_options(id) on delete set null,
  is_correct boolean,
  unique(attempt_id,question_id)
);

create index weekly_tests_status_published_idx on public.weekly_tests(status,published_at desc);
create index attempts_user_submitted_idx on public.attempts(user_id,submitted_at desc);
create index questions_topic_idx on public.questions(topic_id);

-- Public test payload contains question text/options only. No answer key.
create or replace function public.get_public_test_questions(p_test_id uuid)
returns jsonb language plpgsql stable security definer set search_path=public
as $$
declare result jsonb;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if not exists(select 1 from public.weekly_tests where id=p_test_id and status='published') then
    raise exception 'Test is not available';
  end if;
  select coalesce(jsonb_agg(jsonb_build_object(
    'id',q.id,'prompt',q.prompt,'explanation',q.explanation,
    'options',(select coalesce(jsonb_agg(jsonb_build_object('id',o.id,'text',o.option_text) order by o.sort_order),'[]'::jsonb)
               from public.question_options o where o.question_id=q.id)
  ) order by wtq.sort_order),'[]'::jsonb)
  into result
  from public.weekly_test_questions wtq
  join public.questions q on q.id=wtq.question_id and q.is_approved=true
  where wtq.test_id=p_test_id;
  return result;
end $$;

-- Validate answers and score on the database server. Answer keys never leave this function.
create or replace function public.submit_test_attempt(p_test_id uuid,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_attempt uuid;
  v_total int;
  v_correct int;
  v_score numeric(5,2);
  v_version uuid;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(p_answers) <> 'object' then raise exception 'Invalid answers payload'; end if;
  if not exists(select 1 from public.weekly_tests where id=p_test_id and status='published') then raise exception 'Test is not available'; end if;
  select count(*) into v_total
  from public.weekly_test_questions wtq join public.questions q on q.id=wtq.question_id and q.is_approved
  where wtq.test_id=p_test_id;
  if v_total=0 then raise exception 'Test has no approved questions'; end if;

  insert into public.attempts(user_id,test_id,total_count)
  values(v_user,p_test_id,v_total) returning id into v_attempt;

  insert into public.attempt_answers(attempt_id,question_id,selected_option_id,is_correct)
  select v_attempt,q.id,
    case when p_answers ? q.id::text then (p_answers->>q.id::text)::uuid else null end,
    exists(select 1 from public.question_options correct
           where correct.question_id=q.id and correct.is_correct
           and correct.id::text=p_answers->>q.id::text)
  from public.weekly_test_questions wtq
  join public.questions q on q.id=wtq.question_id and q.is_approved
  where wtq.test_id=p_test_id;

  select count(*) into v_correct from public.attempt_answers where attempt_id=v_attempt and is_correct=true;
  v_score := round((v_correct::numeric / v_total::numeric)*100,2);
  update public.attempts set submitted_at=now(),correct_count=v_correct,score_percent=v_score where id=v_attempt;
  return jsonb_build_object('attempt_id',v_attempt,'score_percent',v_score,'correct_count',v_correct,'total_count',v_total);
end $$;

-- RLS
alter table public.profiles enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.question_versions enable row level security;
alter table public.weekly_tests enable row level security;
alter table public.weekly_test_versions enable row level security;
alter table public.weekly_test_questions enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_answers enable row level security;

create policy "profiles read own or admin" on public.profiles for select using (id=auth.uid() or public.is_admin());
create policy "profiles update own or admin" on public.profiles for update using (id=auth.uid() or public.is_admin()) with check (id=auth.uid() or public.is_admin());
create policy "topics visible published" on public.topics for select using (is_published or public.is_admin());
create policy "topics admin manage" on public.topics for all using (public.is_admin()) with check (public.is_admin());
create policy "lessons visible published" on public.lessons for select using (status='published' or public.is_admin());
create policy "lessons admin manage" on public.lessons for all using (public.is_admin()) with check (public.is_admin());
create policy "questions admin only" on public.questions for all using (public.is_admin()) with check (public.is_admin());
create policy "options admin only" on public.question_options for all using (public.is_admin()) with check (public.is_admin());
create policy "question versions admin only" on public.question_versions for all using (public.is_admin()) with check (public.is_admin());
create policy "published tests visible" on public.weekly_tests for select using (status='published' or public.is_admin());
create policy "tests admin manage" on public.weekly_tests for all using (public.is_admin()) with check (public.is_admin());
create policy "test versions admin only" on public.weekly_test_versions for all using (public.is_admin()) with check (public.is_admin());
create policy "test questions admin only" on public.weekly_test_questions for all using (public.is_admin()) with check (public.is_admin());
create policy "attempts own or admin" on public.attempts for select using (user_id=auth.uid() or public.is_admin());
create policy "attempt answers own or admin" on public.attempt_answers for select using (exists(select 1 from public.attempts a where a.id=attempt_id and (a.user_id=auth.uid() or public.is_admin())));

grant execute on function public.get_public_test_questions(uuid) to authenticated;
grant execute on function public.submit_test_attempt(uuid,jsonb) to authenticated;
grant execute on function public.is_admin() to authenticated;

-- Starter topics; publish status is false until reviewed and completed with actual learning materials.
insert into public.topics(title,description,category,sort_order,is_published) values
('Maktabgacha pedagogika','Maktabgacha ta’limning pedagogik asoslari va ta’lim-tarbiya jarayoni.','Pedagogika',1,false),
('Bola psixologiyasi','Bolaning yosh xususiyatlari, ehtiyojlari va rivojlanish qonuniyatlari.','Psixologiya',2,false),
('Me’yoriy-huquqiy asoslar','Maktabgacha ta’lim sohasidagi amaldagi me’yoriy hujjatlarni o‘rganish.','Qonunchilik',3,false),
('“Ilk qadam” va metodika','Davlat o‘quv dasturi va ta’lim faoliyatini rejalashtirish metodikasi.','Metodika',4,false),
('Bola rivojlanishi','Rivojlanish sohalari, kuzatuv va rivojlantiruvchi muhit.','Rivojlanish',5,false),
('Pedagogik mahorat va CASE','Pedagogik vaziyatlarni tahlil qilish va amaliy yechimlar.','Amaliyot',6,false);
