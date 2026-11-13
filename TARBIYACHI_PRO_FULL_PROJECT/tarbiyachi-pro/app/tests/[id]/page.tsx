import { redirect,notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TestRunner } from "@/components/TestRunner";
export const metadata={robots:{index:false,follow:false}};
export default async function TestPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const s=await createClient();const {data:{user}}=await s.auth.getUser();if(!user)redirect("/login");
 const {data:test}=await s.from("weekly_tests").select("id,title,description,status").eq("id",id).eq("status","published").maybeSingle();if(!test)notFound();
 const {data:items,error}=await s.rpc("get_public_test_questions",{p_test_id:id});
 if(error||!items) return <main className="min-h-screen bg-cream p-8"><div className="mx-auto max-w-xl rounded-3xl bg-white p-8">Test savollarini yuklab bo‘lmadi. Supabase migratsiyasi to‘g‘ri bajarilganini tekshiring.</div></main>;
 return <TestRunner testId={test.id} title={test.title} description={test.description||""} questions={items}/>;
}
