import React from 'react';
import { Recipe } from '../types/recipe';
import { RecipeCard } from './RecipeCard';
import { ArrowRight, Flame } from 'lucide-react';

interface PopularRecipesSectionProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onViewAll: () => void;
}

export const PopularRecipesSection: React.FC<PopularRecipesSectionProps> = ({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  onViewAll,
}) => {
  return (
    <section id="resep-populer" className="py-16 md:py-24 bg-[#FAF9F6] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D98B55] font-semibold mb-2">
              <Flame className="w-4 h-4 fill-[#D98B55]" />
              <span>Pilihan Favorit Komunitas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#282B25] font-normal">
              Resep Populer
            </h2>
            <p className="text-[#77796F] text-base mt-2 max-w-xl">
              Pilihan resep favorit yang paling sering dimasak dan disukai keluarga, siap kamu coba hari ini.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#526B50] text-[#526B50] hover:bg-[#526B50] hover:text-white transition-all text-sm font-semibold shrink-0"
          >
            <span>Lihat Semua Resep</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-column responsive grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
            />
          ))}
        </div>

        {/* Bottom CTA for mobile/tablet */}
        <div className="mt-12 text-center md:hidden">
          <button
            onClick={onViewAll}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#526B50] text-white text-sm font-semibold shadow hover:bg-[#435842] transition-colors"
          >
            Lihat Semua Resep ({recipes.length}+ Pilihan)
          </button>
        </div>

      </div>
    </section>
  );
};
