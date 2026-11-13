import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, BookOpenCheck, Brain, CalendarDays, ChartNoAxesCombined, ClipboardCheck, GraduationCap, ShieldCheck, Sparkles, Star, Target, Users } from "lucide-react";

const features = [
  { icon: ClipboardCheck, title: "Attestatsiya testlari", desc: "Mavzular bo‘yicha mashqlar, haftalik nazorat va imtihon simulyatori.", bg: "bg-[#FFB9A5]" },
  { icon: Brain, title: "Pedagogik CASE", desc: "Amaliy vaziyatlarni tahlil qiling va pedagogik qaror qabul qilishni mashq qiling.", bg: "bg-[#BBA5D9]" },
  { icon: BookOpenCheck, title: "Mavzuli akademiya", desc: "Pedagogika, psixologiya, qonunchilik va metodika bo‘yicha o‘rganing.", bg: "bg-[#A9DCC8]" },
  { icon: ChartNoAxesCombined, title: "Shaxsiy tahlil", desc: "Kuchli va rivojlantirish kerak bo‘lgan mavzularingizni kuzating.", bg: "bg-[#A9B9ED]" },
];
export default function Home() {
  return <main className="overflow-hidden">
    <Navbar/>
    <section className="relative py-16 md:py-24">
      <div className="hero-orb right-[5%] top-12 h-64 w-64 bg-[#F7D66D]/60"/>
      <div className="hero-orb -left-20 bottom-0 h-64 w-64 bg-[#A9DCC8]/60"/>
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8e1d2] bg-white/80 px-4 py-2 text-xs font-bold text-[#64776d]"><Sparkles size={15}/> MAKTABGACHA TA’LIM PEDAGOGLARI UCHUN</div>
          <h1 className="max-w-[700px] text-5xl font-black leading-[1.08] tracking-[-.055em] md:text-7xl">Attestatsiyaga <span className="relative inline-block"><span className="relative z-10">ishonch</span><span className="absolute bottom-1 left-0 -z-0 h-4 w-full rounded-full bg-sunshine md:h-6"/></span> bilan tayyorlaning.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">Bilimingizni mustahkamlang, pedagogik vaziyatlarni tahlil qiling va tayyorgarlik darajangizni aniq kuzatib boring.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/login" className="btn-primary">Akademiyani boshlash <ArrowRight size={18}/></Link><a href="#imkoniyatlar" className="btn-secondary">Imkoniyatlarni ko‘rish</a></div>
          <div className="mt-9 flex flex-wrap gap-5 text-sm text-[#697181]"><span className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#6b9b86]"/> Bepul boshlash</span><span className="flex items-center gap-2"><Users size={17} className="text-[#6b9b86]"/> Turli MTT pedagoglari uchun</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-5 top-12 h-24 w-24 rounded-[30px] bg-[#FFB9A5] rotate-[-12deg]"/>
          <div className="absolute -right-3 bottom-10 h-28 w-28 rounded-full bg-[#BBA5D9]"/>
          <div className="relative rounded-[34px] border border-white bg-white/80 p-5 shadow-soft backdrop-blur">
            <div className="rounded-[27px] bg-[#EEF5EF] p-6">
              <div className="flex items-center justify-between"><span className="text-sm font-bold text-[#6a8174]">SIZNING O‘QUV MAKONINGIZ</span><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#6a8174]">PRO</span></div>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-[25px] bg-[#F7D66D] text-4xl">📚</div>
                <div><p className="text-2xl font-black">Har kuni bir qadam</p><p className="mt-1 text-sm text-muted">Maqsad sari izchil harakat</p></div>
              </div>
              <div className="mt-7 rounded-2xl bg-white p-4">
                <div className="flex justify-between text-sm font-bold"><span>Haftalik tayyorgarlik</span><span className="text-[#719985]">Reja asosida</span></div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#edf0eb]"><div className="h-full w-[68%] rounded-full bg-[#A9DCC8]"/></div>
                <p className="mt-2 text-xs text-muted">Darslar, mashqlar va takrorlash — yagona tizimda.</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#FFF2D0] p-4"><Target size={20}/><b className="mt-2 block">Maqsadli</b><small className="text-muted">Tayyorgarlik rejasi</small></div>
                <div className="rounded-2xl bg-[#E8E4F5] p-4"><Star size={20}/><b className="mt-2 block">Rag‘bat</b><small className="text-muted">Yutuqlar tizimi</small></div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-7 rounded-2xl bg-white px-4 py-3 shadow-soft"><span className="text-xl">🌱</span><b className="ml-2 text-sm">Kichik qadam — katta natija</b></div>
        </div>
      </div>
    </section>
    <section id="imkoniyatlar" className="bg-white py-20">
      <div className="container"><div className="max-w-2xl"><span className="text-xs font-black tracking-[.18em] text-[#789a88]">PLATFORMANING IMKONIYATLARI</span><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Tayyorgarlik uchun kerakli vositalar — bir joyda.</h2><p className="mt-4 leading-7 text-muted">Nazariya, amaliyot va natijalar bir-birini to‘ldiradigan yagona o‘quv muhiti.</p></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{features.map((f) => <article key={f.title} className="rounded-[25px] border border-[#eeeae1] bg-[#fffefa] p-6 transition hover:-translate-y-1 hover:shadow-soft"><div className={`grid h-12 w-12 place-items-center rounded-2xl ${f.bg}`}><f.icon size={23}/></div><h3 className="mt-5 text-lg font-extrabold">{f.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{f.desc}</p></article>)}</div>
      </div>
    </section>
    <section id="qanday-ishlaydi" className="py-20"><div className="container grid gap-12 lg:grid-cols-2 lg:items-center"><div><span className="text-xs font-black tracking-[.18em] text-[#789a88]">TIZIMLI YONDASHUV</span><h2 className="mt-3 text-4xl font-black tracking-tight">O‘rganing. Mashq qiling. Tahlil qiling.</h2><p className="mt-4 leading-7 text-muted">Har bir mavzu dars, mustahkamlash testi va uyga vazifa bilan bog‘lanadi. Haftalik sinov esa o‘zlashtirish darajasini ko‘rsatadi.</p><Link href="/login" className="btn-primary mt-7">Boshlash <ArrowRight size={17}/></Link></div>
      <div className="grid gap-4 sm:grid-cols-2"><div className="card p-6"><CalendarDays className="text-[#719985]"/><h3 className="mt-4 font-extrabold">Kunlik darslar</h3><p className="mt-2 text-sm leading-6 text-muted">30–45 daqiqalik jonli mashg‘ulotlar va yozuvlar arxivi.</p></div><div className="card p-6"><GraduationCap className="text-[#8c79b2]"/><h3 className="mt-4 font-extrabold">Mavzuli yo‘nalishlar</h3><p className="mt-2 text-sm leading-6 text-muted">Pedagogika, psixologiya, me’yoriy hujjatlar va metodika.</p></div><div className="card p-6 sm:col-span-2"><div className="flex items-center gap-4"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF2D0]"><ChartNoAxesCombined/></div><div><h3 className="font-extrabold">Xatolar tahlili va shaxsiy rivojlanish</h3><p className="mt-1 text-sm text-muted">Natijalar asosida qaysi mavzularni qayta o‘rganish kerakligini aniqlang.</p></div></div></div></div>
    </div></section>
    <section id="yonalishlar" className="bg-[#EAF3ED] py-16"><div className="container text-center"><span className="text-xs font-black tracking-[.18em] text-[#789a88]">KIMLAR UCHUN?</span><h2 className="mt-3 text-3xl font-black md:text-4xl">Maktabgacha ta’limning turli pedagoglari uchun</h2><div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">{["Davlat MTT pedagoglari","Oilaviy nodavlat MTT pedagoglari","Boshqa nodavlat MTT pedagoglari","Metodist va rahbarlar"].map(x=><div key={x} className="rounded-2xl bg-white p-4 text-sm font-bold shadow-sm"><span className="mr-2 text-[#719985]">✓</span>{x}</div>)}</div><p className="mx-auto mt-6 max-w-2xl text-xs leading-5 text-muted">Attestatsiya talablari lavozim va tashkilot turiga qarab farq qilishi mumkin. Platformadagi tayyorgarlik materiallari amaldagi rasmiy talablarni almashtirmaydi.</p></div></section>
    <footer className="bg-ink py-10 text-white"><div className="container flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-lg font-black">TARBIYACHI PRO</p><p className="mt-1 text-sm text-white/60">Bilim. Tajriba. Natija.</p></div><p className="text-xs text-white/50">© 2026 TARBIYACHI PRO. Barcha huquqlar himoyalangan.</p></div></footer>
  </main>;
}
