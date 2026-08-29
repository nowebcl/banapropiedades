import React, { useState, useRef, useCallback } from 'react';
import { 
  ArrowLeftRight, 
  ArrowUpDown, 
  Download, 
  MessageCircle,
  Check
} from 'lucide-react';
import { RemodelingProject } from '../data/remodelingData';

interface BeforeAfterSliderProps {
  project: RemodelingProject;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ project }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mode, setMode] = useState<'vertical' | 'horizontal'>('vertical');
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    if (mode === 'horizontal') {
      const x = clientX - rect.left;
      const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(pos);
    } else {
      const y = clientY - rect.top;
      const pos = Math.max(0, Math.min(100, (y / rect.height) * 100));
      setSliderPosition(pos);
    }
  }, [mode]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* 1. Mode Switcher */}
      <div className="inline-flex p-1.5 bg-[#0b1428] rounded-full border border-white/10 shadow-xl">
        <button
          onClick={() => setMode('vertical')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
            mode === 'vertical'
              ? 'bg-[#dfb86c] text-slate-950 font-bold shadow-lg shadow-[#dfb86c]/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>Bajar Cortina (Vertical)</span>
        </button>

        <button
          onClick={() => setMode('horizontal')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
            mode === 'horizontal'
              ? 'bg-[#dfb86c] text-slate-950 font-bold shadow-lg shadow-[#dfb86c]/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>Deslizar (Horizontal)</span>
        </button>
      </div>

      {/* 2. GRAND CINEMATIC BEFORE / AFTER CANVAS */}
      <div className="w-full max-w-6xl mx-auto">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[380px] sm:min-h-[520px] lg:min-h-[640px] max-h-[820px] rounded-3xl overflow-hidden shadow-2xl shadow-black/95 border-2 border-white/15 bg-black cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'none' }}
        >
          {/* Layer 1: ANTES (Base Image) */}
          <img
            src={project.beforeImage}
            alt="Antes"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-85"
            draggable={false}
          />

          {/* Layer 2: DESPUÉS (Clipped Image) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
            style={{
              clipPath:
                mode === 'vertical'
                  ? `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`
                  : `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
          >
            <img
              src={project.afterImage}
              alt="Después"
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>

          {/* Minimalist Floating Badges */}
          <div className="absolute top-5 left-5 z-20 pointer-events-none">
            <span className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-[#dfb86c] border border-[#dfb86c]/40 uppercase shadow-lg">
              DESPUÉS // BANÁ DESIGN
            </span>
          </div>

          <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
            <span className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-xs font-mono text-slate-300 border border-white/15 uppercase shadow-lg">
              ANTES // ORIGINAL
            </span>
          </div>

          {/* Interactive Drag Handle */}
          {mode === 'vertical' ? (
            <div
              className="absolute left-0 right-0 z-30 pointer-events-none flex items-center justify-center will-change-[top]"
              style={{ top: `${sliderPosition}%` }}
            >
              <div className="absolute left-0 right-0 h-[2.5px] bg-[#dfb86c] shadow-[0_0_15px_#dfb86c]" />
              <div className="relative -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#080e1b] border-2 border-[#dfb86c] shadow-2xl flex items-center justify-center text-[#dfb86c] hover:scale-105 transition-transform">
                <ArrowUpDown className="w-5 h-5" />
              </div>
            </div>
          ) : (
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center will-change-[left]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-0 bottom-0 w-[2.5px] bg-[#dfb86c] shadow-[0_0_15px_#dfb86c]" />
              <div className="relative -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#080e1b] border-2 border-[#dfb86c] shadow-2xl flex items-center justify-center text-[#dfb86c] hover:scale-105 transition-transform">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>

        {/* Quick controls bar below image */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mt-3 px-3">
          <button 
            onClick={() => setSliderPosition(0)} 
            className="hover:text-white transition-colors py-1"
          >
            ← Ver Solo Antes
          </button>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            ↕ Arrastra hacia arriba o abajo para revelar la remodelación
          </span>
          <button 
            onClick={() => setSliderPosition(100)} 
            className="hover:text-[#dfb86c] text-[#dfb86c] transition-colors font-bold py-1"
          >
            Ver Solo Después →
          </button>
        </div>
      </div>

      {/* 3. Project Summary & Direct Actions */}
      <div className="w-full max-w-6xl p-6 sm:p-8 rounded-3xl bg-[#0a1224] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-mono text-[#dfb86c] uppercase tracking-wider">
            {project.comuna} • {project.surface} m² útiles
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Aumento de plusvalía estimada: <strong className="text-emerald-400">+{project.valueAddedPercent}%</strong> en {project.durationWeeks} semanas de obra.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-full border border-white/20 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Ficha Guardada</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Bajar Ficha HD</span>
              </>
            )}
          </button>

          <a
            href={`https://wa.me/56923807285?text=${encodeURIComponent(
              `Hola BANÁ Propiedades, deseo consultar por una remodelación como "${project.title}" (${project.comuna}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial btn-rounded btn-primary-propper text-xs py-3 px-6 shadow-xl shadow-[#dfb86c]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Cotizar en WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
