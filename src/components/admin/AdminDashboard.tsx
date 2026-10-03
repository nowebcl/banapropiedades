import React, { useState, useEffect } from 'react';
import { Building, Mail, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';
import { Property } from '../../data/properties';
import {
  fetchProperties,
  fetchMessages,
  logoutAdmin,
  isAdminAuthenticated,
  MessageRecord,
} from '../../services/pocketbase';
import { AdminPropertiesList } from './AdminPropertiesList';
import { AdminPropertyForm } from './AdminPropertyForm';
import { AdminMessagesList } from './AdminMessagesList';
import { AdminLogin } from './AdminLogin';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

type AdminView = 'properties' | 'new_property' | 'edit_property' | 'messages';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExitAdmin }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [currentView, setCurrentView] = useState<AdminView>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  // Load properties & messages
  const loadData = async () => {
    if (!isAdminAuthenticated()) return;
    setLoading(true);
    try {
      const [propsData, msgsData] = await Promise.all([
        fetchProperties(),
        fetchMessages(),
      ]);
      setProperties(propsData);
      setMessages(msgsData);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const handleLogout = () => {
    logoutAdmin();
    setAuthenticated(false);
  };

  const handleStartEdit = (property: Property) => {
    setEditingProperty(property);
    setCurrentView('edit_property');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNew = () => {
    setEditingProperty(null);
    setCurrentView('new_property');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertySaved = () => {
    loadData();
    setEditingProperty(null);
    setCurrentView('properties');
  };

  if (!authenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setAuthenticated(true)}
        onBackToSite={onExitAdmin}
      />
    );
  }

  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="min-h-screen bg-[#080e1b] text-slate-100 flex flex-col font-sans selection:bg-[#dfb86c]/30 selection:text-white">
      {/* Top Luxury Admin Header */}
      <header className="sticky top-0 z-40 bg-[#080e1b]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 shadow-xl shadow-black/50">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand & Admin Tag */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('properties')}
              className="flex items-center group cursor-pointer focus:outline-none"
            >
              <img
                src="/logo.png"
                alt="BANÁ PROPIEDADES"
                className="h-8 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dfb86c]/15 text-[#dfb86c] text-[10px] font-mono uppercase tracking-widest font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              PANEL ADMIN
            </span>
          </div>

          {/* Center: Tabs (Propiedades & Mensajes) */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingProperty(null);
                setCurrentView('properties');
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                currentView === 'properties' || currentView === 'new_property' || currentView === 'edit_property'
                  ? 'bg-[#dfb86c] text-slate-950 shadow-lg shadow-[#dfb86c]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Propiedades</span>
              <span className="text-[10px] opacity-80">({properties.length})</span>
            </button>

            <button
              onClick={() => {
                setEditingProperty(null);
                setCurrentView('messages');
              }}
              className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                currentView === 'messages'
                  ? 'bg-[#dfb86c] text-slate-950 shadow-lg shadow-[#dfb86c]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Mensajes</span>
              <span className="text-[10px] opacity-80">({messages.length})</span>
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-md">
                  {unreadMessagesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onExitAdmin}
              className="px-3 py-2 rounded-xl border border-white/10 hover:border-[#dfb86c]/50 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              title="Volver a la vista pública de la web"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ver Sitio Web</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-red-500/30 hover:border-red-500 bg-red-950/30 hover:bg-red-950/60 text-xs font-semibold text-red-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin View Container */}
      <main className="flex-1 max-w-[1300px] w-full mx-auto px-4 sm:px-8 py-8">
        {currentView === 'properties' && (
          <AdminPropertiesList
            properties={properties}
            onAddNew={handleStartNew}
            onEdit={handleStartEdit}
            onRefresh={loadData}
          />
        )}

        {(currentView === 'new_property' || currentView === 'edit_property') && (
          <AdminPropertyForm
            initialProperty={editingProperty}
            onSaved={handlePropertySaved}
            onCancel={() => {
              setEditingProperty(null);
              setCurrentView('properties');
            }}
          />
        )}

        {currentView === 'messages' && (
          <AdminMessagesList
            messages={messages}
            onRefresh={loadData}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};
