'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import AlgoliaSearchBox from '../AlgoliaSearch/AlgoliaSearchBox.component';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';

const NavbarApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, setIsOpen } = useCartStore();
  const totalItemsCount = cart?.totalProductsCount || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsVisible(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        className={`sticky top-0 left-0 right-0 z-[60] bg-kn-cream border-b border-kn-sand transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-sm' : 'py-5'
        }`}
      >
        <div 
          className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between"
        >
          {/* Mobile Menu Toggle - Left */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-kn-forest hover:text-kn-moss transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-12">
            <Link href="/" className="group block">
              <span className="font-serif text-2xl lg:text-3xl text-kn-forest tracking-wider font-bold">Sylvaventis</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-[10px] uppercase tracking-[0.2em] font-bold text-kn-bark hover:text-kn-moss transition-colors">Kollektion</Link>
              <Link href="/categories" className="text-[10px] uppercase tracking-[0.2em] font-bold text-kn-bark hover:text-kn-moss transition-colors">Kategorien</Link>
              <Link href="/about" className="text-[10px] uppercase tracking-[0.2em] font-bold text-kn-bark hover:text-kn-moss transition-colors">Unsere Geschichte</Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-8">
            <div className="hidden lg:block">
              <AlgoliaSearchBox />
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              <ThemeToggle />
              {/* Cart Trigger */}
              <button 
                onClick={() => setIsOpen(true)}
                className="relative group flex items-center gap-2 p-2 transition-transform hover:scale-110"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 fill-none stroke-kn-forest group-hover:stroke-kn-moss transition-colors duration-300" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-kn-amber text-[9px] flex items-center justify-center rounded-full text-white font-bold transition-colors group-hover:bg-kn-moss shadow-sm">
                    {totalItemsCount}
                  </span>
                )}
              </button>
              
              <div className="w-px h-4 bg-kn-sand hidden sm:block" />
              
              <Link href="/account" className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-bold text-kn-bark hover:text-kn-moss transition-colors">Konto</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-kn-charcoal/60 backdrop-blur-md z-[70]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-kn-cream z-[80] p-12 flex flex-col shadow-2xl border-r border-kn-sand"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 text-kn-forest p-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="mt-20 flex flex-col gap-12">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif text-kn-bark">Startseite</Link>
                <Link href="/products" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif text-kn-bark">Kollektion</Link>
                <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif text-kn-bark">Kategorien</Link>
                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif text-kn-bark italic">Unsere Geschichte</Link>
                <Link href="/account" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif text-kn-bark">Konto</Link>
              </div>

              <div className="mt-auto pt-12 border-t border-kn-sand">
                <p className="text-[10px] uppercase tracking-widest text-kn-moss mb-4 font-bold">Aus den Wäldern zu Dir</p>
                <p className="text-sm text-kn-stone">Traditionelles Wissen trifft auf höchste Naturstandards.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarApp;
