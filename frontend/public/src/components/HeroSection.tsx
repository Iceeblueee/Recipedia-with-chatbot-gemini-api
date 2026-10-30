import React from 'react';
import { ArrowRight, Clock, Star, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (searchTerm: string) => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onExplore }) => {
  return (
    <section id="beranda" className="relative overflow-hidden pt-6 pb-14 md:pt-10 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Single Action Button */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F0E9] border border-[#EAE8E0] text-[#526B50] text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#526B50] animate-pulse"></span>
              Platform Resep &amp; AI Cooking Assistant
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#282B25] font-normal leading-[1.15] tracking-tight">
              Masak Lebih Mudah, <br />
              <span className="italic font-serif text-[#526B50]">Temukan Rasa</span> Favoritmu.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#77796F] max-w-xl leading-relaxed">
              Jelajahi berbagai inspirasi resep makanan dan temukan hidangan terbaik berdasarkan bahan yang tersedia di dapurmu.
            </p>

            {/* Primary Action Button: "Temukan Resep" */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                type="button"
                onClick={onExplore}
                className="px-8 py-4 bg-[#526B50] hover:bg-[#435842] text-white font-semibold rounded-2xl shadow-lg shadow-[#526B50]/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] text-base"
              >
                <span>Temukan Resep</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#77796F]">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#526B50]/20 flex items-center justify-center text-[10px] text-[#526B50] font-bold">R</div>
                  <div className="w-6 h-6 rounded-full bg-[#D98B55]/20 flex items-center justify-center text-[10px] text-[#D98B55] font-bold">C</div>
                  <div className="w-6 h-6 rounded-full bg-[#809276]/30 flex items-center justify-center text-[10px] text-[#526B50] font-bold">P</div>
                </div>
                <span>Temukan inspirasi dari berbagai pilihan resep pilihan.</span>
              </div>
            </div>

            {/* Popular quick keywords */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-[#77796F] pt-2">
              <span className="font-medium text-[#282B25]">Populer:</span>
              {['Nasi Goreng', 'Ayam Teriyaki', 'Rendang', 'Pancake', 'Soto Lamongan'].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => onSearch(kw)}
                  className="px-2.5 py-1 rounded-full bg-[#F1F0E9] hover:bg-[#EAE8E0] text-[#282B25] transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: High-End Food Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Editorial Image Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F1F0E9]">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85"
                  alt="Healthy Grain &amp; Salmon Bowl"
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                
                {/* Top-Right Badge: Cook Time */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md border border-white/60 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#526B50]/15 text-[#526B50] flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-[#77796F] font-bold">Waktu Masak</div>
                    <div className="text-xs font-bold text-[#282B25]">&lt; 25 Menit</div>
                  </div>
                </div>

                {/* Top-Left Tag: Category */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-xl bg-[#526B50]/90 backdrop-blur-md text-white text-xs font-semibold shadow-md flex items-center gap-1.5 border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#D98B55]" />
                    <span>Inspirasi Hari Ini</span>
                  </span>
                </div>

                {/* Bottom Caption Area */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-white border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-[#D98B55] text-[#D98B55]" />
                      <span>4.9 / 5.0</span>
                      <span className="text-white/70 font-normal text-[11px]">(1.2k+ ulasan)</span>
                    </div>
                    <span className="text-[11px] bg-[#526B50]/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-white font-medium">
                      Praktis
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md text-white">
                    Healthy Grain &amp; Salmon Bowl
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-light mt-1.5 leading-relaxed">
                    Nutrisi seimbang dengan cita rasa saus wijen sangrai gurih segar.
                  </p>
                </div>
              </div>

              {/* Bottom Metadata Summary Strip */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <div className="bg-white p-3 rounded-2xl border border-[#EAE8E0] shadow-sm text-center">
                  <span className="text-[10px] uppercase font-bold text-[#77796F] block">Kalori</span>
                  <span className="font-serif text-sm font-bold text-[#282B25]">~420 kkal</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#EAE8E0] shadow-sm text-center">
                  <span className="text-[10px] uppercase font-bold text-[#77796F] block">Porsi</span>
                  <span className="font-serif text-sm font-bold text-[#282B25]">2 Orang</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#EAE8E0] shadow-sm text-center">
                  <span className="text-[10px] uppercase font-bold text-[#77796F] block">Tingkat</span>
                  <span className="font-serif text-sm font-bold text-[#526B50]">Mudah</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
