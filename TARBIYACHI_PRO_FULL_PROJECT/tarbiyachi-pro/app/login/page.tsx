"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Chrome, Mail } from "lucide-react";

export default function LoginPage() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  const router=useRouter();
  async function googleLogin() {
    setBusy(true); setMessage("");
    try { const supabase=createClient(); const {error}=await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${window.location.origin}/auth/callback?next=/dashboard`}}); if(error) throw error; }
    catch(e){setMessage(e instanceof Error?e.message:"Kirishda xatolik.");setBusy(false);}
  }
  async function emailLogin(e:React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    try { const supabase=createClient(); const {error}=await supabase.auth.signInWithPassword({email,password}); if(error) throw error; router.push("/dashboard"); router.refresh(); }
    catch(e){setMessage(e instanceof Error?e.message:"Kirishda xatolik.");}
    finally{setBusy(false);}
  }
  async function signUp() {
    setBusy(true); setMessage("");
    try { const supabase=createClient(); const {error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${window.location.origin}/auth/callback?next=/dashboard`}}); if(error) throw error; setMessage("Tasdiqlash havolasi emailingizga yuborildi."); }
    catch(e){setMessage(e instanceof Error?e.message:"Ro‘yxatdan o‘tishda xatolik.");}
    finally{setBusy(false);}
  }
  return <main className="min-h-screen bg-cream px-5 py-8"><div className="mx-auto max-w-md"><Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-muted"><ArrowLeft size={16}/> Bosh sahifaga</Link><div className="card p-7 sm:p-9"><Brand/><h1 className="mt-9 text-3xl font-black">Akademiyaga xush kelibsiz!</h1><p className="mt-2 text-sm leading-6 text-muted">O‘qishni davom ettirish uchun hisobingizga kiring yoki ro‘yxatdan o‘ting.</p>
    <button onClick={googleLogin} disabled={busy} className="btn-secondary mt-7 w-full"><Chrome size={18}/> Google orqali davom etish</button>
    <div className="my-6 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-[#eae6dd]"/> yoki email orqali <span className="h-px flex-1 bg-[#eae6dd]"/></div>
    <form onSubmit={emailLogin} className="space-y-4"><label className="block text-sm font-bold">Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-[#e6e2d9] bg-[#fffefa] px-4 py-3 outline-none focus:border-[#85b39d]" placeholder="email@example.com"/></label><label className="block text-sm font-bold">Parol<input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-[#e6e2d9] bg-[#fffefa] px-4 py-3 outline-none focus:border-[#85b39d]" placeholder="Kamida 6 belgi"/></label><button disabled={busy} className="btn-primary w-full disabled:opacity-50">{busy?"Kutilmoqda...":<><Mail size={17}/> Email bilan kirish</>}</button></form>
    <button onClick={signUp} disabled={busy||!email||password.length<6} className="mt-3 w-full rounded-xl py-3 text-sm font-bold text-[#668b78] hover:bg-[#eff6f0] disabled:opacity-40">Yangi hisob yaratish</button>
    {message&&<p role="status" className="mt-4 rounded-xl bg-[#fff3dd] p-3 text-sm text-[#72572b]">{message}</p>}
    <p className="mt-6 text-xs leading-5 text-muted">Google orqali kirish shaxsning kasbiy malakasi yoki attestatsiya toifasini tasdiqlamaydi. Profil ma’lumotlarini keyin to‘ldirishingiz mumkin.</p>
  </div></div></main>;
}
