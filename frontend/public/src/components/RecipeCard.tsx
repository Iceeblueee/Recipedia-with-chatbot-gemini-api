import React, { useState } from 'react';
import { Recipe } from '../types/recipe';
import { Clock, BarChart2, Heart } from 'lucide-react';

const FALLBACK_FOOD_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
}) => {
  const [imgSrc, setImgSrc] = useState(recipe.image);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah':
        return 'bg-[#526B50]/10 text-[#526B50]';
      case 'Sedang':
        return 'bg-[#D98B55]/10 text-[#D98B55]';
      case 'Sulit':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={() => onSelectRecipe(recipe)}
      className="group bg-white rounded-2xl border border-[#EAE8E0] overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      {/* Recipe Image Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F1F0E9]">
        <img
          src={imgSrc}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_FOOD_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#526B50] shadow-sm">
            {recipe.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(e, recipe.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#282B25] hover:text-[#D98B55] hover:scale-110 transition-all shadow-sm focus:outline-none"
          title={isFavorite ? "Hapus dari Favorit" : "Simpan ke Favorit"}
          aria-label="Toggle Favorite"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#D98B55] text-[#D98B55]' : 'text-[#282B25]'
            }`}
          />
        </button>

        {/* Cooking Duration Overlay */}
        <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs font-medium drop-shadow-sm">
          <Clock className="w-3.5 h-3.5" />
          <span>{recipe.cookingTime} Menit</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata Bar */}
          <div className="flex items-center justify-between text-xs text-[#77796F] mb-2">
            <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${getDifficultyBadge(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3 h-3 text-[#809276]" />
              {recipe.estimatedCalories} kkal
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#282B25] group-hover:text-[#526B50] transition-colors line-clamp-1">
            {recipe.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#77796F] mt-1.5 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-4 border-t border-[#EAE8E0]/70 flex items-center justify-between text-xs">
          <span className="text-[#77796F]">
            {recipe.ingredients.length} Bahan
          </span>
          <span className="font-semibold text-[#526B50] group-hover:text-[#435842] flex items-center gap-1">
            Lihat Resep &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
