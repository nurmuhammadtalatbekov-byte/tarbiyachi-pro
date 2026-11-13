# Kontent va administrator uchun yo‘riqnoma

## Haftalik dars ritmi (tavsiya etilgan reja)
- Dushanba: maktabgacha pedagogika
- Seshanba: bola psixologiyasi
- Chorshanba: qonunchilik va me’yoriy hujjatlar
- Payshanba: “Ilk qadam” va metodika
- Juma: bola rivojlanishi
- Shanba: pedagogik mahorat va CASE
- Yakshanba: haftalik sinov

Har bir dars 30–45 daqiqa bo‘lishi mumkin. Darsdan keyin 10 savolli mustahkamlash testi, material va uyga vazifa joylashtiriladi. Jonli dars havolasi va yozuvlar administrator tomonidan kiritiladi.

## Savol banki sifat mezonlari
Har bir savolda:
- bitta aniq savol matni;
- 4 ta mantiqan bir-birini takrorlamaydigan variant (agar test formati shuni talab qilsa);
- faqat bitta to‘g‘ri javob (ko‘p javobli format alohida belgilanadi);
- asoslangan izoh;
- mavzu, qiyinlik darajasi;
- manba nomi, hujjat sanasi/raqami yoki dars materiali;
- kontent muharriri tasdig‘i bo‘lishi kerak.

AI yordamida yaratilgan savollar rasmiy attestatsiya savoli deb ko‘rsatilmasin. Nashrdan oldin mutaxassis tekshiruvi shart.

## Testni nashr etish
1. Testni draft holatida yarating.
2. Savollarni bankdan tanlang.
3. Savol matni, variant, to‘g‘ri javob, izoh va manbani tekshiring.
4. Test versiyasini muzlatib qo‘ying.
5. Sinovdan o‘tkazing.
6. Faqat keyin published holatiga o‘tkazing.

Nashrdan keyin savollarni tahrirlash eski urinish natijalarini o‘zgartirmasligi uchun `weekly_test_versions` va `question_versions` snapshot mexanizmi to‘liq qo‘llanilishi kerak.

## Dastlabki admin tayinlash
Supabase SQL Editor'da foydalanuvchining auth.users UUID qiymatini toping va:
```sql
update public.profiles set role='admin' where id='USER-UUID-HERE';
```
Bu amalni faqat loyiha egasi bajarsin. Hech qachon admin tayinlashni ochiq ro‘yxatdan o‘tish formasiga qo‘shmang.

## Muhim ishlar
- Savollarni rasmiy manbalar bilan tekshirish.
- Attestatsiya talablari va lavozimlar kesimidagi farqlarni amaldagi hujjatlardan tekshirish.
- Google OAuth va production URL sozlamalari.
- Video materiallar uchun ruxsatli havolalar.
- Backup, audit log, rate limit va kuzatuvni productiondan oldin sozlash.
