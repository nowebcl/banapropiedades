import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#050912] text-slate-400 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="BANÁ PROPIEDADES"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  BANÁ <span className="font-sans text-xs font-light text-cyan-300 tracking-widest uppercase">Propiedades</span>
                </span>
                <span className="font-mono text-[9px] text-slate-500 tracking-widest">
                  CHILE // BROKERAGE & ASSETS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Corredora boutique de alta gama especializada en la comercialización, tasación y gestión de activos residenciales y comerciales en la Región Metropolitana y la Costa de la Quinta Región.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-mono text-slate-300">Oficinas activas en Santiago & Viña del Mar</span>
            </div>
          </div>

          {/* Col 2: Santiago HQ */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
              // SANTIAGO ORIENTE HQ
            </h4>
            <div className="text-xs space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Av. El Golf 40, Piso 14, Las Condes, Región Metropolitana</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+56 9 8452 9100</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>santiago@banapropiedades.cl</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quinta Región HQ */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
              // QUINTA REGIÓN COSTA
            </h4>
            <div className="text-xs space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Av. Libertad 1405, Viña del Mar • Zapallar</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+56 9 9123 4872</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>costa@banapropiedades.cl</span>
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
              // PRIVÉ NEWSLETTER
            </h4>
            <p className="text-xs text-slate-400">
              Recibe oportunidades off-market e informes trimestrales de plusvalía antes de su publicación general.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                  aria-label="Suscribirse"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> ¡Suscrito al informe exclusivo!
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} BANÁ PROPIEDADES SpA. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Términos Legales</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacidad de Datos</a>
            <a href="#" className="hover:text-slate-300 transition-colors">ACOP Afiliados</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
