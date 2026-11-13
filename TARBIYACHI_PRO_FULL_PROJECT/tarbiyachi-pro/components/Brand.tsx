import Link from "next/link";
import { Sprout } from "lucide-react";
export function Brand() {
  return <Link href="/" className="flex items-center gap-3 no-underline text-ink">
    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-ink"><Sprout size={24}/></span>
    <span className="leading-tight"><b className="block text-lg tracking-tight">TARBIYACHI <span className="text-[#7a9c8d]">PRO</span></b><small className="text-xs text-muted">Bilim. Tajriba. Natija.</small></span>
  </Link>;
}
