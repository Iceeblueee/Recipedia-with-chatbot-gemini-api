import React, { useState, useEffect } from 'react';
import { Recipe, Category } from './types/recipe';
import { RECIPES_DATA } from './data/recipes';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExplorationView } from './components/ExplorationView';
import { CategorySection } from './components/CategorySection';
import { PopularRecipesSection } from './components/PopularRecipesSection';
import { AIChefPromotion } from './components/AIChefPromotion';
import { QuickRecipesSection } from './components/QuickRecipesSection';
import { WhyRecipedia } from './components/WhyRecipedia';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { AIChefChatbot } from './components/AIChefChatbot';
import { AIChefFloatingButton } from './components/AIChefFloatingButton';
import { FavoritesModal } from './components/FavoritesModal';

export const App: React.FC = () => {
  // Navigation & Active Section State
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [explorationCategory, setExplorationCategory] = useState<Category | 'Semua Resep'>('Semua Resep');
  const [explorationSearch, setExplorationSearch] = useState<string>('');

  // Modals & Panels State
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAIChefOpen, setIsAIChefOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recipedia_favorites');
      return saved ? JSON.parse(saved) : ['nasi-goreng-spesial', 'pancake-strawberry'];
    } catch {
      return ['nasi-goreng-spesial', 'pancake-strawberry'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('recipedia_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Smooth Scroll Helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // ScrollSpy to update active navbar state on user scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      // Sequence corresponds strictly to vertical layout order:
      // 1. beranda -> 2. jelajahi -> 3. kategori -> 4. resep-populer -> 5. ai-chef -> 6. resep-praktis -> 7. tentang-kami
      const sections = [
        { id: 'beranda', nav: 'beranda' },
        { id: 'jelajahi', nav: 'jelajahi' },
        { id: 'kategori', nav: 'kategori' },
        { id: 'resep-populer', nav: 'kategori' },
        { id: 'ai-chef', nav: 'kategori' },
        { id: 'resep-praktis', nav: 'kategori' },
        { id: 'tentang-kami', nav: 'tentang-kami' }
      ];

      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].nav);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Toggle Favorite
  const handleToggleFavorite = (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId) 
        : [...prev, recipeId]
    );
  };

  const handleRemoveFavorite = (recipeId: string) => {
    setFavorites(prev => prev.filter(id => id !== recipeId));
  };

  // Category selection handler with smooth scroll to Exploration section
  const handleSelectCategory = (category: Category) => {
    setExplorationCategory(category);
    setExplorationSearch('');
    scrollToSection('jelajahi');
  };

  // Search handler from Hero with smooth scroll to Exploration section
  const handleHeroSearch = (query: string) => {
    setExplorationSearch(query);
    setExplorationCategory('Semua Resep');
    scrollToSection('jelajahi');
  };

  // Favorite recipes data objects
  const favoriteRecipesList = RECIPES_DATA.filter(r => favorites.includes(r.id));

  // Popular recipes list (8 recipes as required in Section 4C)
  const popularRecipesList = [
    RECIPES_DATA.find(r => r.id === 'nasi-goreng-spesial')!,
    RECIPES_DATA.find(r => r.id === 'chicken-teriyaki')!,
    RECIPES_DATA.find(r => r.id === 'soto-ayam')!,
    RECIPES_DATA.find(r => r.id === 'pancake-strawberry')!,
    RECIPES_DATA.find(r => r.id === 'mie-goreng-jawa')!,
    RECIPES_DATA.find(r => r.id === 'chicken-katsu')!,
    RECIPES_DATA.find(r => r.id === 'rendang-daging')!,
    RECIPES_DATA.find(r => r.id === 'es-kopi-susu')!,
  ].filter(Boolean);

  // Suggested recipes for AI promotion section (3 cards)
  const aiPromoRecipes = [
    RECIPES_DATA.find(r => r.id === 'nasi-goreng-spesial')!,
    RECIPES_DATA.find(r => r.id === 'chicken-garlic-rice')!,
    RECIPES_DATA.find(r => r.id === 'chicken-teriyaki')!,
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#282B25]">
      
      {/* Sticky Navigation Bar with Smooth Scroll Actions */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAIChef={() => setIsAIChefOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main Single-Page Unified Editorial Layout Strictly Matching Navbar Order */}
      <main className="flex-1">
        
        {/* 1. Beranda (Hero Section) */}
        <HeroSection
          onSearch={handleHeroSearch}
          onExplore={() => scrollToSection('jelajahi')}
        />

        {/* 2. Jelajahi Resep (Recipe Discovery / Exploration Catalog - immediately after Beranda) */}
        <ExplorationView
          recipes={RECIPES_DATA}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
          initialCategory={explorationCategory}
          initialSearch={explorationSearch}
        />

        {/* 3. Kategori (Recipe Categories Section - directly below Jelajahi Resep) */}
        <CategorySection
          onSelectCategory={handleSelectCategory}
        />

        {/* 4. Resep Populer */}
        <PopularRecipesSection
          recipes={popularRecipesList}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
          onViewAll={() => scrollToSection('jelajahi')}
        />

        {/* 5. AI Cooking Assistant Promotion */}
        <AIChefPromotion
          onOpenAIChef={() => setIsAIChefOpen(true)}
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
          suggestedRecipes={aiPromoRecipes}
        />

        {/* 6. Quick & Easy Recipes (< 30 Mins) */}
        <QuickRecipesSection
          recipes={RECIPES_DATA}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
        />

        {/* 7. Tentang Kami (Why Recipedia) */}
        <WhyRecipedia />

        {/* 8. Newsletter Subscription */}
        <NewsletterSection />

      </main>

      {/* Section H: Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectCategory={handleSelectCategory}
      />

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
        allRecipes={RECIPES_DATA}
      />

      {/* Favorites Drawer / Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteRecipes={favoriteRecipesList}
        onRemoveFavorite={handleRemoveFavorite}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
      />

      {/* AI Cooking Assistant Chatbot Floating Window */}
      <AIChefChatbot
        isOpen={isAIChefOpen}
        onClose={() => setIsAIChefOpen(false)}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
      />

      {/* Bottom Right Floating Trigger Button */}
      <AIChefFloatingButton
        isOpen={isAIChefOpen}
        onClick={() => setIsAIChefOpen(true)}
      />

    </div>
  );
};

export default App;
