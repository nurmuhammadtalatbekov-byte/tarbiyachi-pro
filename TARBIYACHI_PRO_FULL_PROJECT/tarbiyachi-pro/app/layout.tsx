import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TARBIYACHI PRO — Attestatsiyaga tayyorlov akademiyasi",
  description: "Maktabgacha ta’lim pedagoglari uchun testlar, darslar va bilim tahlili.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uz"><body>{children}</body></html>;
}
