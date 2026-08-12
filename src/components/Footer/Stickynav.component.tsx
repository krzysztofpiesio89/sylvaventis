'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';

const Stickynav = () => {
  const { cart, setIsOpen } = useCartStore();
  const totalItemsCount = cart?.totalProductsCount || 0;

  return (
    <nav className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
      <div className="glass rounded-full px-8 py-4 flex items-center justify-between shadow-2xl border border-white/10">
        <Link href="/" className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-accent-gold transition-colors">
          Home
        </Link>
        
        <Link href="/products" className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-accent-gold transition-colors">
          Shop
        </Link>

        <button 
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-white">Bag</span>
          {totalItemsCount > 0 && (
            <span className="w-5 h-5 bg-accent text-[9px] flex items-center justify-center rounded-full text-white font-bold">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Stickynav;
