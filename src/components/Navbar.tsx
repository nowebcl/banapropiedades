import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin, MessageCircle, Sparkles } from 'lucide-react';

export type AppView = 'home' | 'propiedades' | 'construccion' | 'servicios' | 'publica' | 'nosotros' | 'contacto';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: AppView) => {
    setMenuOpen(false);
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Desktop core links matching the minimal hero mockup
  const desktopLinks: { id: AppView; label: string }[] = [
    { id: 'home', label: 'INICIO' },
    { id: 'propiedades', label: 'PROPIEDADES' },
    { id: 'servicios', label: 'SERVICIOS' },
    { id: 'nosotros', label: 'NOSOTROS' },
    { id: 'contacto', label: 'CONTACTO' },
  ];

  // Full links list for drawer and mobile view
  const navLinks: {
    id: AppView;
    desktopLabel: string;
    drawerLabel: string;
    num: string;
    badge?: string;
  }[] = [
    { id: 'home', desktopLabel: 'Inicio', drawerLabel: 'Inicio', num: '01' },
    { id: 'propiedades', desktopLabel: 'Propiedades', drawerLabel: 'Propiedades (Venta & Arriendo)', num: '02' },
    { id: 'construccion', desktopLabel: 'Construcción', drawerLabel: 'Remodelaciones / Construcción', num: '03', badge: 'LCE' },
    { id: 'servicios', desktopLabel: 'Servicios', drawerLabel: 'Servicios Especializados (Tasación & Legal)', num: '04' },
    { id: 'publica', desktopLabel: 'Publicar', drawerLabel: 'Publica con Nosotros (Captación)', num: '05' },
    { id: 'nosotros', desktopLabel: 'Nosotros', drawerLabel: 'Nosotros (Giovanna González)', num: '06' },
    { id: 'contacto', desktopLabel: 'Contacto', drawerLabel: 'Contacto Directo', num: '07' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
          scrolled
            ? 'bg-[#080e1b]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-xl shadow-black/60'
            : 'bg-gradient-to-b from-[#080e1b]/90 via-[#080e1b]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Refined Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group py-0.5 text-left cursor-pointer focus:outline-none"
            aria-label="Ir al inicio"
          >
            <img
              src="/logo.png"
              alt="BANÁ PROPIEDADES"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
          </button>

          {/* Center: Minimalist Desktop Navigation Links with Gold Active Underline */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {desktopLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 text-xs tracking-[0.2em] font-medium uppercase transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#dfb86c] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-5px] left-0 right-0 h-[2px] bg-[#dfb86c] rounded-full shadow-[0_0_8px_rgba(223,184,108,0.6)]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Translucent WhatsApp Pill & Round Hamburger */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Pill */}
            <a
              href="https://wa.me/56923807285?text=Hola%20BANÁ%20Propiedades,%20deseo%20hacer%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 hover:border-[#dfb86c]/60 backdrop-blur-md text-xs font-semibold text-white shadow-lg transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Circular Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 hover:border-[#dfb86c]/70 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? (
                <X className="w-4 h-4 text-[#dfb86c] transition-transform duration-300" />
              ) : (
                <div className="flex flex-col gap-1 w-4 items-center">
                  <span className="h-[1.5px] w-4 bg-white rounded-full transition-all"></span>
                  <span className="h-[1.5px] w-4 bg-white rounded-full transition-all"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Drawer Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#060c18]/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-10 pt-24 overflow-y-auto no-print ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto">
          {/* Navigation Links Column */}
          <div className="lg:col-span-8 space-y-2">
            <span className="text-[11px] font-mono text-[#dfb86c] uppercase tracking-widest block mb-4">
              // MAPA DEL SITIO • SECCIONES BANAPROPIEDADES.CL
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`group w-full flex items-center justify-between py-3 border-b transition-all text-left ${
                      isActive
                        ? 'border-[#dfb86c] bg-[#dfb86c]/15 px-3 rounded-xl'
                        : 'border-white/5 hover:border-[#dfb86c]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-base sm:text-lg font-bold uppercase tracking-tight transition-colors ${
                          isActive
                            ? 'text-[#dfb86c]'
                            : 'text-white group-hover:text-[#dfb86c]'
                        }`}
                      >
                        {link.drawerLabel}
                      </span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-[#dfb86c] text-slate-950 text-[9px] font-mono font-extrabold">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-[#dfb86c] transition-colors">
                      {link.num}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Contact & Info Column */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0b1428] border border-[#dfb86c]/20 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#dfb86c] uppercase tracking-widest block mb-2">
                ATENCIÓN INMEDIATA
              </span>
              <h3 className="text-xl font-bold text-white uppercase">
                BANÁ PROPIEDADES
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Gestión inmobiliaria de alta gama, asesoría legal de herencias y saneamiento, y construcción llave en mano junto a LCE Construcciones.
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
                <span>Hablar con un Broker por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>BANÁ PROPIEDADES © {new Date().getFullYear()}</span>
          <span className="text-[#dfb86c]">RM // QUINTA REGIÓN CHILE</span>
        </div>
      </div>
    </>
  );
};
