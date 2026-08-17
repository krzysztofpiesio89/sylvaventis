'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import AlgoliaSearchBox from '../AlgoliaSearch/AlgoliaSearchBox.component';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      } ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto rounded-full px-8 py-4 flex items-center justify-between transition-all duration-500 border border-border ${
          isScrolled ? 'bg-obsidian shadow-2xl scale-[0.98]' : 'bg-obsidian/80 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center gap-12">
          <Link href="/" className="group block">
            <h1 className="text-2xl md:text-3xl font-serif text-text group-hover:text-accent-gold transition-colors tracking-widest uppercase">
              Sylvaventis
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-[10px] uppercase tracking-[0.2em] font-accent font-bold text-text hover:text-accent-gold transition-colors">Produkte</Link>
            <Link href="/categories" className="text-[10px] uppercase tracking-[0.2em] font-accent font-bold text-text hover:text-accent-gold transition-colors">Kategorien</Link>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:block">
            <AlgoliaSearchBox />
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsOpen(true)}
              className="relative group flex items-center gap-2 p-2 transition-transform hover:scale-110"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 fill-none stroke-text group-hover:stroke-accent-gold transition-colors duration-300" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-[9px] flex items-center justify-center rounded-full text-white font-bold transition-colors group-hover:bg-accent-gold shadow-lg">
                  {totalItemsCount}
                </span>
              )}
            </button>
            
            <div className="w-px h-4 bg-border hidden sm:block" />
            
            <Link href="/login" className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-accent font-bold text-text hover:text-accent-gold transition-colors">Account</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
