import React from 'react';
import { Search, Refrigerator, BookOpen, Sparkles } from 'lucide-react';

export const WhyRecipedia: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Temukan Resep dengan Mudah',
      description: 'Cari berbagai inspirasi resep melalui nama hidangan, kategori makanan, maupun bahan-bahan spesifik dalam hitungan detik.'
    },
    {
      icon: Refrigerator,
      title: 'Rekomendasi Berbasis Bahan',
      description: 'Jangan biarkan sisa makanan terbuang. Temukan ide masakan lezat berdasarkan bahan yang sudah tersedia di dapurmu.'
    },
    {
      icon: BookOpen,
      title: 'Panduan Memasak Lengkap',
      description: 'Pelajari bahan, takaran porsi terhitung otomatis, tips rahasia chef, dan langkah memasak terstruktur tahap demi tahap.'
    },
    {
      icon: Sparkles,
      title: 'Asisten Memasak AI',
      description: 'Dapatkan bantuan instan, konsultasi substitusi bahan pengganti, serta ide kreasi kuliner harian secara interaktif.'
    }
  ];

  return (
    <section id="tentang-kami" className="py-20 bg-[#F1F0E9]/70 border-t border-[#EAE8E0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold">
            Nilai Utama Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#282B25] font-normal mt-2">
            Mengapa Memilih Recipedia?
          </h2>
          <p className="text-[#77796F] text-base mt-2.5">
            Didesain khusus untuk membuat kegiatan memasak menjadi lebih sederhana, menyenangkan, dan dapat diakses oleh siapa saja.
          </p>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-[#EAE8E0] shadow-subtle hover:shadow-card transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#526B50]/10 text-[#526B50] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#282B25] mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77796F] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#EAE8E0]/60 flex items-center text-xs font-semibold text-[#526B50]">
                  <span>Fitur Unggulan 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
