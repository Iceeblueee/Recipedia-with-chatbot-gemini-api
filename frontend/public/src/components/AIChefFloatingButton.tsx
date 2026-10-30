import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

interface AIChefFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AIChefFloatingButton: React.FC<AIChefFloatingButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-3 bg-[#526B50] hover:bg-[#435842] text-white px-5 py-3.5 rounded-full shadow-float border-2 border-white transition-all transform hover:scale-105 focus:outline-none"
        aria-label="Tanya AI Chef"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-white" />
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full absolute -top-1 -right-1 ring-2 ring-white animate-pulse"></span>
        </div>
        
        <div className="text-left hidden sm:block">
          <div className="text-[10px] text-white/80 font-medium uppercase tracking-wider">Asisten Memasak</div>
          <div className="text-sm font-bold flex items-center gap-1.5 leading-none">
            <span>Tanya AI Chef</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D98B55]" />
          </div>
        </div>

        {/* Floating tooltip badge */}
        <div className="absolute -top-10 right-0 bg-[#282B25] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Punya bahan apa hari ini?
        </div>
      </button>
    </div>
  );
};
