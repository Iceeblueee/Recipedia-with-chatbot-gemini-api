# 🍳 Recipedia – AI-Powered Recipe Finder & Cooking Assistant

> _"Temukan Inspirasi, Ciptakan Rasa."_

**Recipedia** adalah platform penemuan resep kuliner modern yang dipadukan dengan **AI Chef** — asisten memasak cerdas berbasis Gemini AI yang siap membantu menemukan resep, mengeksplorasi bahan yang ada di dapur, serta memberikan panduan memasak langkah demi langkah dalam bahasa Indonesia.

---

## 🏗️ Arsitektur Proyek

Proyek ini terbagi menjadi dua bagian utama:

```
Hacktiv8/
├── backend/      → API server (Node.js + Express + Google Gemini AI)
└── frontend/     → Antarmuka pengguna (React + Vite + TypeScript + Tailwind CSS)
```

---

## ✨ Fitur Unggulan

### 🤖 AI Chef — Asisten Memasak Cerdas

- **Dual-Engine Architecture**: Menggunakan **Live Gemini AI** saat backend aktif, atau fallback ke **Mesin Kontekstual Lokal** jika backend tidak tersedia.
- **Format jawaban human-readable**: Respons AI dirender dengan format rapi — poin bernomor, bullet list, dan teks tebal — bukan raw markdown.
- **Rekomendasi Resep Terintegrasi**: AI menyematkan kartu resep yang bisa langsung diklik sesuai konteks percakapan.
- **Suggested Prompts**: Tombol prompt cepat untuk memulai percakapan dengan satu klik.

### 📖 Eksplorasi Resep

- **Kategori Lengkap**: Makanan Utama, Sarapan, Tradisional Nusantara, Camilan, Dessert, Minuman, Sehat, dan Seafood.
- **Pencarian & Filter**: Cari berdasarkan nama, bahan, atau bumbu. Filter berdasarkan tingkat kesulitan dan durasi masak.
- **Pengurutan Dinamis**: Paling Populer, Tercepat, Alfabetis.

### 🍲 Detail Resep Interaktif

- **Kalkulator Porsi Otomatis**: Ubah jumlah porsi, semua takaran bahan dihitung ulang secara proporsional.
- **Checklist Dapur**: Centang bahan dan langkah yang telah selesai dikerjakan.
- **Tips Chef & Substitusi Bahan**: Alternatif pengganti bahan yang tidak dimiliki.
- **Simpan Favorit**: Tersimpan di `localStorage` browser.

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat

- **Node.js** v18 atau lebih baru
- **Google Gemini API Key** (dapatkan di [Google AI Studio](https://aistudio.google.com/))

### Langkah 1 — Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di dalam folder `backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

Jalankan backend:

```bash
node index.js
```

Backend aktif di → `http://localhost:3000`

---

### Langkah 2 — Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend aktif di → `http://localhost:5173`

> ⚡ Frontend akan otomatis terhubung ke backend — tidak perlu konfigurasi tambahan.

## 📂 Struktur Folder

```
backend/
├── index.js
├── package.json
└── .env

frontend/
├── public/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── components/
│       ├── services/
│       │   └── aiService.ts
│       ├── data/
│       └── types/
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🎨 Desain & Teknologi

| Lapisan     | Teknologi                                 |
| ----------- | ----------------------------------------- |
| Frontend    | React 18, TypeScript, Vite                |
| Styling     | Tailwind CSS, Custom Design Tokens        |
| Ikon        | Lucide React                              |
| Font        | Playfair Display, DM Serif Display, Inter |
| Backend     | Node.js, Express 5                        |
| AI          | Google Gemini API (`@google/genai`)       |
| File Upload | Multer                                    |

**Palet Warna Utama:**

- Brand Green: `#526B50` — Accent Orange: `#D98B55`
- Background: `#FAF9F6` — Text: `#282B25`

---

© 2026 Recipedia. Semua Hak Dilindungi.
