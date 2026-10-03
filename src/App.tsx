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
import { PropertyDetailView } from './components/PropertyDetailView';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileAppTabBar } from './components/MobileAppTabBar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Property, PROPERTIES } from './data/properties';
import { fetchProperties } from './services/pocketbase';

export function App() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [searchFilters, setSearchFilters] = useState<{
    operation?: string;
    propertyType?: string;
    comuna?: string;
  }>({});

  // Fetch dynamic properties from PocketBase
  useEffect(() => {
    const loadDynamicProperties = async () => {
      try {
        const liveProps = await fetchProperties();
        if (liveProps && liveProps.length > 0) {
          setProperties(liveProps);
        }
      } catch (err) {
        console.warn('Using default properties fallback');
      }
    };
    loadDynamicProperties();
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();

      // Secret Admin URL handler (#admin)
      if (hash === '#admin' || hash.startsWith('#admin')) {
        setIsAdminMode(true);
        setSelectedProperty(null);
        return;
      }
      setIsAdminMode(false);

      // Property full-page detail view handler (#propiedad-...)
      if (hash.startsWith('#propiedad-')) {
        const code = hash.replace('#propiedad-', '').toUpperCase();
        const found =
          properties.find((p) => p.code.toUpperCase() === code) ||
          PROPERTIES.find((p) => p.code.toUpperCase() === code);
        if (found) {
          setSelectedProperty(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // If hash is not a property detail, clear selected property
      setSelectedProperty(null);

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
  }, [properties]);

  const navigateTo = (view: AppView) => {
    setIsAdminMode(false);
    setSelectedProperty(null);
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

  const handleSelectProperty = (prop: Property) => {
    setSelectedProperty(prop);
    window.history.pushState(null, '', `#propiedad-${prop.code.toLowerCase()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProperty = () => {
    setSelectedProperty(null);
    navigateTo('propiedades');
  };

  const handleHeroSearch = (filters: { operation: string; propertyType: string; comuna: string }) => {
    setSearchFilters(filters);
    navigateTo('propiedades');
  };

  // If in Secret Admin Mode, render the dedicated Admin Dashboard
  if (isAdminMode) {
    return (
      <AdminDashboard
        onExitAdmin={() => navigateTo('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080e1b] text-slate-100 font-sans selection:bg-[#dfb86c]/30 selection:text-white relative pb-16 lg:pb-0">
      {/* 1. Header with Big Logo, Navigation Links & Drawer (No admin link) */}
      <Navbar currentView={currentView} onNavigate={navigateTo} />

      {/* 2. DYNAMIC FULL-PAGE VIEWS (No popups) */}
      <main>
        {selectedProperty ? (
          <PropertyDetailView
            property={selectedProperty}
            allProperties={properties}
            onBack={handleBackFromProperty}
            onSelectProperty={handleSelectProperty}
          />
        ) : (
          <>
            {currentView === 'home' && (
              <HomeView
                onNavigate={navigateTo}
                onSearch={handleHeroSearch}
                onSelectProperty={handleSelectProperty}
                featuredProperties={properties}
              />
            )}

            {currentView === 'propiedades' && (
              <PropertiesView
                onSelectProperty={handleSelectProperty}
                initialFilters={searchFilters}
                properties={properties}
              />
            )}

            {currentView === 'construccion' && <ConstructionView />}

            {currentView === 'servicios' && <SpecializedServicesView />}

            {currentView === 'publica' && <PublishWithUsView />}

            {currentView === 'nosotros' && <AboutView />}

            {currentView === 'contacto' && <ContactView />}
          </>
        )}
      </main>

      {/* 3. Footer with Section Links & Brand Data */}
      <FooterPropper onNavigate={navigateTo} />

      {/* 4. Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 5. Native-like Mobile Bottom Navigation App Bar */}
      <MobileAppTabBar currentView={currentView} onNavigate={navigateTo} />
    </div>
  );
}

export default App;
