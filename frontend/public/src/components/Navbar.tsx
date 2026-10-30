import React, { useState, useEffect } from 'react';
import { ChefHat, Search, Heart, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAIChef: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAIChef,
  onOpenFavorites,
  favoritesCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-b border-[#EAE8E0] py-3.5'
          : 'bg-[#FAF9F6] border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#526B50] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#282B25] block leading-none">
                Recipedia
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#77796F] font-medium block mt-0.5">
                Ciptakan Rasa
              </span>
            </div>
          </button>

          {/* Center: Desktop Navigation Links with Smooth Scroll */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('beranda')}
              className={`text-sm font-medium transition-colors relative py-1 ${
                activeSection === 'beranda'
                  ? 'text-[#526B50] font-semibold'
                  : 'text-[#282B25] hover:text-[#526B50]'
              }`}
            >
              Beranda
              {activeSection === 'beranda' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#526B50] rounded-full animate-fadeIn" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('jelajahi')}
              className={`text-sm font-medium transition-colors relative py-1 ${
                activeSection === 'jelajahi'
                  ? 'text-[#526B50] font-semibold'
                  : 'text-[#282B25] hover:text-[#526B50]'
              }`}
            >
              Jelajahi Resep
              {activeSection === 'jelajahi' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#526B50] rounded-full animate-fadeIn" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('kategori')}
              className={`text-sm font-medium transition-colors relative py-1 ${
                activeSection === 'kategori'
                  ? 'text-[#526B50] font-semibold'
                  : 'text-[#282B25] hover:text-[#526B50]'
              }`}
            >
              Kategori
              {activeSection === 'kategori' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#526B50] rounded-full animate-fadeIn" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('tentang-kami')}
              className={`text-sm font-medium transition-colors relative py-1 ${
                activeSection === 'tentang-kami'
                  ? 'text-[#526B50] font-semibold'
                  : 'text-[#282B25] hover:text-[#526B50]'
              }`}
            >
              Tentang Kami
              {activeSection === 'tentang-kami' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#526B50] rounded-full animate-fadeIn" />
              )}
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger (Smooth scrolls directly to Jelajahi Resep search bar) */}
            <button
              onClick={() => handleNavClick('jelajahi')}
              title="Cari resep"
              className="p-2 rounded-full text-[#282B25] hover:bg-[#F1F0E9] transition-colors"
              aria-label="Cari Resep"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorite Trigger */}
            <button
              onClick={onOpenFavorites}
              title="Resep Favorit"
              className="p-2 rounded-full text-[#282B25] hover:bg-[#F1F0E9] transition-colors relative"
              aria-label="Resep Favorit"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#D98B55] text-[#D98B55]' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D98B55] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* AI Chef Button */}
            <button
              onClick={onOpenAIChef}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#526B50] text-white text-sm font-medium hover:bg-[#435842] shadow-sm transition-all hover:shadow"
            >
              <Sparkles className="w-4 h-4 text-[#D98B55]" />
              <span>AI Chef</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#282B25] hover:bg-[#F1F0E9]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-[#EAE8E0] mt-3 space-y-2 animate-fadeIn">
            <button
              onClick={() => handleNavClick('beranda')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                activeSection === 'beranda' ? 'bg-[#526B50]/10 text-[#526B50] font-semibold' : 'text-[#282B25] hover:bg-[#F1F0E9]'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('jelajahi')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                activeSection === 'jelajahi' ? 'bg-[#526B50]/10 text-[#526B50] font-semibold' : 'text-[#282B25] hover:bg-[#F1F0E9]'
              }`}
            >
              Jelajahi Resep
            </button>
            <button
              onClick={() => handleNavClick('kategori')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                activeSection === 'kategori' ? 'bg-[#526B50]/10 text-[#526B50] font-semibold' : 'text-[#282B25] hover:bg-[#F1F0E9]'
              }`}
            >
              Kategori
            </button>
            <button
              onClick={() => handleNavClick('tentang-kami')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                activeSection === 'tentang-kami' ? 'bg-[#526B50]/10 text-[#526B50] font-semibold' : 'text-[#282B25] hover:bg-[#F1F0E9]'
              }`}
            >
              Tentang Kami
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIChef();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#526B50] text-white font-medium shadow"
              >
                <Sparkles className="w-4 h-4 text-[#D98B55]" />
                <span>Buka AI Chef</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
