import Link from "next/link";
import { Brand } from "./Brand";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return <header className="relative z-10 border-b border-[#e9e4d8] bg-cream/90 backdrop-blur">
    <div className="container flex h-[78px] items-center justify-between">
      <Brand/>
      <nav className="hidden items-center gap-8 text-sm font-semibold text-[#596071] md:flex">
        <a href="#imkoniyatlar" className="hover:text-ink">Imkoniyatlar</a>
        <a href="#qanday-ishlaydi" className="hover:text-ink">Qanday ishlaydi?</a>
        <a href="#yonalishlar" className="hover:text-ink">Yo‘nalishlar</a>
      </nav>
      <Link href="/login" className="btn-primary text-sm">Kirish <ArrowUpRight size={16}/></Link>
    </div>
  </header>;
}
