# Platform Kolaborasi Jagoan Banyuwangi

Platform kolaborasi untuk Jagoan Banyuwangi yang memungkinkan peserta untuk saling berkolaborasi, mengajukan pertanyaan, dan mencari mitra kerja.

## Fitur Utama

- **Landing Page** - Hero section, value proposition, testimoni, dan call-to-action
- **Dashboard User** - Statistik, aktivitas terbaru, dan grid profil peserta
- **Dashboard Admin** - Sistem admin untuk membalas pertanyaan dan mendata kolaborasi
- **Sistem Registrasi Dinamis** - 3 kategori (Jagoan Digital, Tani, Bisnis) dengan form berbeda
- **Google OAuth Integration** - Login otomatis dengan Google
- **Sistem Kolaborasi** - Form pembuatan tim kolaborasi dengan integrasi ke admin dashboard

## Teknologi

- Next.js 14
- TypeScript
- Tailwind CSS v4
- Shadcn/ui Components
- Lucide React Icons
- Recharts untuk grafik

## Menjalankan Aplikasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka [http://localhost:3000](http://localhost:3000) di browser

## Struktur Halaman

- `/` - Landing page
- `/login` - Halaman login
- `/register` - Halaman registrasi
- `/dashboard` - Dashboard peserta
- `/admin-dashboard` - Dashboard admin
- `/cari-kolaborator` - Halaman pencarian kolaborator
- `/profile-edit` - Edit profil
- `/ajukan-pertanyaan` - Form ajukan pertanyaan
- `/daftar-notifikasi` - Daftar notifikasi
- `/buat-kolaborasi` - Form buat kolaborasi

## Kredensial Admin

- Email: admin@gmail.com
- Password: 1234

## Build untuk Production

```bash
npm run build
npm start
```