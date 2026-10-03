import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../services/pocketbase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [identity, setIdentity] = useState('contacto@banapropiedades.cl');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await loginAdmin(identity, password);
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error || 'Credenciales incorrectas');
      }
    } catch (err: any) {
      setError('Error al conectar con la base de datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080e1b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#dfb86c]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Back to public site button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToSite}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Sitio Público</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0b1428]/95 backdrop-blur-2xl border border-[#dfb86c]/30 shadow-2xl shadow-black/80 space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-2">
              <img
                src="/logo.png"
                alt="BANÁ PROPIEDADES"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfb86c]/15 text-[#dfb86c] text-[10px] font-mono uppercase tracking-widest font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              PORTAL ADMINISTRATIVO
            </div>

            <h1 className="text-2xl font-serif text-white tracking-wide">
              Panel de Control Baná
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Ingresa tus credenciales para administrar propiedades y responder mensajes.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  placeholder="admin@banapropiedades.cl"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#dfb86c] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#dfb86c] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-rounded btn-primary-propper py-3.5 justify-center text-xs font-bold uppercase tracking-wider shadow-xl shadow-[#dfb86c]/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                  <span>Verificando...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Acceder al Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-[10px] font-mono text-slate-500">
            Base de Datos: bana.noweb.cl • Conexión Segura TLS 1.3
          </div>
        </div>
      </div>
    </div>
  );
};
