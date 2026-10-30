import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import { 
  X, Clock, Flame, Users, Heart, Share2, Check, 
  Sparkles, ChefHat, AlertCircle, ArrowRight 
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  allRecipes: Recipe[];
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
  allRecipes
}) => {
  if (!recipe) return null;

  // Serving size state
  const baseServings = recipe.servings || 2;
  const [currentServings, setCurrentServings] = useState<number>(baseServings);

  // Prepared ingredients state (checkboxes)
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  // Completed steps state
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Share feedback toast state
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset state on recipe change
  useEffect(() => {
    setCurrentServings(recipe.servings || 2);
    setCheckedIngredients({});
    setCompletedSteps({});
  }, [recipe]);

  // Adjust serving multiplier
  const multiplier = currentServings / baseServings;

  const toggleIngredient = (name: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const toggleStep = (stepNum: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      }
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Find related recipes (same category or cuisine, excluding this one)
  const relatedRecipes = allRecipes
    .filter(r => r.id !== recipe.id && (r.category === recipe.category || r.cuisine === recipe.cuisine))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#EAE8E0] my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Modal Top Bar with Close Button */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md text-[#282B25] hover:text-[#526B50] flex items-center justify-center transition-all"
            title="Bagikan Resep"
            aria-label="Bagikan resep"
          >
            {copiedLink ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
          </button>

          {/* Favorite Button */}
          <button
            onClick={(e) => onToggleFavorite(e, recipe.id)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md text-[#282B25] hover:text-[#D98B55] flex items-center justify-center transition-all"
            title="Favorit"
            aria-label="Simpan ke favorit"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#D98B55] text-[#D98B55]' : ''}`} />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share notification toast */}
        {copiedLink && (
          <div className="absolute top-16 right-4 z-20 bg-[#282B25] text-white text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-[#D98B55]" />
            <span>Tautan resep berhasil disalin ke clipboard!</span>
          </div>
        )}

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* 1. Large Hero Food Photograph */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#F1F0E9]">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 rounded-full bg-[#526B50] text-xs font-semibold uppercase tracking-wider inline-block mb-2 shadow">
                {recipe.category} • {recipe.cuisine === 'Indonesian' ? 'Khas Indonesia' : 'Internasional'}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold drop-shadow-md">
                {recipe.name}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Description & Overview Badges */}
            <div>
              <p className="text-[#77796F] text-sm sm:text-base leading-relaxed">
                {recipe.description}
              </p>

              {/* 4 Metadata Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6">
                <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EAE8E0] text-center">
                  <div className="text-[#809276] flex items-center justify-center gap-1 text-xs mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Waktu Memasak</span>
                  </div>
                  <div className="font-serif text-lg font-bold text-[#282B25]">
                    {recipe.cookingTime} Menit
                  </div>
                </div>

                <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EAE8E0] text-center">
                  <div className="text-[#809276] flex items-center justify-center gap-1 text-xs mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Persiapan</span>
                  </div>
                  <div className="font-serif text-lg font-bold text-[#282B25]">
                    {recipe.prepTime} Menit
                  </div>
                </div>

                <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EAE8E0] text-center">
                  <div className="text-[#809276] flex items-center justify-center gap-1 text-xs mb-1">
                    <ChefHat className="w-4 h-4" />
                    <span>Tingkat</span>
                  </div>
                  <div className="font-serif text-lg font-bold text-[#282B25]">
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EAE8E0] text-center">
                  <div className="text-[#809276] flex items-center justify-center gap-1 text-xs mb-1">
                    <Flame className="w-4 h-4" />
                    <span>Kalori / Porsi</span>
                  </div>
                  <div className="font-serif text-lg font-bold text-[#282B25]">
                    ~{recipe.estimatedCalories} kkal
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients Section with Serving Calculator */}
            <div className="pt-4 border-t border-[#EAE8E0]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#282B25]">
                    Daftar Bahan Makanan
                  </h2>
                  <p className="text-xs text-[#77796F] mt-1">
                    Centang bahan yang sudah kamu siapkan di meja dapur.
                  </p>
                </div>

                {/* Serving Adjuster */}
                <div className="flex items-center gap-3 bg-[#FAF9F6] px-4 py-2 rounded-2xl border border-[#EAE8E0]">
                  <Users className="w-4 h-4 text-[#526B50]" />
                  <span className="text-xs font-semibold text-[#282B25]">Porsi:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentServings(Math.max(1, currentServings - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-[#EAE8E0] text-sm font-bold flex items-center justify-center hover:bg-[#F1F0E9]"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-[#282B25] min-w-[20px] text-center">
                      {currentServings}
                    </span>
                    <button
                      onClick={() => setCurrentServings(currentServings + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#EAE8E0] text-sm font-bold flex items-center justify-center hover:bg-[#F1F0E9]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const calculatedQty = Math.round(ing.quantity * multiplier * 10) / 10;
                  const isChecked = !!checkedIngredients[ing.name];

                  return (
                    <label
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#F1F0E9]/60 border-[#526B50]/30 text-[#77796F]'
                          : 'bg-white border-[#EAE8E0] hover:border-[#809276] text-[#282B25]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleIngredient(ing.name)}
                          className="w-4 h-4 text-[#526B50] rounded border-gray-300 focus:ring-[#526B50]"
                        />
                        <span className={`text-xs sm:text-sm font-medium truncate ${isChecked ? 'line-through text-[#77796F]' : ''}`}>
                          {ing.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#526B50] shrink-0 ml-2">
                        {calculatedQty} {ing.unit}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Cooking Instructions */}
            <div className="pt-4 border-t border-[#EAE8E0]">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#282B25]">
                  Langkah Memasak
                </h2>
                <p className="text-xs text-[#77796F] mt-1">
                  Ikuti langkah terstruktur di bawah ini secara bertahap.
                </p>
              </div>

              <div className="space-y-4">
                {recipe.instructions.map((step) => {
                  const isDone = !!completedSteps[step.step];

                  return (
                    <div
                      key={step.step}
                      onClick={() => toggleStep(step.step)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                        isDone
                          ? 'bg-[#F1F0E9]/70 border-[#526B50]/40'
                          : 'bg-white border-[#EAE8E0] hover:border-[#809276]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isDone
                              ? 'bg-[#526B50] text-white'
                              : 'bg-[#FAF9F6] border border-[#EAE8E0] text-[#282B25]'
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4" /> : step.step}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs text-[#77796F] mb-1">
                            <span className="font-semibold text-[#282B25]">
                              Langkah {step.step}
                            </span>
                            {step.durationMinutes && (
                              <span className="flex items-center gap-1 text-[11px] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#EAE8E0]">
                                <Clock className="w-3 h-3 text-[#809276]" />
                                ~{step.durationMinutes} menit
                              </span>
                            )}
                          </div>

                          <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'text-[#77796F] line-through' : 'text-[#282B25]'}`}>
                            {step.instruction}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Chef Tips & Alternatives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EAE8E0]">
              
              {/* Cooking Tips */}
              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#EAE8E0]">
                <div className="flex items-center gap-2 text-[#526B50] font-bold text-sm mb-3">
                  <Sparkles className="w-4 h-4 text-[#D98B55]" />
                  <span>Tips Rahasia Chef</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#77796F]">
                  {recipe.cookingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#526B50] font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredient Alternatives */}
              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#EAE8E0]">
                <div className="flex items-center gap-2 text-[#526B50] font-bold text-sm mb-3">
                  <ChefHat className="w-4 h-4 text-[#D98B55]" />
                  <span>Alternatif Pengganti Bahan</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#77796F]">
                  {recipe.ingredientAlternatives?.map((alt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D98B55] font-bold">•</span>
                      <span>{alt}</span>
                    </li>
                  )) || (
                    <li className="text-xs text-[#77796F]">Gunakan bahan alternatif segar yang memiliki profil rasa serupa.</li>
                  )}
                </ul>
              </div>

            </div>

            {/* Nutrition Disclaimer */}
            <div className="flex items-start gap-2 p-3.5 rounded-xl bg-[#F1F0E9]/50 border border-[#EAE8E0] text-[11px] text-[#77796F]">
              <AlertCircle className="w-4 h-4 text-[#809276] shrink-0 mt-0.5" />
              <span>
                Nilai kalori (~{recipe.estimatedCalories} kkal per porsi) merupakan estimasi kalkulasi kuliner dan dapat bervariasi tergantung merek bahan serta minyak yang digunakan.
              </span>
            </div>

            {/* Related Recipes */}
            {relatedRecipes.length > 0 && (
              <div className="pt-4 border-t border-[#EAE8E0]">
                <h3 className="font-serif text-xl font-bold text-[#282B25] mb-4">
                  Resep Terkait yang Mungkin Kamu Suka
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedRecipes.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRecipe(rel)}
                      className="group p-3 rounded-2xl border border-[#EAE8E0] bg-[#FAF9F6] hover:bg-white hover:border-[#526B50] hover:shadow-card text-left transition-all flex flex-col justify-between"
                    >
                      <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-3">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#809276]">
                          {rel.category}
                        </div>
                        <h4 className="font-serif text-sm font-bold text-[#282B25] group-hover:text-[#526B50] line-clamp-1 mt-0.5">
                          {rel.name}
                        </h4>
                        <div className="text-xs text-[#77796F] mt-1 flex items-center justify-between">
                          <span>{rel.cookingTime} Menit</span>
                          <span className="text-[#526B50] font-semibold flex items-center gap-0.5">
                            Buka <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-5 bg-[#FAF9F6] border-t border-[#EAE8E0] flex items-center justify-between">
          <div className="text-xs text-[#77796F]">
            Resep oleh tim kuliner <strong>Recipedia</strong>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#526B50] hover:bg-[#435842] text-white text-xs font-semibold shadow transition-colors"
          >
            Selesai Membaca
          </button>
        </div>

      </div>
    </div>
  );
};
