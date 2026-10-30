import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const app = express();
const upload = multer();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── Model ───────────────────────────────────────────────────────────────────
const GEMINI_MODEL = 'gemini-2.5-flash-lite';

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Recipedia Backend ready on http://localhost:${PORT}`));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Recipedia Backend' });
});

// ─── Route 1: Generate Text ────────────────────────────────────────────────────
// Digunakan oleh AIChefChatbot via /api/generate-text
app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-text]', e);
    res.status(500).json({ message: e.message });
  }
});

// ─── Route 2: AI Chef Chat (Multi-turn Conversation) ─────────────────────────
// Digunakan untuk chatbot multi-turn dengan system prompt AI Chef Recipedia
app.post('/chat', async (req, res) => {
  const { conversation } = req.body;

  try {
    if (!Array.isArray(conversation)) {
      throw new Error('Conversation must be an array');
    }

    const contents = conversation.map(({ role, text }) => ({
      role,
      parts: [{ text }]
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: `Kamu adalah "AI Chef", asisten memasak ramah, profesional, dan inspiratif dari platform Recipedia.
Semua jawabanmu harus dalam bahasa Indonesia yang hangat, terstruktur rapi, dan mudah dipahami.
Berikan tips memasak, resep, atau panduan takaran bahan secara akurat.
Jika pengguna menyebutkan bahan yang dimiliki, rekomendasikan hidangan yang cocok dibuat dari bahan tersebut.
Format teks dengan poin-poin yang mudah dibaca menggunakan emoji yang relevan.
Fokus hanya pada topik memasak, kuliner, dan resep. Tolak dengan sopan pertanyaan di luar topik tersebut.`
      }
    });

    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[chat]', e);
    res.status(500).json({ error: e.message });
  }
});

// ─── Route 3: Generate from Image ─────────────────────────────────────────────
// Analisis gambar bahan makanan dan rekomendasikan resep
app.post('/generate-from-image', upload.single('image'), async (req, res) => {
  const { prompt } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const base64image = req.file.buffer.toString('base64');
  const imagePrompt = prompt || 'Analisis bahan makanan dalam gambar ini dan rekomendasikan resep yang bisa dibuat. Jelaskan dalam bahasa Indonesia.';

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: imagePrompt, type: 'text' },
        { inlineData: { data: base64image, mimeType: req.file.mimetype } }
      ]
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-from-image]', e);
    res.status(500).json({ message: e.message });
  }
});

// ─── Route 4: Generate from Document ──────────────────────────────────────────
// Ekstrak resep dari dokumen (PDF, dll)
app.post('/generate-from-document', upload.single('document'), async (req, res) => {
  const { prompt } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Document file is required' });
  }

  const base64document = req.file.buffer.toString('base64');
  const docPrompt = prompt || 'Tolong ekstrak dan rangkum resep-resep dari dokumen berikut dalam bahasa Indonesia.';

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: docPrompt, type: 'text' },
        { inlineData: { data: base64document, mimeType: req.file.mimetype } }
      ]
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-from-document]', e);
    res.status(500).json({ message: e.message });
  }
});

// ─── Route 5: Generate from Audio ─────────────────────────────────────────────
// Transkripsi dan analisis audio terkait memasak
app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
  const { prompt } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Audio file is required' });
  }

  const base64audio = req.file.buffer.toString('base64');
  const audioPrompt = prompt || 'Tolong buat transkrip dari audio berikut dan identifikasi resep atau bahan yang disebutkan.';

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: audioPrompt, type: 'text' },
        { inlineData: { data: base64audio, mimeType: req.file.mimetype } }
      ]
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('[generate-from-audio]', e);
    res.status(500).json({ message: e.message });
  }
});
