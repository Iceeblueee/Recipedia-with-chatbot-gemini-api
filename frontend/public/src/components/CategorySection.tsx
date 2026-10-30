import React from 'react';
import { CATEGORIES_DATA, CategoryInfo } from '../data/categories';
import { Category } from '../types/recipe';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (category: Category) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="kategori" className="py-16 md:py-24 bg-[#F1F0E9]/60 border-y border-[#EAE8E0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold">
            Inspirasi Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#282B25] font-normal mt-2">
            Jelajahi Berdasarkan Kategori
          </h2>
          <p className="text-[#77796F] text-base mt-2.5">
            Temukan hidangan favorit dari berbagai kategori makanan yang siap menggugah selera.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat: CategoryInfo) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group text-left bg-white rounded-2xl overflow-hidden border border-[#EAE8E0] shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#526B50]"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF9F6]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Arrow indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-[#282B25] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#526B50]" />
                </div>

                {/* Bottom info on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-medium text-white/80">
                    {cat.count} Resep Tersedia
                  </div>
                </div>
              </div>

              {/* Text info */}
              <div className="p-4">
                <h3 className="font-serif text-lg font-bold text-[#282B25] group-hover:text-[#526B50] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#77796F] mt-1 line-clamp-1">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
