import React, { useState, useMemo } from 'react';
import { Recipe, Category, Difficulty } from '../types/recipe';
import { RecipeCard } from './RecipeCard';
import { Search, SlidersHorizontal, RotateCcw, UtensilsCrossed } from 'lucide-react';

interface ExplorationViewProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  initialCategory?: Category | 'Semua Resep';
  initialSearch?: string;
}

type SortOption = 'popular' | 'fastest' | 'alphabetical';
type DurationFilter = 'all' | 'under15' | '15to30' | '30to60' | 'over60';

export const ExplorationView: React.FC<ExplorationViewProps> = ({
  recipes,
  favorites,
  onToggleFavorite,
  onSelectRecipe,
  initialCategory = 'Semua Resep',
  initialSearch = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua Resep'>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'Semua'>('Semua');
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync state if props change (e.g. from hero search or category card clicks)
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Available categories list
  const categoryFilters: (Category | 'Semua Resep')[] = [
    'Semua Resep',
    'Makanan Tradisional',
    'Makanan Utama',
    'Sarapan',
    'Dessert',
    'Camilan',
    'Minuman',
    'Makanan Sehat',
    'Seafood'
  ];

  // Filtering and sorting logic
  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // Search filter (name, description, tags, ingredient name)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = recipe.name.toLowerCase().includes(q);
          const matchDesc = recipe.description.toLowerCase().includes(q);
          const matchTag = recipe.tags.some((t) => t.toLowerCase().includes(q));
          const matchIngredient = recipe.ingredients.some((i) => i.name.toLowerCase().includes(q));
          const matchCategory = recipe.category.toLowerCase().includes(q);

          if (!matchName && !matchDesc && !matchTag && !matchIngredient && !matchCategory) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'Semua Resep') {
          if (recipe.category !== selectedCategory) {
            return false;
          }
        }

        // Difficulty filter
        if (selectedDifficulty !== 'Semua') {
          if (recipe.difficulty !== selectedDifficulty) {
            return false;
          }
        }

        // Cooking duration filter
        if (selectedDuration !== 'all') {
          if (selectedDuration === 'under15' && recipe.cookingTime >= 15) return false;
          if (selectedDuration === '15to30' && (recipe.cookingTime < 15 || recipe.cookingTime > 30)) return false;
          if (selectedDuration === '30to60' && (recipe.cookingTime <= 30 || recipe.cookingTime > 60)) return false;
          if (selectedDuration === 'over60' && recipe.cookingTime <= 60) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        }
        if (sortBy === 'fastest') {
          return a.cookingTime - b.cookingTime;
        }
        if (sortBy === 'alphabetical') {
          return a.name.localeCompare(b.name, 'id');
        }
        return 0;
      });
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty, selectedDuration, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Resep');
    setSelectedDifficulty('Semua');
    setSelectedDuration('all');
    setSortBy('popular');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'Semua Resep' || 
    selectedDifficulty !== 'Semua' || 
    selectedDuration !== 'all' || 
    sortBy !== 'popular';

  return (
    <section id="jelajahi" className="py-14 md:py-20 bg-[#FAF9F6] border-t border-[#EAE8E0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold">
            Katalog Kuliner Lengkap
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#282B25] font-normal mt-2">
            Jelajahi Berbagai Resep
          </h1>
          <p className="text-[#77796F] text-base mt-3">
            Saring berdasarkan kategori makanan, waktu memasak, tingkat kesulitan, atau cari bahan yang kamu miliki.
          </p>
        </div>

        {/* Large Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative flex items-center bg-white rounded-2xl border border-[#EAE8E0] shadow-card p-2">
            <Search className="w-5 h-5 text-[#809276] ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari resep makanan, bumbu, atau bahan (misal: ayam, kecap, santan)..."
              className="w-full px-3 py-2.5 text-sm sm:text-base bg-transparent border-none focus:outline-none placeholder-[#77796F]/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-2 text-xs text-[#77796F] hover:text-[#282B25] px-2 py-1 rounded bg-[#F1F0E9]"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none flex items-center gap-2 sm:justify-center">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#526B50] text-white shadow-sm'
                  : 'bg-white text-[#282B25] border border-[#EAE8E0] hover:bg-[#F1F0E9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sorting Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE8E0] shadow-subtle mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between lg:hidden">
              <span className="text-sm font-semibold text-[#282B25] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#526B50]" />
                Filter Tambahan
              </span>
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="text-xs text-[#526B50] font-semibold underline"
              >
                {showFiltersMobile ? 'Tutup Filter' : 'Buka Filter'}
              </button>
            </div>

            {/* Filter Dropdowns */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3.5 lg:flex lg:items-center ${showFiltersMobile ? 'block' : 'hidden lg:flex'}`}>
              
              {/* Difficulty */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-[#77796F] whitespace-nowrap">Tingkat:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'Semua')}
                  className="bg-[#FAF9F6] border border-[#EAE8E0] text-[#282B25] text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#526B50] w-full"
                >
                  <option value="Semua">Semua Tingkat</option>
                  <option value="Mudah">Mudah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Sulit">Sulit</option>
                </select>
              </div>

              {/* Cooking Duration */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-[#77796F] whitespace-nowrap">Durasi:</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value as DurationFilter)}
                  className="bg-[#FAF9F6] border border-[#EAE8E0] text-[#282B25] text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#526B50] w-full"
                >
                  <option value="all">Semua Durasi</option>
                  <option value="under15">&lt; 15 Menit</option>
                  <option value="15to30">15 – 30 Menit</option>
                  <option value="30to60">30 – 60 Menit</option>
                  <option value="over60">&gt; 60 Menit</option>
                </select>
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#D98B55] hover:bg-[#FAF9F6] rounded-xl transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#EAE8E0]">
              <label className="text-xs font-semibold text-[#77796F] whitespace-nowrap">Urutkan:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#FAF9F6] border border-[#EAE8E0] text-[#282B25] text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#526B50]"
              >
                <option value="popular">Paling Populer</option>
                <option value="fastest">Waktu Tercepat</option>
                <option value="alphabetical">Alfabetis (A - Z)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-[#77796F]">
          <div>
            Menampilkan <span className="font-bold text-[#282B25]">{filteredRecipes.length}</span> resep hidangan
          </div>
          {searchQuery && (
            <div>
              Hasil untuk kata kunci: &ldquo;<span className="font-semibold text-[#526B50]">{searchQuery}</span>&rdquo;
            </div>
          )}
        </div>

        {/* Recipe Grid or Empty State */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectRecipe={onSelectRecipe}
              />
            ))}
          </div>
        ) : (
          /* Empty state - vertically and horizontally centered */
          <div className="min-h-[360px] flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-dashed border-[#EAE8E0] text-center my-6">
            <div className="w-16 h-16 rounded-full bg-[#F1F0E9] text-[#809276] flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#282B25]">
              Resep Tidak Ditemukan
            </h3>
            <p className="text-sm text-[#77796F] max-w-sm mt-1.5 leading-relaxed">
              Tidak ada resep yang sesuai dengan kata kunci &ldquo;{searchQuery || selectedCategory}&rdquo; dan filter yang kamu pilih.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#526B50] text-white text-xs font-semibold hover:bg-[#435842] transition-colors shadow-sm"
            >
              Kembalikan Semua Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
