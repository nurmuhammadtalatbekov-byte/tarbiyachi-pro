# TARBIYACHI PRO

Maktabgacha ta’lim pedagoglari uchun attestatsiyaga tayyorlov akademiyasi.

## Muhim
Bu loyiha productionga tayyorlangan boshlang‘ich kod bazasi. Haqiqiy foydalanuvchi, test natijalari va administrator huquqlari Supabase orqali ishlashi uchun avval Supabase loyihasini sozlash va SQL migratsiyani bajarish kerak. `.env.example` ni `.env.local` ga ko‘chirib, qiymatlarni kiriting. Service Role kalitini hech qachon brauzerga chiqarmang.

## Ishga tushirish (Windows)
1. Node.js LTS va Git o‘rnating.
2. ZIP arxivni oching.
3. Shu papkada terminal oching:
   ```bash
   npm install
   ```
4. `.env.example` faylidan `.env.local` nusxa yarating va Supabase qiymatlarini kiriting.
5. Supabase SQL Editor ichida `supabase/migrations/001_initial_schema.sql` faylini to‘liq bajaring.
6. `npm run dev` buyrug‘ini bajaring.
7. Brauzerda http://localhost:3000 ni oching.

## Supabase sozlash
- Supabase'da yangi project yarating.
- Authentication > Providers > Google bo‘limida Google OAuth ni yoqing.
- Google Cloud Console'da OAuth client yarating; Supabase ko‘rsatgan callback URL ni Authorized redirect URI ga qo‘shing.
- Supabase Authentication > URL Configuration:
  - Site URL: `http://localhost:3000`
  - Redirect URLs: `http://localhost:3000/auth/callback`, hamda keyinchalik production domeningiz.
- SQL Editor'da migratsiyani ishga tushiring.
- Birinchi administratorni tayinlash uchun `profiles.role = 'admin'` qiymatini faqat ishonchli SQL Editor orqali belgilang.

## Asosiy imkoniyatlar
- Google/email orqali autentifikatsiya uchun Supabase SSR integratsiyasi.
- Profil: hudud, MTT turi, tashkilot, lavozim va tayyorgarlik yo‘nalishi.
- O‘quv paneli va mavzular.
- Supabase'dan olinadigan haftalik testlar va savollar.
- Server tomonda javoblarni tekshirish; javob kaliti test yakunlanguncha klientga yuborilmaydi.
- Urinishlar, natijalar va mavzu kesimidagi tahlil.
- Administrator uchun test yaratish/nashr qilish API asoslari va RLS.
- Haftalik testlar va savollarni versiyalash uchun ma’lumotlar modeli.

## Hozircha sozlanishi kerak bo‘lgan tashqi xizmatlar
Google OAuth, Supabase loyiha kalitlari, production domeni, video darslar uchun Zoom/Meet havolalari, rasm va video materiallar. Bularni soxta qiymatlar bilan to‘ldirmang.

## Buyruqlar
- `npm run dev` — lokal ishlab chiqish
- `npm run typecheck` — TypeScript tekshiruvi
- `npm run build` — production build
