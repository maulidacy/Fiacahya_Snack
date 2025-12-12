# Fiacahya Snack - Production & Ordering Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-cyan)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23-purple)](https://www.framer.com/motion/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-green)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Website resmi Fiacahya Snack - Bakery rumahan yang menyediakan kue basah, kue kering, tart/cake, dan snack box untuk acara. Dibangun dengan teknologi modern untuk pengalaman pengguna yang premium.

## 📋 Deskripsi Proyek

Fiacahya Snack adalah platform web produksi dan pemesanan untuk bakery rumahan yang berlokasi di Gubug, Grobogan. Website ini dirancang untuk memberikan pengalaman browsing yang menarik dengan UI premium, animasi halus, dan integrasi AI assistant untuk membantu pelanggan dalam proses pemesanan.

### 🎯 Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| ✨ **UI Premium & Animasi** | Desain responsif dengan TailwindCSS dan animasi Framer Motion untuk parallax effects |
| 🎛️ **Filtering Produk** | Sistem filter canggih untuk kategori kue basah, kue kering, tart/cake, dan snack box |
| 🧩 **Dynamic Slug Routing** | Halaman detail produk dinamis (`/produk/[slug]`) untuk setiap item |
| 🎥 **Parallax & Motion Effects** | Efek visual menarik di homepage dan galeri |
| 🤖 **AI Production Assistant** | Chatbot cerdas dengan auto-scroll, auto-resize textarea, dan typing indicator |
| 🌙 **Light & Dark Mode** | Dukungan tema penuh dengan next-themes |
| 📦 **Modular Architecture** | Struktur kode yang mudah dikembangkan dan dipelihara |

### 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **AI Integration**: OpenAI API (gpt-4o-mini)
- **Theme Management**: next-themes
- **Icons**: Lucide React
- **Build Tools**: ESLint, PostCSS, Autoprefixer

## 🚀 Instalasi & Setup

### Prerequisites

- Node.js 18+ dan npm/pnpm/yarn
- OpenAI API Key (dapatkan di [OpenAI Platform](https://platform.openai.com/))

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/fiacahya-snack.git
   cd fiacahya-snack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   pnpm install
   ```

3. **Setup environment variables**

   Buat file `.env.local` di root directory:

   ```env
   # Required: OpenAI API Key
   OPENAI_API_KEY=sk-your-openai-api-key-here

   # Optional: Custom AI Model (default: gpt-4o-mini)
   OPENAI_MODEL=gpt-4o-mini
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**

   Kunjungi [http://localhost:3000](http://localhost:3000) untuk melihat website.

### 📁 Struktur Proyek

```
fiacahya-snack/
├── public/                    # Static assets (images, icons)
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   └── fiacahya-assistant/ # AI assistant endpoint
│   │   ├── (site)/            # Site pages (galeri, produksi)
│   │   ├── produk/            # Product pages
│   │   │   └── [slug]/        # Dynamic product detail
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable UI components
│   │   ├── chatbot/           # AI assistant components
│   │   ├── layout/            # Layout components (navbar, footer)
│   │   └── ui/                # Base UI components
│   ├── config/                # Configuration files
│   │   ├── fiacahya-assistant.ts # AI assistant config
│   │   └── fiacahya-data.ts   # Brand data
│   └── data/                  # Static data
│       └── paket-snack.ts     # Product catalog
├── .gitignore                 # Git ignore rules
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies & scripts
├── tailwind.config.ts         # TailwindCSS config
└── tsconfig.json              # TypeScript config
```

## 🤖 AI Production Assistant

### Cara Kerja

AI Assistant diimplementasikan melalui endpoint `/api/fiacahya-assistant/route.ts` yang menggunakan OpenAI Chat Completions API. Assistant ini membantu pelanggan dengan pertanyaan tentang menu, harga, paket snack box, dan proses pemesanan.

#### Model Default
- **Model**: `gpt-4o-mini` (configurable via `OPENAI_MODEL` env var)
- **Max Tokens**: 220 (untuk jawaban singkat dan hemat biaya)
- **Temperature**: 0.4 (konsisten namun sedikit kreatif)

#### Aturan Bisnis Fiacahya Snack

Assistant mematuhi aturan bisnis yang di-hardcode dalam system prompt:

1. **Gaya Bahasa**: Ramah, jelas, singkat, menggunakan bahasa Indonesia, memanggil pelanggan "kak"
2. **Fokus**: Menu, harga, paket snack box, cara pesan, jam produksi, estimasi kapasitas
3. **Jawaban**: Maksimal 3-4 kalimat, spesifik, tidak mengulang informasi sebelumnya
4. **Harga**: Jika tidak ada di data sistem, jangan mengarang - arahkan konfirmasi via WhatsApp
5. **Batasan**: Hanya menjawab konteks snack/bakery, topik lain dijawab singkat

#### Mengubah Model AI

Untuk mengubah model AI, set environment variable `OPENAI_MODEL`:

```env
OPENAI_MODEL=gpt-4  # Untuk model yang lebih powerful
# atau
OPENAI_MODEL=gpt-3.5-turbo  # Untuk model yang lebih murah
```

**Catatan**: Model yang lebih besar (seperti gpt-4) memberikan jawaban yang lebih baik namun biaya API lebih tinggi.

#### Rate Limiting

Implementasi rate limiting dapat ditambahkan di level server atau menggunakan middleware Next.js:

```typescript
// Contoh implementasi sederhana
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 menit
const MAX_REQUESTS = 10; // maksimal 10 request per menit per IP
```

#### Optimasi Token Usage

Tips untuk menghemat token:

1. **System Prompt Singkat**: Prompt di `fiacahya-assistant.ts` dirancang minimal namun informatif
2. **Max Tokens Rendah**: Dibatasi 220 tokens untuk jawaban singkat
3. **Context Management**: Tidak menyimpan history chat panjang
4. **Error Handling**: Response error yang ringkas

#### Contoh Request/Response

**Request:**
```json
POST /api/fiacahya-assistant
{
  "message": "Halo, ada paket snack box untuk 50 orang?"
}
```

**Response:**
```json
{
  "reply": "Halo kak! Untuk 50 orang, kami sarankan paket snack box isi 4 item mulai Rp13.000/box dengan minimal order 30 box. Detail harga dan isi bisa dikonfirmasi via WhatsApp ya kak."
}
```

## 🔐 Keamanan

### Best Practices

- **Environment Variables**: Jangan commit file `.env` ke repository
- **Rate Limiting**: Implementasi rate limit untuk mencegah abuse API
- **Input Sanitization**: Semua input user disanitasi sebelum dikirim ke OpenAI
- **Error Handling**: Error message yang tidak mengungkap detail teknis

### Risiko Penggunaan Model Besar

- **Biaya API**: Model seperti gpt-4 memiliki biaya per token yang lebih tinggi
- **Latency**: Response time lebih lama untuk model yang lebih kompleks
- **Over-reliance**: Pastikan fallback jika API down

## 📞 Contact

- **Name**: Maulida Cahya
- **Email**: cahyamaulida011@gmail.com

Untuk pertanyaan atau kolaborasi, silakan hubungi melalui email di atas.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 maulidacy.
