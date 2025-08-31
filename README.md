# Jagoan Banyuwangi Collaboration Platform

Platform website untuk **konsultasi dan kolaborasi** peserta Jagoan Banyuwangi.  
Dibuat untuk mempermudah peserta memahami program, berdiskusi, dan membentuk tim lintas kategori (Digital, Tani, Bisnis).

---

## 🎯 Latar Belakang
Setiap tahun, format program **Jagoan Banyuwangi** sering berubah, sehingga:
- Peserta baru kesulitan memahami alur program.
- Peserta lama perlu adaptasi dengan format terbaru.
- Waktu perkenalan antar peserta sangat terbatas → kolaborasi sulit terbentuk.

👉 Solusi kami: **Website platform konsultasi & kolaborasi** agar peserta bisa:
- Bertanya & diskusi tentang program.
- Melihat profil peserta lain.
- Mengajukan kolaborasi dan mengundang peserta lain.

---

## ✨ Fitur Utama
Saat ini (prototype):
- [x] Tampilan web (UI dummy dengan data statis).
- [x] Upload pertanyaan untuk konsultasi.
- [x] Autentikasi pengguna.
- [ ] CRUD profil peserta.
- [ ] Halaman profil peserta lain
- [ ] Rekomendasi kolaborasi
- [ ] Form pengajuan kolaborasi.

---

## 🛠️ Teknologi yang Digunakan
- **Frontend**: Figma (desain UI, dengan bantuan AI prompt. Tersedia: https://www.figma.com/design/YdAvOr4lujPZ4RyIZGLCGQ/Jagoan-Banyuwangi), implementasi awal via *Gemini CLI*.  
- **Backend & Database**: [Supabase](https://supabase.com/) (desain database + authentication).  
- **Tools**: GitHub, CLI tools, prompt engineering.  

---

## 🚀 Cara Menjalankan
> Catatan: project masih tahap prototipe → sebagian fitur dummy.

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/jagoan-banyuwangi-platform.git
   cd jagoan-banyuwangi-platform 

2. Run `npm i` to install the dependencies.

3. Run `npm run dev` to start the development server.
