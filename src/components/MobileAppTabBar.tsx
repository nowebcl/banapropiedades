import React, { useState, useEffect } from 'react';
import { Home, Building2, Sparkles, Image as ImageIcon, MessageCircle } from 'lucide-react';

interface MobileAppTabBarProps {
  currentView?: 'home' | 'remodeling';
  onNavigate?: (view: 'home' | 'remodeling') => void;
}

export const MobileAppTabBar: React.FC<MobileAppTabBarProps> = ({ currentView = 'home', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'properties' | 'remodeling' | 'gallery'>('home');

  useEffect(() => {
    if (currentView === 'remodeling') {
      setActiveTab('remodeling');
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const galleryEl = document.getElementById('gallery');
      const propertiesEl = document.getElementById('propiedades');

      if (galleryEl && scrollPos >= galleryEl.offsetTop) {
        setActiveTab('gallery');
      } else if (propertiesEl && scrollPos >= propertiesEl.offsetTop) {
        setActiveTab('properties');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleTabClick = (tab: 'home' | 'properties' | 'remodeling' | 'gallery', hash?: string) => {
    setActiveTab(tab);
    if (tab === 'remodeling') {
      if (onNavigate) onNavigate('remodeling');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onNavigate) onNavigate('home');
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070d1a]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 shadow-2xl shadow-black max-w-full">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => handleTabClick('home', '#page-top')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center ${
            currentView === 'home' && activeTab === 'home'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight font-medium">Inicio</span>
        </button>

        {/* Tab 2: Propiedades */}
        <button
          onClick={() => handleTabClick('properties', '#propiedades')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center ${
            currentView === 'home' && activeTab === 'properties'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight font-medium">Propiedades</span>
        </button>

        {/* Center Floating Action WhatsApp Button */}
        <div className="relative -top-4 px-1 shrink-0">
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

        {/* Tab 3: Remodelaciones (NEW) */}
        <button
          onClick={() => handleTabClick('remodeling')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center relative ${
            currentView === 'remodeling'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-[#dfb86c]'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 mb-1 text-[#dfb86c]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#dfb86c] animate-pulse" />
          </div>
          <span className="text-[10px] tracking-tight font-medium">Remodelar</span>
        </button>

        {/* Tab 4: Galería */}
        <button
          onClick={() => handleTabClick('gallery', '#gallery')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all text-center ${
            currentView === 'home' && activeTab === 'gallery'
              ? 'text-[#dfb86c] scale-105 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight font-medium">Galería</span>
        </button>
      </div>
    </div>
  );
};
