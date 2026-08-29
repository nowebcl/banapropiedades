import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin, MessageCircle, Sparkles, Building2, Home, ArrowRight, Layers } from 'lucide-react';

interface NavbarProps {
  currentView?: 'home' | 'remodeling';
  onNavigate?: (view: 'home' | 'remodeling') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView = 'home', onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'remodeling', hash?: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(view);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = hash;
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Inicio', view: 'home' as const, href: '#page-top', num: '01' },
    { name: 'Propiedades Exclusivas', view: 'home' as const, href: '#propiedades', num: '02' },
    { name: 'Remodelaciones (Antes y Después)', view: 'remodeling' as const, href: '#antes-y-despues', num: '03', highlight: true },
    { name: 'Sobre Baná', view: 'home' as const, href: '#about', num: '04' },
    { name: 'Etapas del Proyecto', view: 'home' as const, href: '#etapas', num: '05' },
    { name: 'Galería', view: 'home' as const, href: '#gallery', num: '06' },
    { name: 'Preguntas Frecuentes', view: 'home' as const, href: '#faq', num: '07' },
    { name: 'Contacto', view: 'home' as const, href: '#contact', num: '08' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080e1b]/95 backdrop-blur-md py-3 sm:py-4 border-b border-white/10 shadow-2xl shadow-black/60'
            : 'bg-gradient-to-b from-[#080e1b]/90 via-[#080e1b]/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Prominent Big Logo */}
          <button
            onClick={() => handleNavClick('home', '#page-top')}
            className="flex items-center group py-1 text-left cursor-pointer focus:outline-none"
          >
            <img
              src="/logo.png"
              alt="BANÁ PROPIEDADES"
              className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
          </button>

          {/* Center/Right Quick Nav Pill for Remodelaciones & Luxury Menu Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick direct switch button to Remodeling page on header */}
            <button
              onClick={() => handleNavClick(currentView === 'remodeling' ? 'home' : 'remodeling')}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                currentView === 'remodeling'
                  ? 'bg-[#dfb86c] text-slate-950 shadow-lg shadow-[#dfb86c]/25 ring-2 ring-[#fae6be]'
                  : 'bg-[#0e1930]/90 hover:bg-[#15264a] text-[#dfb86c] border border-[#dfb86c]/40 hover:border-[#dfb86c] shadow-md'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentView === 'remodeling' ? 'Ver Propiedades' : 'Remodelaciones'}</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase rounded bg-black/40 text-[#fae6be]">
                NUEVO
              </span>
            </button>

            {/* Custom staggered luxury hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex flex-col items-end justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#dfb86c]/40 hover:border-[#dfb86c] bg-[#0b1428]/90 hover:bg-[#0f1d38] p-3 transition-all duration-300 focus:outline-none shadow-xl shadow-black/60 active:scale-95"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-[#dfb86c] transition-transform duration-300 rotate-90 group-hover:rotate-180" />
              ) : (
                <div className="flex flex-col items-end gap-1.5 w-full">
                  {/* 3 unequal lines */}
                  <span className="h-[2.5px] w-7 bg-gradient-to-r from-[#fae6be] to-[#dfb86c] rounded-full transition-all duration-300 group-hover:w-7"></span>
                  <span className="h-[2.5px] w-4 bg-gradient-to-r from-[#fae6be] to-[#dfb86c] rounded-full transition-all duration-300 group-hover:w-6"></span>
                  <span className="h-[2.5px] w-6 bg-gradient-to-r from-[#fae6be] to-[#dfb86c] rounded-full transition-all duration-300 group-hover:w-5"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Desktop Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#060c18]/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-12 pt-28 overflow-y-auto ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto">
          {/* Navigation Links Column */}
          <div className="lg:col-span-8 space-y-2">
            <span className="text-[11px] font-mono text-[#dfb86c] uppercase tracking-widest block mb-4">
              // MENÚ DE NAVEGACIÓN
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.view, link.href)}
                  className={`group w-full flex items-center justify-between py-3 border-b border-white/5 hover:border-[#dfb86c]/40 transition-colors text-left ${
                    link.highlight ? 'bg-[#dfb86c]/10 px-3 rounded-xl border-[#dfb86c]/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-base sm:text-xl font-bold uppercase tracking-tight transition-colors ${
                      link.highlight ? 'text-[#fae6be]' : 'text-white group-hover:text-[#dfb86c]'
                    }`}>
                      {link.name}
                    </span>
                    {link.highlight && (
                      <span className="px-1.5 py-0.5 rounded bg-[#dfb86c] text-slate-950 text-[9px] font-mono font-extrabold">
                        NUEVO
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-[#dfb86c] transition-colors">
                    {link.num}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Contact & Info Column */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0b1428] border border-[#dfb86c]/20 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-widest block mb-2">
                ATENCIÓN PERSONALIZADA
              </span>
              <h3 className="text-xl font-bold text-white uppercase">
                BANÁ PROPIEDADES
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Asesoría inmobiliaria y proyectos de remodelación de alta gama en Santiago Oriente y la Costa de la Quinta Región.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#dfb86c]" />
                <span className="font-semibold text-white">+56 9 2380 7285</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#dfb86c]" />
                <span>contacto@banapropiedades.cl</span>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dfb86c] shrink-0 mt-0.5" />
                <span>Av. El Golf 40, Las Condes • Av. Libertad 1405, Viña del Mar</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/56923807285"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full btn-rounded btn-primary-propper justify-center text-xs py-3"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar vía WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>BANÁ PROPIEDADES © {new Date().getFullYear()}</span>
          <span className="text-[#dfb86c]">RM // QUINTA REGIÓN CHILE</span>
        </div>
      </div>
    </>
  );
};
