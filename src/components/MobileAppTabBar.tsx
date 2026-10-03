import React from 'react';
import { Home, Building2, Hammer, MessageCircle, Menu, Scale, UserCheck } from 'lucide-react';
import { AppView } from './Navbar';

interface MobileAppTabBarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const MobileAppTabBar: React.FC<MobileAppTabBarProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070d1a]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-2xl shadow-black max-w-full no-print">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center cursor-pointer ${
            currentView === 'home'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Inicio</span>
        </button>

        {/* Tab 2: Propiedades */}
        <button
          onClick={() => onNavigate('propiedades')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center cursor-pointer ${
            currentView === 'propiedades'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Propiedades</span>
        </button>

        {/* Center Floating Action WhatsApp Button */}
        <div className="relative -top-3 px-1 shrink-0">
          <a
            href="https://wa.me/56923807285?text=Hola%20BANÁ%20Propiedades,%20deseo%20hacer%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Directo"
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c5a059] via-[#dfb86c] to-[#fae6be] text-slate-950 flex items-center justify-center shadow-xl shadow-black/90 border-2 border-[#070d1a] active:scale-90 transition-transform"
          >
            <MessageCircle className="w-6 h-6 fill-slate-950 text-slate-950" />
          </a>
        </div>

        {/* Tab 3: Construcción */}
        <button
          onClick={() => onNavigate('construccion')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center cursor-pointer relative ${
            currentView === 'construccion'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-[#dfb86c]'
          }`}
        >
          <Hammer className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Construcción</span>
        </button>

        {/* Tab 4: Servicios */}
        <button
          onClick={() => onNavigate('servicios')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center cursor-pointer ${
            currentView === 'servicios'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-tight">Servicios</span>
        </button>
      </div>
    </div>
  );
};
