import React from 'react';
import { Recipe } from '../types/recipe';
import { X, Heart, Clock, ArrowRight, Trash2 } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteRecipes: Recipe[];
  onRemoveFavorite: (recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteRecipes,
  onRemoveFavorite,
  onSelectRecipe
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#EAE8E0] max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE8E0] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D98B55]/10 text-[#D98B55] flex items-center justify-center">
              <Heart className="w-5 h-5 fill-[#D98B55]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#282B25]">
                Resep Favorit Saya
              </h3>
              <p className="text-xs text-[#77796F]">
                {favoriteRecipes.length} resep tersimpan di perangkat Anda
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F1F0E9] hover:bg-[#EAE8E0] text-[#282B25] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {favoriteRecipes.length > 0 ? (
            favoriteRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-3.5 rounded-2xl border border-[#EAE8E0] hover:border-[#526B50] bg-white transition-all flex items-center justify-between gap-4 group"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onSelectRecipe(recipe);
                  }}
                  className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#809276]">
                      {recipe.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#282B25] group-hover:text-[#526B50] truncate">
                      {recipe.name}
                    </h4>
                    <div className="text-xs text-[#77796F] flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#809276]" />
                        {recipe.cookingTime} Menit
                      </span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectRecipe(recipe);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#526B50] hover:text-white text-[#526B50] text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <span>Buka</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(recipe.id)}
                    className="p-2 rounded-xl text-[#77796F] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Hapus dari favorit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#FAF9F6] text-[#809276] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#282B25]">
                Belum Ada Resep Favorit
              </h4>
              <p className="text-xs text-[#77796F] max-w-xs mx-auto mt-1">
                Jelajahi resep dan klik ikon hati pada resep yang ingin kamu simpan untuk dimasak nanti.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF9F6] border-t border-[#EAE8E0] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#526B50] text-white text-xs font-semibold hover:bg-[#435842] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
