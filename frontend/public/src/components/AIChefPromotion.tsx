import React from 'react';
import { Sparkles, Bot, ArrowRight, MessageSquare, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface AIChefPromotionProps {
  onOpenAIChef: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  suggestedRecipes: Recipe[];
}

export const AIChefPromotion: React.FC<AIChefPromotionProps> = ({
  onOpenAIChef,
  onSelectRecipe,
  suggestedRecipes
}) => {
  return (
    <section id="ai-chef" className="py-20 bg-[#F1F0E9] relative overflow-hidden border-y border-[#EAE8E0] scroll-mt-20">
      {/* Decorative ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#526B50]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D98B55]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Promotion Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#526B50]/15 text-[#526B50] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#D98B55]" />
              <span>AI POWERED COOKING ASSISTANT</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#282B25] font-normal leading-tight">
              Bingung Mau Masak Apa Hari Ini?
            </h2>

            <p className="text-base text-[#77796F] leading-relaxed">
              Ceritakan bahan makanan yang kamu miliki di dapur. Biarkan AI Chef membantu menemukan ide hidangan lezat dan panduan memasak yang sesuai dengan kebutuhanmu.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2">
              {[
                'Rekomendasi resep dari bahan sisa di kulkas',
                'Panduan takaran porsi & langkah memasak otomatis',
                'Solusi alternatif pengganti bahan masakan'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-[#282B25] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#526B50] text-white flex items-center justify-center shrink-0 text-xs">
                    ✓
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onOpenAIChef}
                className="px-8 py-4 bg-[#526B50] hover:bg-[#435842] text-white font-semibold rounded-2xl shadow-lg shadow-[#526B50]/20 flex items-center gap-3 transition-all hover:scale-[1.02] text-base"
              >
                <ChefHat className="w-5 h-5 text-[#D98B55]" />
                <span>Coba AI Chef Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Chatbot Preview */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#EAE8E0] relative">
              
              {/* Fake Chat Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE8E0] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#526B50] text-white flex items-center justify-center shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#282B25] flex items-center gap-1.5">
                      <span>AI Chef Assistant</span>
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                    </h3>
                    <p className="text-xs text-[#77796F]">Asisten Kuliner Pribadi Recipedia</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FAF9F6] text-[#526B50] border border-[#EAE8E0]">
                  Interaktif
                </span>
              </div>

              {/* Chat Messages Preview */}
              <div className="space-y-4">
                
                {/* Assistant greeting */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#526B50]/20 text-[#526B50] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-[#FAF9F6] border border-[#EAE8E0] rounded-2xl rounded-tl-sm p-4 text-sm text-[#282B25] max-w-md shadow-sm">
                    Halo! Aku AI Chef dari Recipedia. Ada bahan makanan apa yang tersedia di dapurmu hari ini?
                  </div>
                </div>

                {/* User message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-[#526B50] text-white rounded-2xl rounded-tr-sm p-4 text-sm max-w-md shadow-sm">
                    Aku punya telur, nasi, ayam, dan bawang putih.
                  </div>
                </div>

                {/* Assistant recommendation */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#526B50]/20 text-[#526B50] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-[#FAF9F6] border border-[#EAE8E0] rounded-2xl rounded-tl-sm p-4 text-sm text-[#282B25] max-w-lg shadow-sm">
                    Menarik! Dari bahan tersebut, kamu bisa membuat beberapa hidangan lezat, seperti <strong>Nasi Goreng Spesial</strong>, <strong>Butter Chicken Garlic Rice</strong>, atau <strong>Ayam Teriyaki Glaze</strong>.
                  </div>
                </div>

              </div>

              {/* Suggested Recipe Cards Preview */}
              <div className="mt-5 pt-4 border-t border-[#EAE8E0]">
                <div className="text-xs font-semibold text-[#77796F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#526B50]" />
                  <span>3 Resep Direkomendasikan AI:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {suggestedRecipes.slice(0, 3).map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => onSelectRecipe(recipe)}
                      className="group p-2.5 rounded-xl border border-[#EAE8E0] bg-[#FAF9F6] hover:bg-white hover:border-[#526B50] hover:shadow-sm text-left transition-all flex items-center gap-2.5"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-serif text-xs font-bold text-[#282B25] group-hover:text-[#526B50] truncate">
                          {recipe.name}
                        </div>
                        <div className="text-[10px] text-[#77796F] mt-0.5">
                          {recipe.cookingTime} mnt • {recipe.difficulty}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat action prompt */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#77796F]">
                <span>Tanyakan apa saja seputar masakanmu.</span>
                <button
                  onClick={onOpenAIChef}
                  className="text-[#526B50] font-bold hover:underline inline-flex items-center gap-1"
                >
                  Buka Chat Lengkap &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
