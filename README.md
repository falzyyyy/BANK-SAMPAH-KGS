# 🍃 Bank Sampah KGS Palembang
> **"Turning Waste into Worth — Empowering Palembang’s Circular Economy"**
> 
> Platform digital berestetika premium editorial-organik untuk tata kelola sampah mandiri, edukasi lingkungan, dan pemberdayaan ekonomi sirkular masyarakat Kota Palembang.

---

## 📊 Slide 1: Problem & Solution

### 🛑 The Problem
*   **Sampah Domestik Tak Terkelola**: Tumpukan sampah rumah tangga tanpa pemilahan yang memicu pencemaran lingkungan lokal di Palembang.
*   **Kurangnya Transparansi Harga**: Masyarakat kesulitan memantau harga pasar riil sampah daur ulang secara instan.
*   **Kurangnya Edukasi Aksi**: Edukasi pengelolaan sampah (Organik, Anorganik, B3) sering kali membosankan dan kurang interaktif.

### ✨ The Solution (KGS Platform)
*   **Katalog Harga Transparan**: Daftar harga penukaran sampah (Plastik, Kardus, Kaleng) yang diperbarui secara langsung oleh Admin.
*   **Dampak Nyata yang Tervisualisasi**: Dashboard statistik dinamis yang mengonversi kilogram sampah daur ulang menjadi metrik dampak nyata (contoh: jumlah pohon diselamatkan).
*   **Navigasi Ramah Pengguna**: Layout responsif premium dengan transisi halaman yang mulus dan aset animasi 3D.

---

## 🚀 Slide 2: Core Features (Fitur Utama)

1.  **Page Preloader (Splash Screen)**
    *   Animasi pembuka logo daun KGS yang dinamis dan elegan saat situs pertama kali dimuat.
2.  **3D Assets & Animasi Interaktif**
    *   Integrasi render bentuk 3D menggunakan WebGL/Three.js yang mengambang lembut mengikuti interaksi cursor mouse pengunjung.
3.  **Grafik Dampak Lingkungan Berdampingan**
    *   Layout modern dua kolom: Kolom Kiri menampilkan metrik ekologis (hemat energi, selamatkan pohon) dan Kolom Kanan menyajikan visualisasi grafik batang kontribusi sampah (`WasteChart`).
4.  **Katalog & Edukasi 3R**
    *   Panduan pemilahan komprehensif untuk sampah Organik, Anorganik, dan B3 lengkap dengan tindakan yang dianjurkan (Do's & Don'ts).
5.  **WhatsApp Chat Integration**
    *   Tombol melayang (*floating button*) di sudut halaman yang terhubung langsung ke WhatsApp Admin KGS untuk koordinasi penjemputan/penyetoran sampah yang praktis.
6.  **Hidden Admin Panel (`/admin`)**
    *   Panel admin yang aman tanpa tombol fisik di halaman publik. Admin dapat mengelola:
        *   Data statistik setoran sampah bulanan.
        *   Daftar harga katalog sampah daur ulang.
        *   Slide promosi Hero Carousel.
        *   Informasi alamat dan peta kontak operasional.

---

## 🛠️ Slide 3: The Tech Stack

*   **Frontend Framework**: Next.js 15.3.3 (React, App Router, TypeScript)
*   **Styling**: Tailwind CSS & Vanilla CSS custom variables (untuk fluid dark/light mode)
*   **3D Render**: Three.js & Lucide React Icons
*   **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, JS Client)
*   **Hosting Compatibility**: Vercel / Netlify / VPS Linux

---

## ⚙️ Slide 4: Getting Started (Cara Menjalankan)

### 1. Prasyarat
*   Node.js versi 18.x atau yang lebih baru.
*   Akun Supabase (untuk menyimpan data dinamis).

### 2. Konfigurasi Environment (`.env.local`)
Buat berkas `.env.local` di direktori utama proyek Anda dan isi dengan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat situs web.

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 💎 Slide 5: The Impact & Mission

> *"Perempuan memiliki peran strategis dalam pengelolaan sampah karena sebagian besar sampah dihasilkan dari sampah rumah tangga. Sekarang perempuan harus peduli lingkungan sebab, sampah paling banyak dihasilkan dari rumah tangga."*
> 
> — **Welis Fatimah**, Direktur Bank Sampah KGS Palembang

KGS berkomitmen menjadi pelopor ekonomi sirkular ramah lingkungan di Palembang, mengubah kebiasaan membuang sampah menjadi tabungan bernilai ekonomis yang berkelanjutan.
