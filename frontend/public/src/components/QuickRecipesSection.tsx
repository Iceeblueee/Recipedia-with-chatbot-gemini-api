import React from 'react';
import { Recipe } from '../types/recipe';
import { Clock, Zap, Heart } from 'lucide-react';

interface QuickRecipesSectionProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const QuickRecipesSection: React.FC<QuickRecipesSectionProps> = ({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
}) => {
  // Filter recipes under 30 minutes
  const quickRecipes = recipes.filter((r) => r.cookingTime <= 30).slice(0, 4);

  return (
    <section id="resep-praktis" className="py-16 md:py-24 bg-[#FAF9F6] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#526B50]/10 text-[#526B50] text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 fill-[#526B50]" />
            <span>Hemat Waktu & Tenaga</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#282B25] font-normal">
            Masak Enak Tanpa Ribet
          </h2>
          <p className="text-[#77796F] text-base mt-2">
            Resep praktis untuk kamu yang memiliki waktu terbatas, anak kos, maupun keluarga yang ingin sajian lezat dalam sekejap.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickRecipes.map((recipe) => {
            const isFav = favorites.includes(recipe.id);
            return (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="group bg-white rounded-2xl border border-[#EAE8E0] overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1F0E9]">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  
                  {/* Quick Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#D98B55] text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-white" />
                      &lt; {recipe.cookingTime} Menit
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(e, recipe.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#282B25] hover:text-[#D98B55] transition-all shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-[#D98B55] text-[#D98B55]' : ''}`} />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-[#77796F] mb-1.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#809276]" />
                        {recipe.cookingTime} Menit
                      </span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#282B25] group-hover:text-[#526B50] transition-colors line-clamp-1">
                      {recipe.name}
                    </h3>

                    <p className="text-xs text-[#77796F] mt-1 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EAE8E0]/70 flex items-center justify-between text-xs font-semibold text-[#526B50]">
                    <span>{recipe.category}</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
