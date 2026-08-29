import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertiesSection } from './components/PropertiesSection';
import { FeaturesBlock } from './components/FeaturesBlock';
import { AboutSection } from './components/AboutSection';
import { StagesSection } from './components/StagesSection';
import { BigGallery } from './components/BigGallery';
import { FaqSection } from './components/FaqSection';
import { TestimonialsPropper } from './components/TestimonialsPropper';
import { ContactSection } from './components/ContactSection';
import { LogosSection } from './components/LogosSection';
import { BonusNumbers } from './components/BonusNumbers';
import { FooterPropper } from './components/FooterPropper';
import { FloorPlanModal } from './components/FloorPlanModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileAppTabBar } from './components/MobileAppTabBar';
import { RemodelingPage } from './components/RemodelingPage';
import { Property } from './data/properties';

export function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'remodeling'>('home');

  // Handle hash changes (e.g. #remodelaciones or back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('remodelacion') || hash.includes('antes-y-despues')) {
        setCurrentView('remodeling');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: 'home' | 'remodeling') => {
    setCurrentView(view);
    if (view === 'remodeling') {
      window.history.pushState(null, '', '#remodelaciones');
    } else {
      window.history.pushState(null, '', '#page-top');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080e1b] text-slate-100 font-sans selection:bg-[#dfb86c]/30 selection:text-white relative pb-16 lg:pb-0">
      {/* 1. Header with Big Logo, Remodeling Quick Link & Staggered Hamburger Menu */}
      <Navbar currentView={currentView} onNavigate={navigateTo} />

      {/* Dynamic View Switcher */}
      {currentView === 'remodeling' ? (
        /* DEDICATED FULL REMODELING PAGE WITH BEFORE/AFTER DYNAMIC CURTAIN & SLIDER */
        <RemodelingPage onBackToHome={() => navigateTo('home')} />
      ) : (
        /* MAIN REAL ESTATE CATALOG & CORPORATE EXPERIENCE */
        <>
          {/* 2. Hero Slideshow with Lead Form */}
          <Hero onOpenRemodeling={() => navigateTo('remodeling')} />

          {/* 3. Properties Catalog */}
          <PropertiesSection onSelectProperty={(prop) => setSelectedProperty(prop)} />

          {/* 4. Features Block with Remodeling Spotlight */}
          <FeaturesBlock onOpenRemodeling={() => navigateTo('remodeling')} />

          {/* 5. About Section (Checkmarks & Video Presentation Box) */}
          <AboutSection />

          {/* 6. 4 Project Stages Timeline */}
          <StagesSection />

          {/* 7. Big Gallery Slider */}
          <BigGallery />

          {/* 8. FAQ Accordion & Framed Newsletter Box */}
          <FaqSection />

          {/* 9. Testimonials Quote Slider */}
          <TestimonialsPropper />

          {/* 10. Contact & Map Section */}
          <ContactSection />

          {/* 11. Partners & Institutional Logos */}
          <LogosSection />

          {/* 12. Bonus Numbers / Key Stats */}
          <BonusNumbers />
        </>
      )}

      {/* 13. Footer with Scroll To Top & Remodeling Link */}
      <FooterPropper onOpenRemodeling={() => navigateTo('remodeling')} />

      {/* Floor Plan & Apartment Detail Modal */}
      <FloorPlanModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden lg:block">
        <FloatingWhatsApp />
      </div>

      {/* Native-like Mobile Bottom Navigation App Bar */}
      <MobileAppTabBar currentView={currentView} onNavigate={navigateTo} />
    </div>
  );
}

export default App;
