
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Brand } from "@/components/Brand";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Scale,
  Blocks,
  Baby,
} from "lucide-react";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const icons = [BookOpen, Brain, Scale, Blocks, Baby, BookOpen];

export default async function AcademyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: topics, error } = await supabase
    .from("topics")
    .select("id, title, description, category")
    .eq("is_published", true)
    .order("sort_order");

  return (
    <main className="min-h-screen bg-[#F7F8F4]">
      <header className="border-b bg-white">
        <div className="container flex h-[76px] items-center justify-between">
          <Brand />

          <Link
            href="/dashboard"
            className="text-sm font-bold text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Panel
            </span>
          </Link>
        </div>
      </header>

      <div className="container py-10">
        <h1 className="text-3xl font-black">
          Mavzuli akademiya
        </h1>

        <p className="mt-2 text-muted">
          Attestatsiyaga tayyorgarlikning asosiy yo‘nalishlari.
        </p>

        {error ? (
          <div className="card mt-7 p-7 text-sm text-red-600">
            Mavzularni yuklashda xatolik yuz berdi. Keyinroq qayta urinib ko‘ring.
          </div>
        ) : topics && topics.length > 0 ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => {
              const Icon = icons[index % icons.length];

              return (
                <article
                  key={topic.id}
                  className="card p-6"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E6F1E9]">
                    <Icon size={25} />
                  </div>

                  <h2 className="mt-4 text-lg font-black">
                    {topic.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {topic.description ||
                      "Mavzu bo‘yicha o‘quv materiallari."}
                  </p>

                  <span className="mt-4 inline-block rounded-full bg-[#f1f3ee] px-3 py-1 text-xs font-bold text-[#688b77]">
                    {topic.category}
                  </span>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="card mt-7 p-7 text-sm leading-6 text-muted">
            Mavzular administrator tomonidan kiritilgach shu yerda paydo bo‘ladi.
          </div>
        )}
      </div>
    </main>
  );
}
