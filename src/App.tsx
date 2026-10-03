import React, { useState, useEffect } from 'react';
import { Navbar, AppView } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PropertiesView } from './components/PropertiesView';
import { ConstructionView } from './components/ConstructionView';
import { SpecializedServicesView } from './components/SpecializedServicesView';
import { PublishWithUsView } from './components/PublishWithUsView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { FooterPropper } from './components/FooterPropper';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileAppTabBar } from './components/MobileAppTabBar';
import { Property, PROPERTIES } from './data/properties';

export function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [searchFilters, setSearchFilters] = useState<{
    operation?: string;
    propertyType?: string;
    comuna?: string;
  }>({});

  // Sync state with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();

      if (hash.startsWith('#propiedad-')) {
        const code = hash.replace('#propiedad-', '').toUpperCase();
        const found = PROPERTIES.find((p) => p.code.toUpperCase() === code);
        if (found) {
          setSelectedProperty(found);
          setCurrentView('propiedades');
          return;
        }
      }

      if (hash.includes('propiedad')) {
        setCurrentView('propiedades');
      } else if (hash.includes('construccion') || hash.includes('remodelacion') || hash.includes('antes-y-despues')) {
        setCurrentView('construccion');
      } else if (hash.includes('servicio') || hash.includes('tasacion') || hash.includes('posesion')) {
        setCurrentView('servicios');
      } else if (hash.includes('publica')) {
        setCurrentView('publica');
      } else if (hash.includes('nosotros') || hash.includes('giovanna')) {
        setCurrentView('nosotros');
      } else if (hash.includes('contacto')) {
        setCurrentView('contacto');
      } else {
        setCurrentView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    const hashMapping: Record<AppView, string> = {
      home: '#inicio',
      propiedades: '#propiedades',
      construccion: '#construccion',
      servicios: '#servicios',
      publica: '#publica',
      nosotros: '#nosotros',
      contacto: '#contacto',
    };
    window.history.pushState(null, '', hashMapping[view]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (filters: { operation: string; propertyType: string; comuna: string }) => {
    setSearchFilters(filters);
    navigateTo('propiedades');
  };

  return (
    <div className="min-h-screen bg-[#080e1b] text-slate-100 font-sans selection:bg-[#dfb86c]/30 selection:text-white relative pb-16 lg:pb-0">
      {/* 1. Header with Big Logo, 7 Separated Section Links & Drawer */}
      <Navbar currentView={currentView} onNavigate={navigateTo} />

      {/* 2. DYNAMIC SEPARATED SECTIONS (NO TODO EN EL INICIO) */}
      <main>
        {currentView === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSearch={handleHeroSearch}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            featuredProperties={PROPERTIES}
          />
        )}

        {currentView === 'propiedades' && (
          <PropertiesView
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            initialFilters={searchFilters}
          />
        )}

        {currentView === 'construccion' && <ConstructionView />}

        {currentView === 'servicios' && <SpecializedServicesView />}

        {currentView === 'publica' && <PublishWithUsView />}

        {currentView === 'nosotros' && <AboutView />}

        {currentView === 'contacto' && <ContactView />}
      </main>

      {/* 3. Footer with All Section Links & Brand Data */}
      <FooterPropper onNavigate={navigateTo} />

      {/* 4. High Conversion Property Detail Modal with Print/PDF, WhatsApp & Share */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {/* 5. Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 6. Native-like Mobile Bottom Navigation App Bar */}
      <MobileAppTabBar currentView={currentView} onNavigate={navigateTo} />
    </div>
  );
}

export default App;
