import { useEffect, useState } from 'react';
import { NavProvider, useNav } from '@/lib/nav';
import { ShopProvider } from '@/lib/shop';
import LuxCursor from '@/components/LuxCursor';
import Particles from '@/components/Particles';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { useScrollProgress } from '@/lib/hooks';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import About from '@/pages/About';
import Lookbook from '@/pages/Lookbook';
import Contact from '@/pages/Contact';
import Checkout from '@/pages/Checkout';
import Appointment from '@/pages/Appointment';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [loading]);

  return (
    <NavProvider>
      <ShopProvider>
        {loading && <Loader onDone={() => setLoading(false)} />}
        <LuxCursor />
        <Particles density={22} />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-[2] bg-ivory/0">
          <PageRouter />
        </main>
        <Footer />
        <BackToTop />
      </ShopProvider>
    </NavProvider>
  );
}

function PageRouter() {
  const { route } = useNav();

  return (
    <div key={route} className="animate-fade-in">
      {route === 'home' && <Home />}
      {route === 'shop' && <Shop />}
      {route === 'about' && <About />}
      {route === 'lookbook' && <Lookbook />}
      {route === 'contact' && <Contact />}
      {route === 'checkout' && <Checkout />}
      {route === 'appointment' && <Appointment />}
    </div>
  );
}

function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-[1001] h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-champagne-300 via-champagne-500 to-emerald transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-[900] flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-ivory shadow-luxury transition-all duration-500 ease-luxury ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
