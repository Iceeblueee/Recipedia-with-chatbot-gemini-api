import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const app = express();

// Limit 20MB — cukup untuk foto HD dan audio pendek
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── Model ───────────────────────────────────────────────────────────────────
const GEMINI_MODEL = 'gemini-3.5-flash-lite';

// ─── System Instruction ───────────────────────────────────────────────────────
const AI_CHEF_SYSTEM_INSTRUCTION = `Kamu adalah "AI Chef", asisten memasak ramah dan bersemangat dari platform Recipedia.

TOPIK YANG BOLEH DIBAHAS:
Kamu hanya boleh membantu seputar resep masakan, bahan makanan, teknik memasak, tips dapur, rekomendasi menu, dan segala hal yang berkaitan dengan kuliner dan memasak.

JIKA KONTEN DI LUAR TOPIK MEMASAK:
Apabila pengguna mengirim gambar yang bukan makanan atau bahan masakan, dokumen yang bukan resep, audio yang tidak berhubungan dengan masakan, atau pertanyaan di luar topik kuliner — tolak dengan hangat dan sopan. Jelaskan bahwa kamu hanya bisa membantu soal masakan dan dapur. Contoh: "Wah, sepertinya ini bukan tentang masakan ya 😊 Aku hanya bisa membantumu seputar resep, bahan masakan, dan tips memasak. Yuk ceritakan bahan apa yang ada di dapurmu, atau masakan apa yang ingin kamu coba hari ini?"

ATURAN FORMAT PENULISAN (WAJIB DIIKUTI):
1. JANGAN PERNAH gunakan simbol markdown seperti **, *, #, ##, ###, \`, ~~, atau sejenisnya.
2. Tulis dalam teks biasa yang natural dan mudah dibaca semua orang.
3. Untuk daftar bernomor, gunakan format: 1. 2. 3. (angka, titik, spasi, teks)
4. Untuk daftar berpoin, gunakan format: - teks (tanda hubung, spasi, teks)
5. Gunakan emoji secara natural di dalam kalimat agar jawaban terasa hidup dan menyenangkan.
6. Tulis seperti seorang koki ramah yang sedang berbicara langsung, bukan seperti dokumen formal.
7. Gunakan bahasa Indonesia yang hangat, santai, dan mudah dipahami semua kalangan.
8. JANGAN tampilkan informasi teknis, kode error, atau istilah yang membingungkan orang awam.`;

// ─── Normalize audio MIME type ────────────────────────────────────────────────
// Gemini API hanya menerima 'audio/mp3' bukan 'audio/mpeg'
function normalizeAudioMime(mimeType) {
  const map = {
    'audio/mpeg': 'audio/mp3',
    'audio/mp4': 'audio/mp3',
    'audio/x-m4a': 'audio/mp3',
    'audio/m4a': 'audio/mp3',
    'audio/ogg': 'audio/ogg',
    'audio/wav': 'audio/wav',
    'audio/webm': 'audio/webm',
    'audio/flac': 'audio/flac',
    'audio/aac': 'audio/aac',
  };
  return map[mimeType] || 'audio/mp3';
}

// ─── Multer error handler ─────────────────────────────────────────────────────
function handleMulterError(err, req, res, next) {
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      message: 'Ukuran file terlalu besar. Maksimal 20MB ya!'
    });
  }
  next(err);
}

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Recipedia Backend ready on http://localhost:${PORT}`));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Recipedia Backend' });
});

// ─── Route 1: Generate Text ───────────────────────────────────────────────────
app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt is required' });
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-text]', e.message);
    res.status(500).json({ message: e.message });
  }
});

// ─── Route 2: AI Chef Chat (Multi-turn) ───────────────────────────────────────
app.post('/chat', async (req, res) => {
  const { conversation } = req.body;
  try {
    if (!Array.isArray(conversation)) throw new Error('Conversation must be an array');
    const contents = conversation.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: { systemInstruction: AI_CHEF_SYSTEM_INSTRUCTION }
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[chat]', e.message);
    res.status(500).json({ error: e.message });
  }
});

// ─── Route 3: Generate from Image ────────────────────────────────────────────
app.post('/generate-from-image', upload.single('image'), handleMulterError, async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Image file is required' });

  const base64image = req.file.buffer.toString('base64');
  const imagePrompt = req.body.prompt ||
    'Analisis bahan makanan atau masakan dalam gambar ini. Identifikasi apa yang ada di gambar dan rekomendasikan resep yang bisa dibuat. Jelaskan secara lengkap dalam bahasa Indonesia.';

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{
        role: 'user',
        parts: [
          { text: imagePrompt },
          { inlineData: { data: base64image, mimeType: req.file.mimetype } }
        ]
      }],
      config: { systemInstruction: AI_CHEF_SYSTEM_INSTRUCTION }
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-from-image]', e.message);
    res.status(500).json({ message: e.message });
  }
});

// ─── Route 4: Generate from Document ─────────────────────────────────────────
app.post('/generate-from-document', upload.single('document'), handleMulterError, async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Document file is required' });

  const base64document = req.file.buffer.toString('base64');
  const docPrompt = req.body.prompt ||
    'Tolong baca dokumen berikut dan ekstrak resep atau informasi memasak yang ada di dalamnya. Rangkum dengan baik dan jelaskan dalam bahasa Indonesia.';

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{
        role: 'user',
        parts: [
          { text: docPrompt },
          { inlineData: { data: base64document, mimeType: req.file.mimetype } }
        ]
      }],
      config: { systemInstruction: AI_CHEF_SYSTEM_INSTRUCTION }
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-from-document]', e.message);
    res.status(500).json({ message: e.message });
  }
});

// ─── Route 5: Generate from Audio ────────────────────────────────────────────
// Catatan: Gemini API memerlukan mimeType 'audio/mp3' — jangan pakai 'audio/mpeg'
app.post('/generate-from-audio', upload.single('audio'), handleMulterError, async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Audio file is required' });

  const base64audio = req.file.buffer.toString('base64');
  const audioMime = normalizeAudioMime(req.file.mimetype);
  const audioPrompt = req.body.prompt ||
    'Tolong buat transkrip dari audio berikut dan identifikasi resep, bahan, atau tips memasak yang disebutkan. Jelaskan secara lengkap dalam bahasa Indonesia.';

  console.log(`[generate-from-audio] mime: ${req.file.mimetype} → normalized: ${audioMime}`);

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{
        role: 'user',
        parts: [
          { text: audioPrompt },
          { inlineData: { data: base64audio, mimeType: audioMime } }
        ]
      }],
      config: { systemInstruction: AI_CHEF_SYSTEM_INSTRUCTION }
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-from-audio]', e.message);
    res.status(500).json({ message: e.message });
  }
});
