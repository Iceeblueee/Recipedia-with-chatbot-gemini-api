import { Recipe } from '../types/recipe';

export const RECIPES_DATA: Recipe[] = [
  // 1. Nasi Goreng Spesial
  {
    id: 'nasi-goreng-spesial',
    name: 'Nasi Goreng Spesial',
    slug: 'nasi-goreng-spesial',
    description: 'Nasi goreng aromatik dengan suwiran ayam gurih, udang segar, telur mata sapi, dan perpaduan kecap manis karamelisasi beraroma wajan.',
    category: 'Makanan Utama',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
    cookingTime: 20,
    prepTime: 10,
    difficulty: 'Mudah',
    servings: 2,
    estimatedCalories: 480,
    isPopular: true,
    tags: ['Nasi', 'Praktis', 'Cepat', 'Sarapan', 'Populer'],
    ingredients: [
      { name: 'Nasi putih dingin (pera)', quantity: 400, unit: 'gram' },
      { name: 'Daging dada ayam (potong dadu)', quantity: 100, unit: 'gram' },
      { name: 'Udang kupas', quantity: 60, unit: 'gram' },
      { name: 'Telur ayam', quantity: 2, unit: 'butir' },
      { name: 'Bawang merah (iris halus)', quantity: 4, unit: 'butir' },
      { name: 'Bawang putih (cincang)', quantity: 3, unit: 'siung' },
      { name: 'Cabai merah keriting (opsional)', quantity: 2, unit: 'buah' },
      { name: 'Kecap manis premium', quantity: 2, unit: 'sdm' },
      { name: 'Saus tiram', quantity: 1, unit: 'sdm' },
      { name: 'Minyak wijen', quantity: 1, unit: 'sdt' },
      { name: 'Garam & merica bubuk', quantity: 0.5, unit: 'sdt' },
      { name: 'Minyak goreng', quantity: 2, unit: 'sdm' },
      { name: 'Daun bawang (iris serong)', quantity: 1, unit: 'batang' }
    ],
    instructions: [
      { step: 1, instruction: 'Panaskan minyak di wajan dengan api sedang-tinggi. Tumis bawang merah dan bawang putih hingga harum kecokelatan.', durationMinutes: 3 },
      { step: 2, instruction: 'Masukkan potongan ayam dan udang, masak hingga berubah warna dan matang.', durationMinutes: 4 },
      { step: 3, instruction: 'Sisihkan bahan ke tepi wajan, ceplok 1 butir telur lalu orak-arik hingga setengah matang.', durationMinutes: 2 },
      { step: 4, instruction: 'Masukkan nasi pera, tuangkan kecap manis, saus tiram, garam, dan merica. Aduk cepat dengan teknik wajan berapi besar agar bumbu meresap merata.', durationMinutes: 5 },
      { step: 5, instruction: 'Tambahkan irisan daun bawang dan minyak wijen sesaat sebelum diangkat. Sajikan hangat dengan telur mata sapi dan kerupuk.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Gunakan nasi sisa semalam yang disimpan di kulkas agar butirannya tidak menggumpal saat ditumis.',
      'Gunakan api besar di menit terakhir untuk menciptakan aroma smoky (wok hei) khas restoran.'
    ],
    ingredientAlternatives: [
      'Udang bisa diganti bakso sapi atau sosis.',
      'Gunakan kecap asin jika lebih menyukai rasa gurih oriental daripada manis.'
    ]
  },

  // 2. Rendang Daging
  {
    id: 'rendang-daging',
    name: 'Rendang Daging Sapi',
    slug: 'rendang-daging',
    description: 'Olahan daging sapi khas Minangkabau yang dimasak perlahan dalam santan kelapa kental dan rempah aromatik hingga berwarna cokelat pekat dan lembut meleleh.',
    category: 'Makanan Tradisional',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    cookingTime: 180,
    prepTime: 30,
    difficulty: 'Sulit',
    servings: 6,
    estimatedCalories: 620,
    isPopular: true,
    tags: ['Daging Sapi', 'Tradisional', 'Padang', 'Mewah', 'Populer'],
    ingredients: [
      { name: 'Daging sapi has luar / paha (potong tebal)', quantity: 1000, unit: 'gram' },
      { name: 'Santan kental dari 3 butir kelapa tua', quantity: 1000, unit: 'ml' },
      { name: 'Santan encer', quantity: 500, unit: 'ml' },
      { name: 'Serai (memarkan)', quantity: 3, unit: 'batang' },
      { name: 'Daun kunyit (ikat simpul)', quantity: 2, unit: 'lembar' },
      { name: 'Daun jeruk purut', quantity: 5, unit: 'lembar' },
      { name: 'Asam kandis', quantity: 2, unit: 'buah' },
      { name: 'Bawang merah (halus)', quantity: 12, unit: 'butir' },
      { name: 'Bawang putih (halus)', quantity: 6, unit: 'siung' },
      { name: 'Cabai merah keriting (halus)', quantity: 150, unit: 'gram' },
      { name: 'Jahe & lengkuas (halus)', quantity: 4, unit: 'cm' },
      { name: 'Ketumbar sangrai bubuk', quantity: 1, unit: 'sdm' },
      { name: 'Garam laut', quantity: 1.5, unit: 'sdt' }
    ],
    instructions: [
      { step: 1, instruction: 'Haluskan bumbu halus, lalu campurkan bersama santan encer dan santan kental dalam wajan besar.', durationMinutes: 15 },
      { step: 2, instruction: 'Masukkan daun kunyit, daun jeruk, serai, dan asam kandis. Masak dengan api sedang sambil terus diaduk perlahan hingga santan berminyak (tahap gulai).', durationMinutes: 45 },
      { step: 3, instruction: 'Masukkan potongan daging sapi. Aduk rata dan kecilkan api ke level simmer. Masak hingga santan menyusut dan mengental kecokelatan (tahap kalio).', durationMinutes: 60 },
      { step: 4, instruction: 'Kecilkan api sekecil mungkin. Terus aduk perlahan agar bagian bawah wajan tidak gosong hingga dedak rendang berwarna cokelat gelap berminyak dan daging sangat empuk.', durationMinutes: 60 }
    ],
    cookingTips: [
      'Gunakan kelapa tua segar, bukan santan instan kemasan, untuk menghasilkan minyak kelapa alami dan cita rasa gurih khas karamelisasi Minang.',
      'Potong daging berlawanan arah serat daging agar saat empuk tidak mudah hancur.'
    ],
    ingredientAlternatives: [
      'Asam kandis bisa digantikan sepotong asam gelugur.',
      'Daging sapi dapat dikombinasikan dengan kacang merah atau kentang rendang kecil.'
    ]
  },

  // 3. Soto Ayam Lamongan
  {
    id: 'soto-ayam',
    name: 'Soto Ayam Lamongan',
    slug: 'soto-ayam',
    description: 'Sup ayam berkuah kuning gurih segar dengan aroma serai, jeruk nipis, taburan koya kerupuk udang yang gurih kaya tekstur, serta pelengkap suun lembut.',
    category: 'Makanan Tradisional',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=900&q=80',
    cookingTime: 60,
    prepTime: 20,
    difficulty: 'Sedang',
    servings: 4,
    estimatedCalories: 360,
    isPopular: true,
    tags: ['Ayam', 'Sup', 'Tradisional', 'Berkuah', 'Populer'],
    ingredients: [
      { name: 'Ayam kampung utuh (potong 4)', quantity: 1, unit: 'ekor' },
      { name: 'Air bersih untuk kaldu', quantity: 2000, unit: 'ml' },
      { name: 'Serai (memarkan)', quantity: 2, unit: 'batang' },
      { name: 'Daun jeruk purut', quantity: 4, unit: 'lembar' },
      { name: 'Kunyit bakar', quantity: 4, unit: 'cm' },
      { name: 'Bawang merah', quantity: 8, unit: 'butir' },
      { name: 'Bawang putih', quantity: 5, unit: 'siung' },
      { name: 'Kemiri sangrai', quantity: 4, unit: 'butir' },
      { name: 'Jahe', quantity: 2, unit: 'cm' },
      { name: 'Suun seduh air panas', quantity: 100, unit: 'gram' },
      { name: 'Kol (iris halus)', quantity: 100, unit: 'gram' },
      { name: 'Kerupuk udang & bawang putih goreng (dihaluskan untuk koya)', quantity: 50, unit: 'gram' },
      { name: 'Garam & gula secukupnya', quantity: 1.5, unit: 'sdt' }
    ],
    instructions: [
      { step: 1, instruction: 'Rebus ayam kampung dalam air mendidih bersama serai dan daun jeruk dengan api kecil hingga keluar kaldu gurih harum.', durationMinutes: 30 },
      { step: 2, instruction: 'Haluskan bumbu halus (bawang merah, bawang putih, kunyit, kemiri, jahe). Tumis dengan sedikit minyak hingga harum dan matang sempurna.', durationMinutes: 8 },
      { step: 3, instruction: 'Tuang bumbu tumis ke dalam panci rebusan kaldu ayam. Beri garam dan gula. Masak terus hingga bumbu meresap ke dalam daging ayam.', durationMinutes: 15 },
      { step: 4, instruction: 'Angkat ayam, tiriskan lalu goreng sebentar hingga berkulit keemasan. Suwir-suwir dagingnya.', durationMinutes: 10 },
      { step: 5, instruction: 'Susun suun, kol, tauge, dan suwiran ayam di mangkuk saji. Siram dengan kuah panas soto, lalu taburi bubuk koya gurih dan perasan jeruk nipis.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Gunakan ayam kampung agar kuah kaldu terasa manis alami tanpa perlu tambahan penyedap buatan berlebih.',
      'Bubuk koya dibuat dari kerupuk udang goreng yang ditumbuk bersama bawang putih goreng renyah.'
    ],
    ingredientAlternatives: [
      'Ayam broiler dapat digunakan dengan merebus dan membuang air rebusan pertama untuk mengurangi bau amis.'
    ]
  },

  // 4. Mie Goreng Jawa
  {
    id: 'mie-goreng-jawa',
    name: 'Mie Goreng Jawa Tradisional',
    slug: 'mie-goreng-jawa',
    description: 'Mie kuning kenyal yang dimasak dengan bumbu kemiri khas Jawa, suwiran ayam, kubis segar, kekian terigu, dan taburan bawang goreng renyah.',
    category: 'Makanan Tradisional',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80',
    cookingTime: 25,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 3,
    estimatedCalories: 430,
    isPopular: true,
    tags: ['Mie', 'Cepat', 'Tradisional', 'Goreng'],
    ingredients: [
      { name: 'Mie telur basah / mie kuning', quantity: 300, unit: 'gram' },
      { name: 'Daging ayam suwir matang', quantity: 100, unit: 'gram' },
      { name: 'Telur ayam', quantity: 2, unit: 'butir' },
      { name: 'Kol (iris kasar)', quantity: 75, unit: 'gram' },
      { name: 'Sawi hijau (caisim)', quantity: 50, unit: 'gram' },
      { name: 'Kecap manis', quantity: 3, unit: 'sdm' },
      { name: 'Bawang merah', quantity: 5, unit: 'butir' },
      { name: 'Bawang putih', quantity: 3, unit: 'siung' },
      { name: 'Kemiri sangrai', quantity: 3, unit: 'butir' },
      { name: 'Merica butiran', quantity: 1, unit: 'sdt' },
      { name: 'Minyak sayur', quantity: 2, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Ulek bumbu halus: kemiri, merica butiran, bawang merah, dan bawang putih hingga lembut berminyak.', durationMinutes: 5 },
      { step: 2, instruction: 'Tumis bumbu halus di wajan sampai wangi semerbak matang.', durationMinutes: 4 },
      { step: 3, instruction: 'Masukkan telur, orak-arik kasar di wajan bersama ayam suwir.', durationMinutes: 3 },
      { step: 4, instruction: 'Tambahkan irisan kol dan sawi hijau, aduk sebentar hingga setengah layu.', durationMinutes: 3 },
      { step: 5, instruction: 'Masukkan mie kuning dan kecap manis serta sedikit garam. Aduk cepat merata hingga semua helai mie terlumuri sempurna.', durationMinutes: 8 }
    ],
    cookingTips: [
      'Gunakan kemiri yang disangrai terlebih dahulu agar mengeluarkan aroma gurih nutty khas masakan Jawa.'
    ],
    ingredientAlternatives: [
      'Bisa menambahkan irisan bakso atau sosis sebagai pelengkap daging.'
    ]
  },

  // 5. Ayam Geprek Sambal Bawang
  {
    id: 'ayam-geprek',
    name: 'Ayam Geprek Sambal Bawang',
    slug: 'ayam-geprek',
    description: 'Ayam goreng tepung renyah bertekstur krispi maksimal yang digeprek langsung bersama sambal bawang rawit merah super pedas dan gurih.',
    category: 'Makanan Utama',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80',
    cookingTime: 30,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 2,
    estimatedCalories: 510,
    isPopular: true,
    tags: ['Ayam', 'Pedas', 'Krispi', 'Populer'],
    ingredients: [
      { name: 'Dada atau paha ayam fillet', quantity: 2, unit: 'potong' },
      { name: 'Tepung bumbu krispi serbaguna', quantity: 150, unit: 'gram' },
      { name: 'Air es', quantity: 100, unit: 'ml' },
      { name: 'Cabai rawit merah domba', quantity: 15, unit: 'buah' },
      { name: 'Bawang putih', quantity: 2, unit: 'siung' },
      { name: 'Minyak goreng panas mendidih', quantity: 3, unit: 'sdm' },
      { name: 'Garam dan kaldu bubuk', quantity: 0.5, unit: 'sdt' }
    ],
    instructions: [
      { step: 1, instruction: 'Balut ayam dengan adonan basah tepung bumbu, lalu gulingkan ke tepung kering sambil diremas lembut hingga membentuk keriting renyah.', durationMinutes: 5 },
      { step: 2, instruction: 'Goreng ayam dalam minyak banyak (deep fry) bersuhu 170°C sampai cokelat keemasan dan matang merata.', durationMinutes: 12 },
      { step: 3, instruction: 'Ulek kasar cabai rawit merah, bawang putih, garam, dan kaldu bubuk di cobek.', durationMinutes: 4 },
      { step: 4, instruction: 'Siram sambal dengan minyak panas bekas menggoreng ayam hingga berdesis wangi.', durationMinutes: 1 },
      { step: 5, instruction: 'Letakkan ayam krispi panas di atas cobek, lalu geprek dengan ulekan hingga remuk menyatu dengan sambal bawang.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Gunakan minyak yang benar-benar panas saat menyiram sambal mentah agar langu bawang putih hilang dan aroma pedasnya semakin nikmat.'
    ],
    ingredientAlternatives: [
      'Cabai rawit bisa dikombinasikan dengan cabai keriting untuk menurunkan tingkat kepedasan.'
    ]
  },

  // 6. Gudeg Komplit Yogyakarta
  {
    id: 'gudeg-yogyakarta',
    name: 'Gudeg Komplit Yogyakarta',
    slug: 'gudeg-yogyakarta',
    description: 'Nangka muda yang dimasak perlahan berjam-jam bersama gula aren murni, daun jati, ketumbar, dan santan kental, disajikan dengan telur pindang dan areh gurih.',
    category: 'Makanan Tradisional',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=900&q=80',
    cookingTime: 120,
    prepTime: 25,
    difficulty: 'Sedang',
    servings: 6,
    estimatedCalories: 450,
    isPopular: false,
    tags: ['Tradisional', 'Yogya', 'Manis', 'Nangka'],
    ingredients: [
      { name: 'Nangka muda (potong-potong)', quantity: 750, unit: 'gram' },
      { name: 'Telur rebus kupas', quantity: 4, unit: 'butir' },
      { name: 'Santan kental sedang', quantity: 1200, unit: 'ml' },
      { name: 'Gula merah kelapa (sisir halus)', quantity: 150, unit: 'gram' },
      { name: 'Daun salam', quantity: 6, unit: 'lembar' },
      { name: 'Lengkuas (memarkan)', quantity: 5, unit: 'cm' },
      { name: 'Bawang merah (halus)', quantity: 10, unit: 'butir' },
      { name: 'Bawang putih (halus)', quantity: 5, unit: 'siung' },
      { name: 'Ketumbar sangrai', quantity: 1, unit: 'sdm' },
      { name: 'Kemiri sangrai', quantity: 5, unit: 'butir' },
      { name: 'Garam', quantity: 1.5, unit: 'sdt' }
    ],
    instructions: [
      { step: 1, instruction: 'Alasi dasar panci tebal dengan daun salam dan irisan lengkuas.', durationMinutes: 5 },
      { step: 2, instruction: 'Susun nangka muda dan telur rebus di atas alas daun.', durationMinutes: 5 },
      { step: 3, instruction: 'Campur bumbu halus bersama gula aren, santan, dan garam. Tuangkan ke dalam panci hingga nangka terendam.', durationMinutes: 10 },
      { step: 4, instruction: 'Tutup rapat panci, masak dengan api kecil selama 2-3 jam sampai kuah habis menyerap dan nangka menjadi kemerahan lembut.', durationMinutes: 100 }
    ],
    cookingTips: [
      'Gunakan panci tanah liat (kuali) atau panci berdinding tebal dengan api lilin untuk hasil gudeg yang legit dan berwarna gelap alami.'
    ],
    ingredientAlternatives: [
      'Kulit daun jati dapat ditambahkan saat merebus nangka untuk warna merah tua yang autentik.'
    ]
  },

  // 7. Rawon Daging Surabaya
  {
    id: 'rawon-daging',
    name: 'Rawon Daging Surabaya',
    slug: 'rawon-daging',
    description: 'Sup daging sapi berkuah hitam pekat eksotis khas Jawa Timur, beraroma kluwek fermentasi yang gurih dalam, disajikan dengan tauge pendek dan telur asin.',
    category: 'Makanan Tradisional',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=900&q=80',
    cookingTime: 90,
    prepTime: 25,
    difficulty: 'Sedang',
    servings: 5,
    estimatedCalories: 410,
    isPopular: true,
    tags: ['Sup', 'Daging Sapi', 'Tradisional', 'Jawa Timur', 'Kluwek'],
    ingredients: [
      { name: 'Daging sapi sandung lamur (brisket)', quantity: 600, unit: 'gram' },
      { name: 'Kluwek (pilih yang hitam manis, rendam air hangat)', quantity: 5, unit: 'buah' },
      { name: 'Serai (memarkan)', quantity: 2, unit: 'batang' },
      { name: 'Daun jeruk purut', quantity: 4, unit: 'lembar' },
      { name: 'Air kaldu sapi', quantity: 1800, unit: 'ml' },
      { name: 'Bawang merah', quantity: 8, unit: 'butir' },
      { name: 'Bawang putih', quantity: 5, unit: 'siung' },
      { name: 'Kunyit bakar', quantity: 2, unit: 'cm' },
      { name: 'Jahe', quantity: 2, unit: 'cm' },
      { name: 'Ketumbar sangrai', quantity: 1, unit: 'sdt' },
      { name: 'Tauge pendek & telur asin untuk pelengkap', quantity: 100, unit: 'gram' }
    ],
    instructions: [
      { step: 1, instruction: 'Rebus daging sandung lamur hingga empuk berkaldu, angkat lalu potong dadu 2 cm. Saring air kaldunya.', durationMinutes: 40 },
      { step: 2, instruction: 'Haluskan daging kluwek bersama bumbu rempah lainnya hingga menjadi pasta pekat halus.', durationMinutes: 10 },
      { step: 3, instruction: 'Tumis pasta bumbu kluwek bersama serai dan daun jeruk sampai matang pekat dan harum harum khas.', durationMinutes: 12 },
      { step: 4, instruction: 'Masukkan bumbu tumis dan potongan daging ke dalam panci kaldu sapi. Masak hingga bumbu meresap ke dalam serat daging.', durationMinutes: 25 },
      { step: 5, instruction: 'Sajikan panas dengan taburan daun bawang, sambal terasi, tauge pendek mentah segar, dan telur asin masir.', durationMinutes: 3 }
    ],
    cookingTips: [
      'Cicipi isi kluwek sebelum dihaluskan; hindari kluwek yang rasanya pahit karena akan merusak seluruh kuah rawon.'
    ],
    ingredientAlternatives: [
      'Bisa dicampur sengkel sapi atau iga sapi untuk variasi tekstur yang lebih kenyal juicy.'
    ]
  },

  // 8. Gado-Gado Siram Spesial
  {
    id: 'gado-gado',
    name: 'Gado-Gado Siram Bumbu Kacang',
    slug: 'gado-gado',
    description: 'Salad sayuran rebus tropis Indonesia lengkap dengan tahu, tempe, kentang, dan telur rebus yang disiram kuah kacang tanah kental nan creamy harum daun jeruk.',
    category: 'Makanan Sehat',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    cookingTime: 25,
    prepTime: 20,
    difficulty: 'Mudah',
    servings: 3,
    estimatedCalories: 380,
    isPopular: false,
    tags: ['Sayur', 'Sehat', 'Tradisional', 'Vegetarian Friendly'],
    ingredients: [
      { name: 'Kacang panjang (potong rebus)', quantity: 100, unit: 'gram' },
      { name: 'Tauge (seduh)', quantity: 75, unit: 'gram' },
      { name: 'Kol (iris rebus)', quantity: 75, unit: 'gram' },
      { name: 'Kentang rebus (potong dadu)', quantity: 2, unit: 'buah' },
      { name: 'Tahu & tempe goreng', quantity: 150, unit: 'gram' },
      { name: 'Telur rebus (belah dua)', quantity: 2, unit: 'butir' },
      { name: 'Kacang tanah sangrai goreng (haluskan)', quantity: 200, unit: 'gram' },
      { name: 'Gula merah kelapa', quantity: 50, unit: 'gram' },
      { name: 'Bawang putih & cabai merah', quantity: 3, unit: 'buah' },
      { name: 'Santan encer hangat', quantity: 250, unit: 'ml' },
      { name: 'Air perasan jeruk limau', quantity: 1, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Rebus sayuran (kacang panjang, tauge, kol) secara terpisah hingga matang al dente, lalu celup sebentar ke air dingin agar warnanya tetap hijau cerah.', durationMinutes: 8 },
      { step: 2, instruction: 'Haluskan cabai, bawang putih, garam, dan gula merah, lalu campurkan kacang tanah tumbuk.', durationMinutes: 6 },
      { step: 3, instruction: 'Masak bumbu kacang dengan santan encer di atas api kecil hingga mengental, berminyak, dan licin aromatik.', durationMinutes: 8 },
      { step: 4, instruction: 'Tata sayuran, tahu, tempe, kentang, dan telur di piring saji. Siram dengan bumbu kacang hangat dan taburi kerupuk emping melinjo.', durationMinutes: 3 }
    ],
    cookingTips: [
      'Gunakan kacang tanah tuban yang disangrai dengan kulit arinya untuk rasa bumbu kacang yang lebih gurih dan pekat.'
    ],
    ingredientAlternatives: [
      'Santan bisa diganti air hangat matang untuk variasi gado-gado yang lebih ringan dan rendah kalori.'
    ]
  },

  // 9. Sate Ayam Madura
  {
    id: 'sate-ayam',
    name: 'Sate Ayam Bumbu Kacang Madura',
    slug: 'sate-ayam',
    description: 'Tusukan fillet dada ayam empuk yang dimarinasi bumbu ketumbar, dibakar harum di atas bara arang, disiram kuah kacang legit kental dan kecap manis.',
    category: 'Makanan Tradisional',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    cookingTime: 30,
    prepTime: 25,
    difficulty: 'Sedang',
    servings: 4,
    estimatedCalories: 440,
    isPopular: true,
    tags: ['Ayam', 'Panggang', 'Tradisional', 'Populer'],
    ingredients: [
      { name: 'Daging dada ayam (potong dadu)', quantity: 500, unit: 'gram' },
      { name: 'Tusuk sate (rendam air)', quantity: 20, unit: 'buah' },
      { name: 'Bumbu kacang sate halus', quantity: 250, unit: 'gram' },
      { name: 'Kecap manis', quantity: 4, unit: 'sdm' },
      { name: 'Minyak sayur', quantity: 2, unit: 'sdm' },
      { name: 'Bawang merah iris & cabai rawit iris', quantity: 30, unit: 'gram' }
    ],
    instructions: [
      { step: 1, instruction: 'Tusuk potongan daging ayam ke tusuk sate (3-4 potong per tusuk).', durationMinutes: 10 },
      { step: 2, instruction: 'Campur 2 sdm bumbu kacang, 2 sdm kecap manis, dan sedikit minyak sebagai bahan olesan.', durationMinutes: 3 },
      { step: 3, instruction: 'Celupkan sate ke bahan olesan, lalu bakar di atas bara api / panggangan grill pan sambil dibolak-balik hingga setengah matang.', durationMinutes: 8 },
      { step: 4, instruction: 'Olesi kembali dengan bumbu olesan, bakar lagi hingga matang merata dan terbentuk karamelisasi smoky.', durationMinutes: 7 },
      { step: 5, instruction: 'Sajikan sate hangat dengan siraman sisa bumbu kacang, kecap manis, irisan bawang merah segar, dan potongan lontong.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Rendam tusuk sate bambu dalam air dingin selama 15 menit sebelum memanggang agar tidak mudah patah atau gosong terbakar.'
    ],
    ingredientAlternatives: [
      'Daging ayam bisa diselingi potongan kulit ayam untuk tekstur yang lebih renyah berminyak.'
    ]
  },

  // 10. Opor Ayam Putih Gurih
  {
    id: 'opor-ayam',
    name: 'Opor Ayam Kuah Putih',
    slug: 'opor-ayam',
    description: 'Sajian ayam berkuah santan lembut kaya rempah ketumbar, jintan, dan lengkuas tanpa cabai, menghadirkan kehangatan gurih santapan keluarga.',
    category: 'Makanan Tradisional',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80',
    cookingTime: 45,
    prepTime: 20,
    difficulty: 'Mudah',
    servings: 4,
    estimatedCalories: 490,
    isPopular: false,
    tags: ['Ayam', 'Santan', 'Tradisional', 'Keluarga'],
    ingredients: [
      { name: 'Daging ayam (potong 8)', quantity: 800, unit: 'gram' },
      { name: 'Santan kental sedang', quantity: 800, unit: 'ml' },
      { name: 'Serai (memarkan)', quantity: 2, unit: 'batang' },
      { name: 'Daun salam', quantity: 3, unit: 'lembar' },
      { name: 'Bawang merah', quantity: 8, unit: 'butir' },
      { name: 'Bawang putih', quantity: 4, unit: 'siung' },
      { name: 'Kemiri sangrai', quantity: 4, unit: 'butir' },
      { name: 'Ketumbar sangrai', quantity: 1, unit: 'sdt' },
      { name: 'Jintan bubuk', quantity: 0.25, unit: 'sdt' },
      { name: 'Garam & gula pasir', quantity: 1.5, unit: 'sdt' }
    ],
    instructions: [
      { step: 1, instruction: 'Haluskan bawang merah, bawang putih, kemiri, ketumbar, jintan, dan garam.', durationMinutes: 8 },
      { step: 2, instruction: 'Tumis bumbu halus dengan serai dan daun salam hingga harum matang tidak langu.', durationMinutes: 5 },
      { step: 3, instruction: 'Masukkan potongan ayam, aduk hingga ayam kaku dan berubah warna keputihan.', durationMinutes: 7 },
      { step: 4, instruction: 'Tuangkan santan, masak dengan api sedang sambil sesekali diaduk agar santan tidak pecah.', durationMinutes: 20 },
      { step: 5, instruction: 'Bumbui gula dan garam, masak hingga ayam benar-benar empuk dan kuah gurih mengental.', durationMinutes: 5 }
    ],
    cookingTips: [
      'Gunakan api kecil saat mendidihkan santan dan aduk perlahan agar santan tetap menyatu halus creamy.'
    ],
    ingredientAlternatives: [
      'Tambahkan telur rebus atau tahu goreng sebagai pendamping isi kuah opor.'
    ]
  },

  // 11. Chicken Teriyaki Donburi
  {
    id: 'chicken-teriyaki',
    name: 'Chicken Teriyaki Glaze',
    slug: 'chicken-teriyaki',
    description: 'Potongan fillet paha ayam juicy yang dipanggang dengan olesan saus teriyaki manis gurih berkilau, disajikan di atas semangkuk nasi hangat dan taburan wijen.',
    category: 'Makanan Utama',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&w=900&q=80',
    cookingTime: 25,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 2,
    estimatedCalories: 460,
    isPopular: true,
    tags: ['Ayam', 'Jepang', 'Cepat', 'Praktis', 'Populer'],
    ingredients: [
      { name: 'Paha ayam tanpa tulang (fillet)', quantity: 350, unit: 'gram' },
      { name: 'Kecap asin Jepang (Shoyu)', quantity: 3, unit: 'sdm' },
      { name: 'Madu atau gula pasir', quantity: 2, unit: 'sdm' },
      { name: 'Jahe parut segar', quantity: 1, unit: 'sdt' },
      { name: 'Bawang putih parut', quantity: 2, unit: 'siung' },
      { name: 'Minyak wijen', quantity: 1, unit: 'sdt' },
      { name: 'Biji wijen sangrai untuk taburan', quantity: 1, unit: 'sdm' },
      { name: 'Bawang bombay (iris memanjang)', quantity: 0.5, unit: 'buah' }
    ],
    instructions: [
      { step: 1, instruction: 'Campurkan shoyu, madu, jahe parut, dan bawang putih dalam mangkuk kecil hingga gula larut.', durationMinutes: 3 },
      { step: 2, instruction: 'Panaskan wajan dengan sedikit minyak. Panggang paha ayam dengan posisi kulit menghadap ke bawah hingga kulit renyah kecokelatan.', durationMinutes: 6 },
      { step: 3, instruction: 'Balik ayam, masukkan irisan bawang bombay, dan masak hingga ayam hampir matang sempurna.', durationMinutes: 5 },
      { step: 4, instruction: 'Tuangkan campuran saus teriyaki ke dalam wajan. Masak dengan api sedang-kecil hingga saus mengental (glaze) dan membalut seluruh daging ayam.', durationMinutes: 7 },
      { step: 5, instruction: 'Potong-potong ayam, susun di atas nasi putih, tuangkan sisa saus karamel di wajan, dan taburi biji wijen serta daun bawang iris.', durationMinutes: 4 }
    ],
    cookingTips: [
      'Gunakan daging paha ayam (chicken thigh) daripada dada agar teksturnya tetap empuk juicy saat dimasak dengan saus berkilau.'
    ],
    ingredientAlternatives: [
      'Daging ayam bisa diganti dengan fillet salmon atau irisan daging sapi tipis (beef teriyaki).'
    ]
  },

  // 12. Crispy Chicken Katsu Curry
  {
    id: 'chicken-katsu',
    name: 'Crispy Chicken Katsu',
    slug: 'chicken-katsu',
    description: 'Fillet dada ayam renyah keemasan dibalut tepung roti panko Jepang yang ekstra krispi di luar namun tetap lembut dan berair di dalam.',
    category: 'Makanan Utama',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=900&q=80',
    cookingTime: 25,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 2,
    estimatedCalories: 520,
    isPopular: true,
    tags: ['Ayam', 'Jepang', 'Krispi', 'Populer'],
    ingredients: [
      { name: 'Fillet dada ayam (belah dua membujur)', quantity: 300, unit: 'gram' },
      { name: 'Tepung terigu protein sedang', quantity: 60, unit: 'gram' },
      { name: 'Telur ayam (kocok lepas)', quantity: 1, unit: 'butir' },
      { name: 'Tepung panko kasar Jepang', quantity: 100, unit: 'gram' },
      { name: 'Garam & lada hitam bubuk', quantity: 0.5, unit: 'sdt' },
      { name: 'Bawang putih bubuk', quantity: 0.5, unit: 'sdt' },
      { name: 'Minyak untuk menggoreng', quantity: 400, unit: 'ml' }
    ],
    instructions: [
      { step: 1, instruction: 'Pukul-pukul lembut dada ayam dengan pemukul daging agar ketebalannya rata. Bumbui dengan garam, lada, dan bawang putih bubuk.', durationMinutes: 5 },
      { step: 2, instruction: 'Balurkan ayam ke tepung terigu tipis-tipis, lalu celupkan ke dalam kocokan telur.', durationMinutes: 3 },
      { step: 3, instruction: 'Gulingkan ayam ke tepung panko sambil ditekan perlahan agar remah panko menempel lebat di seluruh permukaan.', durationMinutes: 4 },
      { step: 4, instruction: 'Panaskan minyak goreng ke suhu 175°C. Goreng ayam selama 4-5 menit per sisi hingga berwarna emas renyah sempurna.', durationMinutes: 10 },
      { step: 5, instruction: 'Tiriskan di atas rak kawat, potong memanjang, dan sajikan dengan saus tonkatsu atau saus sambal.', durationMinutes: 3 }
    ],
    cookingTips: [
      'Gunakan rak kawat tirisan daripada tisu dapur agar uap panas tidak membuat bagian bawah katsu menjadi lembap.'
    ],
    ingredientAlternatives: [
      'Panko dapat diganti dengan tepung panir biasa, meskipun hasilnya akan sedikit kurang renyah.'
    ]
  },

  // 13. Spaghetti Carbonara Creamy
  {
    id: 'spaghetti-carbonara',
    name: 'Spaghetti Carbonara Autentik',
    slug: 'spaghetti-carbonara',
    description: 'Pasta spaghetti al dente yang dibalut saus telur kaya rasa dan keju parmesan gurih, bertabur smoked beef renyah serta retakan lada hitam segar.',
    category: 'Makanan Utama',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=900&q=80',
    cookingTime: 20,
    prepTime: 10,
    difficulty: 'Sedang',
    servings: 2,
    estimatedCalories: 560,
    isPopular: false,
    tags: ['Pasta', 'Italia', 'Cepat', 'Creamy'],
    ingredients: [
      { name: 'Spaghetti kering', quantity: 200, unit: 'gram' },
      { name: 'Kuning telur ayam segar', quantity: 3, unit: 'butir' },
      { name: 'Keju Parmesan / Grana Padano parut', quantity: 50, unit: 'gram' },
      { name: 'Daging asap (smoked beef) iris', quantity: 80, unit: 'gram' },
      { name: 'Lada hitam butiran gerus kasar', quantity: 1, unit: 'sdt' },
      { name: 'Air rebusan pasta', quantity: 80, unit: 'ml' },
      { name: 'Garam untuk air rebusan', quantity: 1, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Rebus spaghetti dalam air mendidih bergaram hingga tingkat kematangan al dente (sekitar 8-9 menit). Sisihkan 1 cangkir air rebusan pasta.', durationMinutes: 9 },
      { step: 2, instruction: 'Dalam mangkuk, kocok kuning telur bersama parutan keju parmesan dan lada hitam tumbuk hingga berbentuk pasta kental.', durationMinutes: 3 },
      { step: 3, instruction: 'Tumis irisan daging asap di wajan tanpa minyak tambahan hingga harum dan bertekstur krispi.', durationMinutes: 4 },
      { step: 4, instruction: 'Matikan api wajan atau kecilkan seminimal mungkin. Masukkan pasta langsung ke dalam wajan berisi daging asap.', durationMinutes: 1 },
      { step: 5, instruction: 'Tuangkan campuran telur dan keju bersama sedikit air rebusan pasta, aduk cepat memutar hingga saus mengemulsi menjadi krim sutra yang mengkilap.', durationMinutes: 3 }
    ],
    cookingTips: [
      'Jangan menuangkan saus telur saat wajan masih sangat panas menyala karena telur akan menggumpal menjadi orak-arik (scrambled) alih-alih menjadi saus sutra.'
    ],
    ingredientAlternatives: [
      'Jika ingin tekstur lebih basah mudah, bisa menambahkan 2 sdm cooking cream.'
    ]
  },

  // 14. Gourmet Beef Burger
  {
    id: 'beef-burger',
    name: 'Gourmet Beef Burger',
    slug: 'beef-burger',
    description: 'Patty daging sapi pilihan yang dipanggang juicy sempurna, berlapis lelehan keju cheddar, selada renyah, saus spesial, dan roti bun brioche bermentega lembut.',
    category: 'Makanan Utama',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    cookingTime: 20,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 2,
    estimatedCalories: 640,
    isPopular: false,
    tags: ['Burger', 'Daging Sapi', 'Barat', 'Praktis'],
    ingredients: [
      { name: 'Daging sapi cincang (80% daging, 20% lemak)', quantity: 300, unit: 'gram' },
      { name: 'Roti burger bun brioche', quantity: 2, unit: 'buah' },
      { name: 'Keju cheddar slice', quantity: 2, unit: 'lembar' },
      { name: 'Selada romaine / iceberg', quantity: 4, unit: 'lembar' },
      { name: 'Tomat segar (iris bulat)', quantity: 1, unit: 'buah' },
      { name: 'Bawang bombay (iris tipis karamelisasi)', quantity: 0.5, unit: 'buah' },
      { name: 'Mayones & saus mustard', quantity: 2, unit: 'sdm' },
      { name: 'Mentega tawar', quantity: 1, unit: 'sdm' },
      { name: 'Garam & merica hitam', quantity: 0.5, unit: 'sdt' }
    ],
    instructions: [
      { step: 1, instruction: 'Bagi daging cincang menjadi 2 bola (150g), tekan lembut menjadi bulatan patty setebal 2 cm. Taburi garam dan lada tepat sebelum dimasak.', durationMinutes: 4 },
      { step: 2, instruction: 'Panaskan wajan besi (cast iron). Panggang roti burger yang sudah diolesi mentega hingga keemasan, lalu angkat.', durationMinutes: 3 },
      { step: 3, instruction: 'Panggang patty daging di wajan panas selama 3-4 menit per sisi tanpa ditekan-tekan.', durationMinutes: 7 },
      { step: 4, instruction: 'Letakkan selembar keju cheddar di atas patty 1 menit sebelum diangkat, tutup wajan sebentar hingga keju meleleh lumer.', durationMinutes: 2 },
      { step: 5, instruction: 'Susun burger: roti bawah, saus mayones, selada, irisan tomat, patty daging berkeju, bawang bombay, dan roti atas.', durationMinutes: 4 }
    ],
    cookingTips: [
      'Gunakan daging dengan rasio lemak 20% (chuck beef) agar burger tetap juicy dan tidak kering saat dipanggang.'
    ],
    ingredientAlternatives: [
      'Keju cheddar dapat digantikan keju mozzarella atau gouda sesuai selera.'
    ]
  },

  // 15. Shoyu Ramen Jepang
  {
    id: 'japanese-ramen',
    name: 'Japanese Shoyu Ramen',
    slug: 'japanese-ramen',
    description: 'Mie ramen kenyal dalam kuah kaldu shoyu kecap Jepang yang gurih kaya umami, lengkap dengan telur ajitsuke tamago lembut, nori, dan irisan daging ayam chashu.',
    category: 'Makanan Utama',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80',
    cookingTime: 35,
    prepTime: 20,
    difficulty: 'Sedang',
    servings: 2,
    estimatedCalories: 510,
    isPopular: false,
    tags: ['Mie', 'Jepang', 'Sup', 'Kuah Gurih'],
    ingredients: [
      { name: 'Mie ramen basah', quantity: 200, unit: 'gram' },
      { name: 'Kaldu ayam pekat', quantity: 800, unit: 'ml' },
      { name: 'Kecap asin Shoyu Jepang', quantity: 3, unit: 'sdm' },
      { name: 'Minyak wijen & bawang putih cincang', quantity: 1, unit: 'sdm' },
      { name: 'Dashi bubuk (kaldu ikan Jepang)', quantity: 1, unit: 'sdt' },
      { name: 'Telur ramen setengah matang (Ajitama)', quantity: 2, unit: 'butir' },
      { name: 'Lembar rumput laut nori', quantity: 2, unit: 'lembar' },
      { name: 'Irisan daun bawang Jepang (negi)', quantity: 2, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Panaskan kaldu ayam bersama shoyu, dashi, dan minyak bawang putih dalam panci hingga mendidih lembut.', durationMinutes: 10 },
      { step: 2, instruction: 'Di panci lain, rebus mie ramen dalam air mendidih selama 2-3 menit sesuai kematangan yang diinginkan, tiriskan.', durationMinutes: 5 },
      { step: 3, instruction: 'Tuangkan kuah sup ramen panas ke dalam mangkuk saji.', durationMinutes: 2 },
      { step: 4, instruction: 'Masukkan mie ke dalam kuah, rapikan menggunakan sumpit.', durationMinutes: 2 },
      { step: 5, instruction: 'Beri topping telur ajitama belah dua, irisan daging ayam, lembaran nori, dan taburan daun bawang segar.', durationMinutes: 3 }
    ],
    cookingTips: [
      'Tiriskan mie ramen sebersih mungkin dari air rebusan agar kuah ramen tidak menjadi hambar encer.'
    ],
    ingredientAlternatives: [
      'Kaldu ayam bisa dipadukan dengan sedikit kaldu jamur shitake untuk rasa umami nabati yang semakin kaya.'
    ]
  },

  // 16. Korean Sweet & Spicy Fried Chicken
  {
    id: 'korean-fried-chicken',
    name: 'Korean Fried Chicken (Yangnyeom)',
    slug: 'korean-fried-chicken',
    description: 'Ayam goreng khas Korea yang digoreng garing dua kali lalu dibalut saus gochujang merah berkilau dengan rasa manis, pedas, dan taburan kacang sangrai.',
    category: 'Makanan Utama',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80',
    cookingTime: 35,
    prepTime: 20,
    difficulty: 'Sedang',
    servings: 3,
    estimatedCalories: 580,
    isPopular: false,
    tags: ['Ayam', 'Korea', 'Pedas Manis', 'Krispi'],
    ingredients: [
      { name: 'Sayap atau paha bawah ayam', quantity: 600, unit: 'gram' },
      { name: 'Tepung maizena / kentang', quantity: 80, unit: 'gram' },
      { name: 'Pasta Gochujang Korea', quantity: 2, unit: 'sdm' },
      { name: 'Madu atau sirup jagung', quantity: 3, unit: 'sdm' },
      { name: 'Kecap asin & saus tomat', quantity: 1, unit: 'sdm' },
      { name: 'Bawang putih cincang halus', quantity: 3, unit: 'siung' },
      { name: 'Kacang tanah sangrai cincang', quantity: 2, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Bumbui potongan ayam dengan garam, lada hitam, dan jahe parut. Balurkan ke tepung maizena hingga merata.', durationMinutes: 7 },
      { step: 2, instruction: 'Goreng ayam pertama kali selama 8 menit dengan api sedang hingga matang pucat. Tiriskan selama 5 menit.', durationMinutes: 13 },
      { step: 3, instruction: 'Goreng kembali ayam untuk kedua kalinya dengan api besar selama 3-4 menit sampai permukaan ekstra renyah keemasan.', durationMinutes: 4 },
      { step: 4, instruction: 'Di wajan terpisah, tumis bawang putih bersama gochujang, madu, kecap asin, dan saus tomat sampai meletup-letup kental.', durationMinutes: 4 },
      { step: 5, instruction: 'Masukkan ayam goreng renyah ke dalam wajan saus, aduk cepat hingga tersalut rata, lalu taburi kacang tanah sangrai.', durationMinutes: 3 }
    ],
    cookingTips: [
      'Teknik penggorengan dua kali (double fry) adalah rahasia mutlak agar kulit ayam tetap renyah tahan lama meski telah disiram saus kental.'
    ],
    ingredientAlternatives: [
      'Gochujang dapat dikombinasikan dengan bubuk cabai rawit jika ingin tingkat kepedasan yang lebih intens.'
    ]
  },

  // 17. Chicken Garlic Rice
  {
    id: 'chicken-garlic-rice',
    name: 'Butter Chicken Garlic Rice',
    slug: 'chicken-garlic-rice',
    description: 'Nasi mentega wangi beraroma bawang putih keemasan yang dimasak bersama potongan ayam empuk gurih, kecap jepang, dan taburan daun parsley segar.',
    category: 'Sarapan',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    cookingTime: 20,
    prepTime: 10,
    difficulty: 'Mudah',
    servings: 2,
    estimatedCalories: 430,
    isPopular: false,
    tags: ['Nasi', 'Bawang Putih', 'Cepat', 'Praktis'],
    ingredients: [
      { name: 'Nasi putih pulen matang', quantity: 350, unit: 'gram' },
      { name: 'Daging dada ayam (potong dadu kecil)', quantity: 150, unit: 'gram' },
      { name: 'Bawang putih (cincang sangat halus)', quantity: 6, unit: 'siung' },
      { name: 'Mentega tawar (butter)', quantity: 2, unit: 'sdm' },
      { name: 'Kecap asin (soy sauce)', quantity: 1, unit: 'sdm' },
      { name: 'Lada bubuk & garam', quantity: 0.5, unit: 'sdt' },
      { name: 'Daun bawang cincang', quantity: 2, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Panaskan separuh mentega di wajan. Goreng sebagian bawang putih cincang hingga keemasan dan renyah (crispy garlic chips), angkat untuk taburan.', durationMinutes: 4 },
      { step: 2, instruction: 'Dengan sisa mentega, tumis sisa bawang putih dan potongan ayam hingga ayam matang empuk.', durationMinutes: 5 },
      { step: 3, instruction: 'Masukkan nasi putih hangat, tuangkan kecap asin, garam, dan lada. Aduk rata di atas api sedang.', durationMinutes: 6 },
      { step: 4, instruction: 'Tambahkan irisan daun bawang, aduk sebentar hingga aroma mentega dan bawang putih menyatu hangat.', durationMinutes: 3 },
      { step: 5, instruction: 'Sajikan dengan taburan keripik bawang putih renyah di atasnya.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Gunakan api kecil saat menggoreng bawang putih agar tidak cepat gosong pahit.'
    ],
    ingredientAlternatives: [
      'Ayam dapat digantikan telur orak-arik atau jamur champignon untuk opsi vegetarian.'
    ]
  },

  // 18. Fluffy Strawberry Pancake
  {
    id: 'pancake-strawberry',
    name: 'Fluffy Strawberry Pancake',
    slug: 'pancake-strawberry',
    description: 'Pancake lembut bergaya souffle ringan yang mengembang empuk, disajikan dengan buah strawberry segar berair, sirup maple manis, dan taburan gula halus.',
    category: 'Sarapan',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80',
    cookingTime: 20,
    prepTime: 10,
    difficulty: 'Mudah',
    servings: 2,
    estimatedCalories: 340,
    isPopular: true,
    tags: ['Sarapan', 'Manis', 'Dessert', 'Cepat', 'Populer'],
    ingredients: [
      { name: 'Tepung terigu serbaguna', quantity: 150, unit: 'gram' },
      { name: 'Susu cair segar (full cream)', quantity: 180, unit: 'ml' },
      { name: 'Telur ayam', quantity: 1, unit: 'butir' },
      { name: 'Baking powder', quantity: 1.5, unit: 'sdt' },
      { name: 'Gula pasir halus', quantity: 2, unit: 'sdm' },
      { name: 'Mentega cair', quantity: 2, unit: 'sdm' },
      { name: 'Strawberry segar (iris)', quantity: 100, unit: 'gram' },
      { name: 'Sirup maple atau madu', quantity: 3, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Campurkan tepung terigu, baking powder, dan gula dalam mangkuk besar. Aduk rata.', durationMinutes: 3 },
      { step: 2, instruction: 'Dalam mangkuk terpisah, kocok susu, telur, dan mentega cair. Tuangkan ke dalam bahan kering, aduk perlahan (jangan diaduk berlebih/overmix).', durationMinutes: 3 },
      { step: 3, instruction: 'Panaskan wajan teflon anti lengket dengan api kecil dan sedikit olesan mentega.', durationMinutes: 2 },
      { step: 4, instruction: 'Tuangkan satu sendok sayur adonan. Masak hingga muncul gelembung udara di permukaan (sekitar 2 menit), balik dan masak sisi satunya hingga keemasan.', durationMinutes: 8 },
      { step: 5, instruction: 'Tumpuk pancake hangat, beri irisan strawberry segar melimpah, dan kucuri sirup maple manis harum.', durationMinutes: 3 }
    ],
    cookingTips: [
      'Biarkan beberapa gumpalan kecil tersisa di adonan (jangan terlalu lama mengaduk) agar pancake mengembang tinggi dan berserat empuk seperti bantal.'
    ],
    ingredientAlternatives: [
      'Susu sapi bisa diganti dengan susu kedelai atau oat milk, dan strawberry bisa diganti buah pisang atau blueberry.'
    ]
  },

  // 19. Pisang Goreng Madu Karamel
  {
    id: 'pisang-goreng-madu',
    name: 'Pisang Goreng Madu Karamel',
    slug: 'pisang-goreng-madu',
    description: 'Pisang raja matang manis yang dipotong dan dibalut adonan tepung madu, digoreng hingga membentuk karamelisasi kecokelatan renyah di luar dan lumer di dalam.',
    category: 'Camilan',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80',
    cookingTime: 20,
    prepTime: 10,
    difficulty: 'Mudah',
    servings: 4,
    estimatedCalories: 260,
    isPopular: false,
    tags: ['Pisang', 'Manis', 'Camilan', 'Kopi', 'Cepat'],
    ingredients: [
      { name: 'Pisang raja matang (potong bulat)', quantity: 5, unit: 'buah' },
      { name: 'Tepung terigu', quantity: 100, unit: 'gram' },
      { name: 'Tepung beras', quantity: 30, unit: 'gram' },
      { name: 'Madu alami', quantity: 3, unit: 'sdm' },
      { name: 'Gula aren cair', quantity: 1, unit: 'sdm' },
      { name: 'Garam', quantity: 0.25, unit: 'sdt' },
      { name: 'Air dingin', quantity: 120, unit: 'ml' },
      { name: 'Minyak untuk menggoreng', quantity: 400, unit: 'ml' }
    ],
    instructions: [
      { step: 1, instruction: 'Campurkan tepung terigu, tepung beras, madu, gula aren cair, garam, dan air dingin hingga membentuk adonan kental licin.', durationMinutes: 5 },
      { step: 2, instruction: 'Masukkan irisan pisang raja ke dalam adonan, aduk perlahan hingga seluruh pisang terselimuti.', durationMinutes: 3 },
      { step: 3, instruction: 'Sendokkan adonan pisang ke dalam wajan minyak panas bersuhu sedang.', durationMinutes: 2 },
      { step: 4, instruction: 'Goreng hingga madu terkaramelisasi membentuk bercak cokelat gelap khas yang renyah legit.', durationMinutes: 8 },
      { step: 5, instruction: 'Angkat, tiriskan, dan nikmati selagi hangat bersama kopi hitam.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Gunakan pisang yang sudah memiliki bintik hitam pada kulitnya (sangat matang) agar rasa manis alaminya menyatu sempurna dengan madu.'
    ],
    ingredientAlternatives: [
      'Bisa menggunakan pisang kepok matang pohon atau pisang tanduk.'
    ]
  },

  // 20. Fudgy Brownies Cokelat
  {
    id: 'brownies-cokelat',
    name: 'Fudgy Brownies Cokelat Panggang',
    slug: 'brownies-cokelat',
    description: 'Brownies panggang dengan lapisan atas shiny crust berkilau tipis, bagian dalam yang padat, lembap (fudgy), serta aroma cokelat couverture pekat menggoda.',
    category: 'Dessert',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    cookingTime: 35,
    prepTime: 20,
    difficulty: 'Sedang',
    servings: 8,
    estimatedCalories: 320,
    isPopular: false,
    tags: ['Cokelat', 'Dessert', 'Kue', 'Panggang'],
    ingredients: [
      { name: 'Dark cooking chocolate (DCC 70%)', quantity: 150, unit: 'gram' },
      { name: 'Mentega tawar (butter)', quantity: 60, unit: 'gram' },
      { name: 'Minyak sayur', quantity: 40, unit: 'ml' },
      { name: 'Telur ayam', quantity: 2, unit: 'butir' },
      { name: 'Gula kastor / gula halus', quantity: 130, unit: 'gram' },
      { name: 'Tepung terigu protein sedang', quantity: 100, unit: 'gram' },
      { name: 'Cokelat bubuk pekat', quantity: 35, unit: 'gram' }
    ],
    instructions: [
      { step: 1, instruction: 'Lelehkan dark chocolate bersama mentega dan minyak sayur dengan teknik double boiler (tim). Sisihkan hingga hangat kuku.', durationMinutes: 7 },
      { step: 2, instruction: 'Kocok telur dan gula kastor dengan whisk hingga gula benar-benar larut (kunci terbentuknya lapisan mengkilap shiny crust).', durationMinutes: 6 },
      { step: 3, instruction: 'Tuangkan lelehan cokelat ke dalam kocokan telur, aduk rata dengan spatula.', durationMinutes: 3 },
      { step: 4, instruction: 'Ayak tepung terigu dan cokelat bubuk ke dalam adonan. Aduk lipat hingga adonan menjadi berat dan mengilap.', durationMinutes: 4 },
      { step: 5, instruction: 'Tuang ke loyang berukuran 20x20 cm yang dialasi kertas roti. Panggang pada suhu 170°C selama 25-30 menit.', durationMinutes: 30 }
    ],
    cookingTips: [
      'Pastikan butiran gula benar-benar larut bersama telur sebelum dicampur dengan lelehan cokelat agar lapisan shiny crust terbentuk sempurna di oven.'
    ],
    ingredientAlternatives: [
      'Dapat ditaburi kepingan almond panggang, kacang kenari, atau chocochips di atasnya.'
    ]
  },

  // 21. Puding Cokelat Vla Vanila
  {
    id: 'puding-cokelat',
    name: 'Puding Cokelat Sutra Vla Vanila',
    slug: 'puding-cokelat',
    description: 'Puding cokelat lembut selembut sutra dengan rasa cokelat yang kaya, disajikan dingin bersama siraman vla vanila susu yang creamy manis aromatik.',
    category: 'Dessert',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
    cookingTime: 15,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 6,
    estimatedCalories: 210,
    isPopular: false,
    tags: ['Dessert', 'Cokelat', 'Dingin', 'Manis'],
    ingredients: [
      { name: 'Bubuk agar-agar cokelat', quantity: 1, unit: 'bungkus' },
      { name: 'Bubuk jelly plain', quantity: 1, unit: 'sdt' },
      { name: 'Susu cair cokelat / full cream', quantity: 800, unit: 'ml' },
      { name: 'Dark chocolate (potong)', quantity: 70, unit: 'gram' },
      { name: 'Gula pasir', quantity: 80, unit: 'gram' },
      { name: 'Susu evaporasi untuk vla', quantity: 300, unit: 'ml' },
      { name: 'Tepung maizena untuk vla', quantity: 1, unit: 'sdm' },
      { name: 'Ekstrak vanila alami', quantity: 1, unit: 'sdt' }
    ],
    instructions: [
      { step: 1, instruction: 'Campurkan bubuk agar-agar, jelly, gula, dan susu cair dalam panci. Masak dengan api sedang sambil diaduk perlahan.', durationMinutes: 6 },
      { step: 2, instruction: 'Setelah mulai hangat, masukkan potongan dark chocolate, aduk hingga cokelat meleleh dan adonan mendidih.', durationMinutes: 5 },
      { step: 3, instruction: 'Tuangkan ke dalam cetakan puding, biarkan uap panas hilang lalu dinginkan dalam lemari es hingga set padat.', durationMinutes: 60 },
      { step: 4, instruction: 'Untuk vla: masak susu evaporasi, gula, ekstrak vanila, dan larutan maizena hingga meletup kental dan lembut.', durationMinutes: 6 },
      { step: 5, instruction: 'Keluarkan puding dingin dari cetakan, siram dengan vla vanila creamy, dan sajikan segar.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Campuran sedikit bubuk jelly bersama agar-agar menghasilkan tekstur puding yang lebih kenyal lentur dan tidak mudah berair.'
    ],
    ingredientAlternatives: [
      'Vla vanila dapat ditambahkan sedikit rhum essence non-alkohol untuk aroma bakery klasik.'
    ]
  },

  // 22. Risoles Ragout Ayam Sayur
  {
    id: 'risoles-ayam',
    name: 'Risoles Ragout Ayam Sayuran',
    slug: 'risoles-ayam',
    description: 'Kulit crepes lembut yang diisi adonan ragout ayam susu gurih bersama wortel manis dan seledri, dibalut tepung panir renyah keemasan.',
    category: 'Camilan',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80',
    cookingTime: 30,
    prepTime: 25,
    difficulty: 'Sedang',
    servings: 6,
    estimatedCalories: 280,
    isPopular: false,
    tags: ['Camilan', 'Goreng', 'Tradisional', 'Ayam'],
    ingredients: [
      { name: 'Tepung terigu serbaguna', quantity: 150, unit: 'gram' },
      { name: 'Susu cair', quantity: 300, unit: 'ml' },
      { name: 'Telur ayam', quantity: 1, unit: 'butir' },
      { name: 'Daging dada ayam rebus (suwir dadu)', quantity: 120, unit: 'gram' },
      { name: 'Wortel (potong dadu kecil)', quantity: 80, unit: 'gram' },
      { name: 'Bawang bombay (cincang)', quantity: 0.5, unit: 'buah' },
      { name: 'Pala bubuk & lada putih', quantity: 0.5, unit: 'sdt' },
      { name: 'Tepung roti panir halus', quantity: 100, unit: 'gram' }
    ],
    instructions: [
      { step: 1, instruction: 'Buat kulit: aduk rata tepung, telur, garam, dan susu cair. Dadar tipis di wajan teflon satu per satu.', durationMinutes: 12 },
      { step: 2, instruction: 'Buat ragout: tumis bawang bombay dengan mentega, masukkan ayam dan wortel, tuang susu dan sedikit tepung untuk mengentalkan.', durationMinutes: 10 },
      { step: 3, instruction: 'Ambil selembar kulit risoles, beri 1 sendok makan isian ragout hangat di tengahnya.', durationMinutes: 5 },
      { step: 4, instruction: 'Lipat seperti amplop lalu gulung rapi. Celupkan ke larutan terigu cair lalu gulingkan ke tepung panir.', durationMinutes: 6 },
      { step: 5, instruction: 'Goreng dalam minyak panas sedang sampai kuning keemasan renyah.', durationMinutes: 7 }
    ],
    cookingTips: [
      'Simpan risoles yang sudah dipanir di kulkas selama 20 menit sebelum digoreng agar tepung panir menempel kuat dan tidak rontok di minyak.'
    ],
    ingredientAlternatives: [
      'Isian bisa divariasikan dengan menambahkan irisan telur rebus dan smoked beef untuk membuat American Risoles.'
    ]
  },

  // 23. Martabak Manis Bangka
  {
    id: 'martabak-manis',
    name: 'Martabak Manis Cokelat Keju',
    slug: 'martabak-manis',
    description: 'Kue terang bulan bersarang tebal dan empuk berserat sarang lebah, dioles mentega wisman wangi, bertabur keju cheddar parut melimpah, cokelat meses, dan susu kental manis.',
    category: 'Dessert',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    cookingTime: 30,
    prepTime: 40,
    difficulty: 'Sedang',
    servings: 6,
    estimatedCalories: 480,
    isPopular: false,
    tags: ['Manis', 'Tradisional', 'Kue', 'Keju', 'Cokelat'],
    ingredients: [
      { name: 'Tepung terigu protein sedang', quantity: 250, unit: 'gram' },
      { name: 'Gula pasir', quantity: 40, unit: 'gram' },
      { name: 'Air bersih atau susu cair', quantity: 300, unit: 'ml' },
      { name: 'Telur ayam', quantity: 1, unit: 'butir' },
      { name: 'Baking powder & baking soda', quantity: 0.5, unit: 'sdt' },
      { name: 'Mentega tawar / wisman untuk olesan', quantity: 40, unit: 'gram' },
      { name: 'Keju cheddar parut & meses cokelat', quantity: 100, unit: 'gram' },
      { name: 'Susu kental manis', quantity: 4, unit: 'sdm' }
    ],
    instructions: [
      { step: 1, instruction: 'Campur tepung, gula, air, dan telur. Kocok dengan keplokan whisk selama 10 menit agar gluten terbentuk dan udara masuk.', durationMinutes: 12 },
      { step: 2, instruction: 'Diamkan adonan selama 30 menit. Tepat sebelum dimasak, tambahkan larutan baking soda dan baking powder.', durationMinutes: 30 },
      { step: 3, instruction: 'Panaskan loyang martabak atau wajan tebal dengan api kecil-sedang. Tuang adonan dan buat pinggiran renyah di tepinya.', durationMinutes: 5 },
      { step: 4, instruction: 'Saat gelembung sarang bermunculan di seluruh permukaan, taburi gula pasir lalu tutup loyang hingga bagian atas matang kering.', durationMinutes: 8 },
      { step: 5, instruction: 'Angkat, olesi mentega melimpah, beri taburan keju, meses, dan susu kental manis. Lipat dua dan potong-potong hangat.', durationMinutes: 4 }
    ],
    cookingTips: [
      'Loyang harus benar-benar panas merata sebelum adonan dituangkan agar pori-pori sarang lebah mengembang sempurna.'
    ],
    ingredientAlternatives: [
      'Topping dapat disesuaikan dengan selai matcha, nutella, atau potongan kacang mete panggang.'
    ]
  },

  // 24. Salad Buah Segar Saus Yogurt Madu
  {
    id: 'salad-buah',
    name: 'Salad Buah Segar Saus Yogurt',
    slug: 'salad-buah',
    description: 'Kombinasi aneka potongan buah segar tropis manis yang renyah berair, diselimuti saus yogurt madu creamy rendah lemak dan taburan parutan keju lembut.',
    category: 'Makanan Sehat',
    cuisine: 'International',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    cookingTime: 10,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 3,
    estimatedCalories: 180,
    isPopular: false,
    tags: ['Sehat', 'Buah', 'Cepat', 'Rendah Kalori'],
    ingredients: [
      { name: 'Apel fuji (potong dadu)', quantity: 1, unit: 'buah' },
      { name: 'Melon manis (potong dadu)', quantity: 150, unit: 'gram' },
      { name: 'Semangka merah (potong dadu)', quantity: 150, unit: 'gram' },
      { name: 'Anggur merah (belah dua)', quantity: 80, unit: 'gram' },
      { name: 'Greek yogurt plain / rasa vanila', quantity: 150, unit: 'gram' },
      { name: 'Madu murni', quantity: 2, unit: 'sdm' },
      { name: 'Perasan air lemon', quantity: 1, unit: 'sdt' },
      { name: 'Keju cheddar parut tipis', quantity: 30, unit: 'gram' }
    ],
    instructions: [
      { step: 1, instruction: 'Cuci bersih dan potong dadu seluruh buah segar dengan ukuran gigitan seragam.', durationMinutes: 8 },
      { step: 2, instruction: 'Campur Greek yogurt, madu, dan perasan air lemon dalam mangkuk hingga menjadi dressing lembut manis asam menyegarkan.', durationMinutes: 3 },
      { step: 3, instruction: 'Masukkan buah-buahan dingin ke dalam mangkuk saji besar.', durationMinutes: 2 },
      { step: 4, instruction: 'Tuangkan saus yogurt di atas buah, aduk perlahan atau biarkan bertingkat cantik.', durationMinutes: 2 },
      { step: 5, instruction: 'Taburi parutan keju cheddar lembut dan hiasi dengan daun mint segar di atasnya.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Rendam potongan apel sejenak dalam air bergaram tipis agar tidak berubah warna kecokelatan (oksidasi).'
    ],
    ingredientAlternatives: [
      'Gunakan buah naga, kiwi, atau mangga arumanis sesuai musim untuk warna kontras yang semakin menggugah selera.'
    ]
  },

  // 25. Es Kopi Susu Gula Aren (Minuman Bonus Popular)
  {
    id: 'es-kopi-susu',
    name: 'Es Kopi Susu Gula Aren',
    slug: 'es-kopi-susu',
    description: 'Paduan espresso pekat berkarakter kuat dengan susu segar creamy dan sirup gula aren murni yang manis legit aromatik pandan.',
    category: 'Minuman',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80',
    cookingTime: 10,
    prepTime: 5,
    difficulty: 'Mudah',
    servings: 1,
    estimatedCalories: 190,
    isPopular: true,
    tags: ['Minuman', 'Kopi', 'Manis', 'Cepat', 'Populer'],
    ingredients: [
      { name: 'Espresso atau seduhan kopi pekat', quantity: 60, unit: 'ml' },
      { name: 'Susu segar cair (full cream)', quantity: 120, unit: 'ml' },
      { name: 'Sirup gula aren cair alami', quantity: 25, unit: 'ml' },
      { name: 'Es batu kristal', quantity: 1, unit: 'gelas' }
    ],
    instructions: [
      { step: 1, instruction: 'Tuangkan sirup gula aren ke dasar gelas saji.', durationMinutes: 1 },
      { step: 2, instruction: 'Isi gelas dengan es batu kristal hingga hampir penuh.', durationMinutes: 1 },
      { step: 3, instruction: 'Tuangkan susu segar cair perlahan di atas es.', durationMinutes: 1 },
      { step: 4, instruction: 'Kucurkan espresso panas pekat di bagian paling atas untuk menghasilkan gradasi tiga lapisan warna yang estetik.', durationMinutes: 2 },
      { step: 5, instruction: 'Aduk rata sebelum diminum untuk menikmati kelembutan rasa kopi berpadu aren.', durationMinutes: 1 }
    ],
    cookingTips: [
      'Masak gula aren bersama selembar daun pandan untuk sentuhan wangi klasik yang khas kafe kekinian.'
    ],
    ingredientAlternatives: [
      'Susu sapi bisa diganti dengan oat milk untuk rasa nutty yang sedang tren.'
    ]
  },

  // 26. Udang Saus Padang (Seafood)
  {
    id: 'udang-saus-padang',
    name: 'Udang Bakar Saus Padang',
    slug: 'udang-saus-padang',
    description: 'Udang windu segar yang dimasak dalam kuah kental saus Padang berkarakter pedas manis gurih dengan kocokan telur dan harum daun jeruk.',
    category: 'Seafood',
    cuisine: 'Indonesian',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=900&q=80',
    cookingTime: 20,
    prepTime: 15,
    difficulty: 'Mudah',
    servings: 3,
    estimatedCalories: 340,
    isPopular: false,
    tags: ['Seafood', 'Udang', 'Pedas', 'Cepat'],
    ingredients: [
      { name: 'Udang windu segar (bersihkan sungut)', quantity: 400, unit: 'gram' },
      { name: 'Bawang bombay (iris kasar)', quantity: 0.5, unit: 'buah' },
      { name: 'Bawang putih & merah cincang', quantity: 4, unit: 'siung' },
      { name: 'Saus tiram', quantity: 2, unit: 'sdm' },
      { name: 'Saus sambal pedas', quantity: 3, unit: 'sdm' },
      { name: 'Saus tomat', quantity: 2, unit: 'sdm' },
      { name: 'Telur ayam (kocok lepas untuk mengentalkan kuah)', quantity: 1, unit: 'butir' },
      { name: 'Daun bawang (iris serong)', quantity: 1, unit: 'batang' }
    ],
    instructions: [
      { step: 1, instruction: 'Tumis bawang bombay, bawang putih, dan bawang merah hingga harum matang layu.', durationMinutes: 4 },
      { step: 2, instruction: 'Masukkan udang segar, masak cepat sampai berubah warna menjadi jingga kemerahan.', durationMinutes: 3 },
      { step: 3, instruction: 'Tambahkan saus tiram, saus sambal, saus tomat, garam, dan 100 ml air. Aduk hingga mendidih.', durationMinutes: 4 },
      { step: 4, instruction: 'Kecilkan api, tuangkan kocokan telur sambil diaduk memutar cepat membentuk serabut kuah kental lembut.', durationMinutes: 3 },
      { step: 5, instruction: 'Beri taburan daun bawang, angkat dan sajikan selagi kuah mengepul hangat.', durationMinutes: 2 }
    ],
    cookingTips: [
      'Jangan memasak udang terlalu lama (cukup 3-4 menit) agar dagingnya tetap kenyal manis dan tidak keras liat.'
    ],
    ingredientAlternatives: [
      'Saus padang ini juga sangat lezat dipadukan dengan cumi segar atau kepiting.'
    ]
  }
];
