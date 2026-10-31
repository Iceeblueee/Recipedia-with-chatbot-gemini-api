import { Recipe, AttachmentInfo } from '../types/recipe';
import { RECIPES_DATA } from '../data/recipes';

export interface AIResponse {
  text: string;
  suggestedRecipes?: Recipe[];
  mode: 'live' | 'demo';
}

// Common ingredient dictionary for local NLP matching
const COMMON_INGREDIENTS = [
  'telur', 'ayam', 'daging', 'sapi', 'nasi', 'tahu', 'tempe', 'kecap', 
  'susu', 'tepung', 'udang', 'bawang', 'cabai', 'pisang', 'kentang', 
  'kacang', 'santan', 'mie', 'pasta', 'keju', 'mentega', 'madu', 'cokelat',
  'wortel', 'sayur', 'kopi', 'ikan'
];

export async function askAIChef(
  userQuery: string, 
  forceMode?: 'live' | 'demo'
): Promise<AIResponse> {
  const normalizedQuery = userQuery.toLowerCase().trim();

  // If forceMode is not 'demo', attempt live Gemini API via backend proxy
  if (forceMode !== 'demo') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const systemPrompt = `Kamu adalah "AI Chef", asisten memasak ramah dan bersemangat dari platform Recipedia.

Kamu hanya boleh membantu seputar resep masakan, bahan makanan, teknik memasak, tips dapur, dan segala hal tentang kuliner. Jika pertanyaan di luar topik tersebut, tolak dengan hangat dan sopan — jelaskan bahwa kamu hanya membantu soal masakan.

ATURAN FORMAT PENULISAN (WAJIB):
- JANGAN gunakan simbol markdown seperti **, *, #, atau backtick sama sekali.
- Tulis teks biasa yang natural dan enak dibaca.
- Gunakan angka (1. 2. 3.) untuk daftar bernomor, dan tanda hubung (-) untuk daftar berpoin.
- Gunakan emoji secara natural agar jawaban terasa hidup.
- Bahasa Indonesia yang hangat, santai, dan mudah dipahami semua orang.

Pertanyaan pengguna: "${userQuery}"`;

      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: systemPrompt }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          // Find any relevant recipes to attach
          const matched = findMatchingRecipes(normalizedQuery);
          return {
            text: data.result,
            suggestedRecipes: matched.slice(0, 3),
            mode: 'live'
          };
        }
      }
    } catch {
      // Backend not running or timed out; fall back gracefully to the intelligent local demo engine
      console.info('Live backend unavailable, activating intelligent contextual demo engine.');
    }
  }

  // --- INTELLIGENT CONTEXTUAL DEMO ENGINE ---
  // A. Check for substitution questions
  if (normalizedQuery.includes('tidak punya') || normalizedQuery.includes('ganti') || normalizedQuery.includes('pengganti') || normalizedQuery.includes('substitusi')) {
    return handleSubstitutionQuery(normalizedQuery);
  }

  // B. Check for how-to-cook specific recipe instructions
  if (normalizedQuery.includes('cara') || normalizedQuery.includes('bagaimana') || normalizedQuery.includes('resep') || normalizedQuery.includes('bikin') || normalizedQuery.includes('buat')) {
    const recipeMatch = findExactOrCloseRecipe(normalizedQuery);
    if (recipeMatch) {
      return handleRecipeInstructionQuery(recipeMatch);
    }
  }

  // C. Check for quick / duration queries
  if (normalizedQuery.includes('30 menit') || normalizedQuery.includes('cepat') || normalizedQuery.includes('praktis') || normalizedQuery.includes('kilat')) {
    const quickRecipes = RECIPES_DATA.filter(r => r.cookingTime <= 30);
    return {
      text: `Untuk hidangan cepat dan praktis tanpa repot (di bawah 30 menit), aku sangat merekomendasikan resep-resep berikut:\n\n` +
        quickRecipes.slice(0, 3).map((r, i) => `${i + 1}. **${r.name}** (${r.cookingTime} menit) – ${r.description}`).join('\n\n') +
        `\n\nKamu bisa klik salah satu resep di bawah untuk langsung melihat takaran bahan dan langkah memasak lengkapnya!`,
      suggestedRecipes: quickRecipes.slice(0, 3),
      mode: 'demo'
    };
  }

  // D. Check for meal recommendations (makan malam, sarapan, indonesia, sehat)
  if (normalizedQuery.includes('makan malam') || normalizedQuery.includes('dinner')) {
    const dinnerOptions = RECIPES_DATA.filter(r => r.category === 'Makanan Utama' || r.category === 'Makanan Tradisional');
    return {
      text: `Berikut adalah rekomendasi menu makan malam yang hangat dan menggugah selera untukmu dan keluarga:\n\n` +
        `1. **${dinnerOptions[0].name}** – Pilihan klasik yang lezat dan mengenyangkan.\n` +
        `2. **${dinnerOptions[1].name}** – Cita rasa kaya rempah untuk malam santai.\n` +
        `3. **${dinnerOptions[7].name}** – Praktis dan disukai semua orang.\n\n` +
        `Ingin rekomendasi berdasarkan bahan yang ada di kulkasmu saat ini? Cukup tulis bahan yang kamu miliki!`,
      suggestedRecipes: [dinnerOptions[0], dinnerOptions[1], dinnerOptions[7]],
      mode: 'demo'
    };
  }

  if (normalizedQuery.includes('sarapan') || normalizedQuery.includes('pagi') || normalizedQuery.includes('breakfast')) {
    const breakfastOptions = RECIPES_DATA.filter(r => r.category === 'Sarapan' || r.tags.includes('Sarapan'));
    return {
      text: `Selamat pagi! Untuk sarapan yang membangkitkan energi tanpa menyita waktu, berikut pilihan terbaiknya:\n\n` +
        breakfastOptions.slice(0, 3).map((r, i) => `${i + 1}. **${r.name}** – Selesai hanya dalam ${r.cookingTime} menit.`).join('\n') +
        `\n\nSemua resep ini mudah disiapkan bahkan sebelum beraktivitas. Selamat mencoba!`,
      suggestedRecipes: breakfastOptions.slice(0, 3),
      mode: 'demo'
    };
  }

  if (normalizedQuery.includes('indonesia') || normalizedQuery.includes('tradisional') || normalizedQuery.includes('nusantara')) {
    const indoOptions = RECIPES_DATA.filter(r => r.cuisine === 'Indonesian');
    return {
      text: `Kekayaan kuliner nusantara selalu punya tempat spesial di hati! Berikut beberapa hidangan tradisional khas Indonesia pilihan Recipedia:\n\n` +
        `1. **${indoOptions[0].name}** (Gurih harum dengan bumbu karamelisasi)\n` +
        `2. **${indoOptions[1].name}** (Daging empuk dengan rempah Minang autentik)\n` +
        `3. **${indoOptions[2].name}** (Kuah kuning segar beraroma jeruk purut & koya)\n` +
        `4. **${indoOptions[3].name}** (Mie kenyal berpadu kemiri sangrai)\n\n` +
        `Pilih resep di bawah untuk melihat rincian rempah dan panduan memasaknya!`,
      suggestedRecipes: indoOptions.slice(0, 4),
      mode: 'demo'
    };
  }

  // E. Ingredient-Based Matching
  const detectedIngredients = COMMON_INGREDIENTS.filter(ing => normalizedQuery.includes(ing));

  if (detectedIngredients.length > 0) {
    const matched = findRecipesByIngredients(detectedIngredients);
    if (matched.length > 0) {
      const topRecipe = matched[0];
      return {
        text: `Menarik sekali! Dari bahan yang kamu sebutkan (**${detectedIngredients.join(', ')}**), kamu bisa mengolah beberapa hidangan istimewa berikut:\n\n` +
          matched.slice(0, 3).map((r, i) => `${i + 1}. **${r.name}** (${r.difficulty}, ${r.cookingTime} menit)\n   ${r.description}`).join('\n\n') +
          `\n\n💡 **Rekomendasi Utama Chef:** Aku sangat menyarankan membuat **${topRecipe.name}** karena memaksimalkan bahan yang kamu punya dengan teknik pengolahan yang efisien!`,
        suggestedRecipes: matched.slice(0, 3),
        mode: 'demo'
      };
    }
  }

  // F. Fallback / General Helpful Response
  const popularSample = RECIPES_DATA.filter(r => r.isPopular).slice(0, 3);
  return {
    text: `Halo! Aku AI Chef siap membantumu di dapur. Kamu bisa memberi tahu aku:\n\n` +
      `• **Bahan yang kamu miliki**, contoh: *"Aku punya telur, nasi, dan bawang putih"*\n` +
      `• **Ide masakan tertentu**, contoh: *"Bagaimana cara memasak rendang daging?"*\n` +
      `• **Pengganti bahan**, contoh: *"Aku tidak punya susu untuk pancake"*\n` +
      `• **Kategori waktu**, contoh: *"Rekomendasi resep praktis di bawah 30 menit"*\n` +
      `• **📎 Kirim foto bahan, dokumen resep, atau rekaman audio** agar aku bisa menganalisisnya!\n\n` +
      `Berikut beberapa resep populer yang mungkin ingin kamu coba hari ini:`,
    suggestedRecipes: popularSample,
    mode: 'demo'
  };
}

// ─── Send message with file attachment ────────────────────────────────────────
export async function askAIChefWithFile(
  file: File,
  attachmentType: AttachmentInfo['type'],
  userText?: string
): Promise<AIResponse> {
  const endpointMap: Record<AttachmentInfo['type'], string> = {
    image: '/api/generate-from-image',
    document: '/api/generate-from-document',
    audio: '/api/generate-from-audio',
  };

  const fieldNameMap: Record<AttachmentInfo['type'], string> = {
    image: 'image',
    document: 'document',
    audio: 'audio',
  };

  const defaultPromptMap: Record<AttachmentInfo['type'], string> = {
    image: 'Analisis bahan makanan atau masakan dalam gambar ini. Identifikasi apa yang ada di gambar dan rekomendasikan resep yang bisa dibuat. Jelaskan dalam bahasa Indonesia dengan format menarik.',
    document: 'Tolong baca dokumen berikut dan ekstrak resep atau informasi memasak yang ada di dalamnya. Rangkum dalam bahasa Indonesia.',
    audio: 'Tolong buat transkrip dari audio berikut dan identifikasi resep, bahan, atau tips memasak yang disebutkan. Jelaskan dalam bahasa Indonesia.',
  };

  try {
    const formData = new FormData();
    formData.append(fieldNameMap[attachmentType], file);
    formData.append('prompt', userText || defaultPromptMap[attachmentType]);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s for file uploads

    const response = await fetch(endpointMap[attachmentType], {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.result) {
        const matched = findMatchingRecipes(data.result.toLowerCase());
        return {
          text: data.result,
          suggestedRecipes: matched.slice(0, 3),
          mode: 'live',
        };
      }
    }

    // Baca pesan error dari backend jika ada
    let errorMsg = '';
    try {
      const errData = await response.json();
      errorMsg = errData.message || '';
    } catch { /* ignore */ }

    if (response.status === 413 || errorMsg.toLowerCase().includes('besar')) {
      return {
        text: 'Waduh, file yang kamu kirim terlalu besar nih 😅 Coba kirim file yang lebih kecil ya, maksimal 20MB!',
        mode: 'demo',
      };
    }

    throw new Error(errorMsg || `HTTP ${response.status}`);
  } catch (err: unknown) {
    console.error('[askAIChefWithFile]', err);
    const fileTypeLabel = attachmentType === 'image' ? 'foto' : attachmentType === 'audio' ? 'audio' : 'dokumen';
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return {
      text: isTimeout
        ? `File ${fileTypeLabel}mu membutuhkan waktu lebih lama untuk diproses. Coba lagi dengan file yang lebih kecil ya! 🙏`
        : `Hmm, sepertinya ada kendala saat memproses ${fileTypeLabel} ini 😔 Pastikan file tidak rusak dan coba lagi ya!`,
      mode: 'demo',
    };
  }
}


// Helpers
function findExactOrCloseRecipe(query: string): Recipe | undefined {
  return RECIPES_DATA.find(r => 
    query.includes(r.name.toLowerCase()) || 
    query.includes(r.slug.replace(/-/g, ' ')) ||
    r.tags.some(tag => query.includes(tag.toLowerCase()))
  );
}

function handleSubstitutionQuery(query: string): AIResponse {
  if (query.includes('susu')) {
    return {
      text: `Jika kamu tidak memiliki **susu cair** untuk pancake atau kue, berikut pengganti terbaiknya:\n\n` +
        `1. **Air hangat + Mentega cair**: Untuk pancake, campurkan 180 ml air dengan 1 sdm mentega cair ekstra. Tekstur tetap lembut dan berserat.\n` +
        `2. **Susu bubuk dilarutkan air**: Takaran 2 sdm susu bubuk + 1 gelas air.\n` +
        `3. **Susu kedelai / Oat milk**: Pilihan nabati yang memberikan rasa gurih alami serupa.\n` +
        `4. **Yogurt encer**: Menghasilkan pancake yang lebih mengembang empuk karena keasaman alaminya bereaksi dengan baking powder!`,
      mode: 'demo'
    };
  }

  if (query.includes('telur')) {
    return {
      text: `Untuk menggantikan **telur** dalam olahan masakan atau adonan:\n\n` +
        `• **Dalam kue/pancake**: Gunakan 1/2 buah pisang matang yang dilumatkan, atau 1/4 cangkir saus apel / yogurt.\n` +
        `• **Sebagai perekat (katsu/risoles)**: Buat larutan tepung terigu dan air dengan kekentalan sedang sebagai pengganti kocokan telur.\n` +
        `• **Pengembang**: Tambahkan 1/2 sdt baking powder + 1 sdm cuka/air lemon ke adonan.`,
      mode: 'demo'
    };
  }

  if (query.includes('santan')) {
    return {
      text: `Jika kehabisan **santan** untuk gulai, rendang, atau opor:\n\n` +
        `1. **Susu evaporasi / cooking cream**: Menghasilkan kuah gurih creamy tanpa aroma kelapa, sangat lezat untuk opor.\n` +
        `2. **Kemiri yang diblender halus dengan air**: Cara tradisional untuk memberikan kekentalan alami dan rasa gurih gurih pada kuah.\n` +
        `3. **Fiber Creme**: Pengganti santan tinggi serat yang rendah kolesterol.`,
      mode: 'demo'
    };
  }

  return {
    text: `Untuk penggantian bahan masakan, beri tahu aku bahan apa yang tidak kamu miliki dan menu apa yang ingin kamu masak. Aku akan memberikan alternatif takaran yang seimbang agar cita rasa masakanmu tetap lezat!`,
    mode: 'demo'
  };
}

function handleRecipeInstructionQuery(recipe: Recipe): AIResponse {
  const topIngredients = recipe.ingredients.slice(0, 5).map(ing => `• ${ing.name}: ${ing.quantity} ${ing.unit}`).join('\n');
  const topSteps = recipe.instructions.map(st => `**Langkah ${st.step}:** ${st.instruction}`).join('\n\n');

  return {
    text: `Tentu! Berikut adalah panduan memasak **${recipe.name}**:\n\n` +
      `⏱️ **Waktu Memasak:** ${recipe.cookingTime} menit | **Tingkat:** ${recipe.difficulty} | **Porsi:** ${recipe.servings} orang\n\n` +
      `**Bahan Utama:**\n${topIngredients}\n*(dan ${recipe.ingredients.length - 5} bahan lainnya)*\n\n` +
      `**Langkah Memasak:**\n${topSteps}\n\n` +
      `💡 **Tips Rahasia Chef:** ${recipe.cookingTips[0] || 'Gunakan bahan segar untuk rasa maksimal.'}\n\n` +
      `Klik kartu resep di bawah untuk membuka kartu resep interaktif dan kalkulator porsi otomatis!`,
    suggestedRecipes: [recipe],
    mode: 'demo'
  };
}

function findRecipesByIngredients(ingredients: string[]): Recipe[] {
  return RECIPES_DATA.map(recipe => {
    let score = 0;
    ingredients.forEach(ing => {
      const hasIngredient = recipe.ingredients.some(i => i.name.toLowerCase().includes(ing));
      const hasInName = recipe.name.toLowerCase().includes(ing);
      const hasInTag = recipe.tags.some(t => t.toLowerCase().includes(ing));
      if (hasInName) score += 4;
      if (hasIngredient) score += 2;
      if (hasInTag) score += 1;
    });
    return { recipe, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(item => item.recipe);
}

function findMatchingRecipes(query: string): Recipe[] {
  return RECIPES_DATA.filter(recipe => 
    recipe.name.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query) ||
    recipe.tags.some(t => query.includes(t.toLowerCase())) ||
    recipe.ingredients.some(i => query.includes(i.name.toLowerCase()))
  );
}
