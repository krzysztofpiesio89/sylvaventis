'use client';

import { useCartStore } from '@/stores/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEMS_FROM_CART } from '@/utils/gql/GQL_MUTATIONS';
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { v4 as uuidv4 } from 'uuid';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, isLoading } = useCartStore();

  const [removeItem, { loading: isRemoving }] = useMutation(REMOVE_ITEMS_FROM_CART, {
    refetchQueries: [{ query: GET_CART }],
  });

  const handleRemove = (key: string) => {
    console.log('Attempting to remove item with key:', key);
    removeItem({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          keys: [key],
        },
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-kn-charcoal/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-kn-cream/95 backdrop-blur-xl border-l border-kn-sand h-full shadow-2xl flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="p-8 border-b border-kn-sand flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-widest text-kn-bark">Warenkorb</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !cart || !cart.products || cart.products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-text-muted text-xs uppercase tracking-widest mb-8">Your bag is empty</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="btn-premium px-8 py-4 !text-obsidian"
              >
                Begin Discovery
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.products.map((item: any) => (
                <div key={item.cartKey} className="flex gap-6 group">
                  <div className="relative w-20 h-24 bg-kn-cream-warm overflow-hidden rounded-sm shadow-sm border border-kn-sand/50">
                    <Image
                      src={item.image?.sourceUrl || '/images/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-kn-charcoal mb-2">{item.name}</h3>
                    {item.variation && (
                      <p className="text-[9px] uppercase tracking-widest text-kn-moss mb-2">
                        {item.variation.name}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-[10px] text-kn-stone uppercase tracking-widest">Qty: {item.qty}</p>
                      <div className="flex items-center gap-4">
                        <p className="text-xs font-bold text-kn-bark">
                          {item.totalPrice}
                        </p>
                        <button
                          onClick={() => handleRemove(item.cartKey)}
                          disabled={isRemoving}
                          className="p-2 -mr-2 group/remove disabled:opacity-50"
                          title="Remove item"
                        >
                          <svg className="w-3 h-3 text-kn-fog group-hover/remove:text-error transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.products && cart.products.length > 0 && (
          <div className="p-8 bg-kn-cream-warm border-t border-kn-sand space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-kn-stone">Subtotal</span>
              <span className="text-xl font-bold text-kn-charcoal">
                {cart.totalProductsPrice}
              </span>
            </div>
            <p className="text-[9px] text-kn-fog uppercase tracking-[0.2em] leading-relaxed">
              Shipping &amp; taxes calculated at checkout. Free shipping over €80 in AT.
            </p>
            <Link 
              href="/checkout"
              className="relative overflow-hidden px-8 py-5 bg-kn-forest text-kn-cream w-full flex items-center justify-center font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 hover:bg-kn-moss hover:scale-[1.02] active:scale-95 shadow-lg shadow-kn-forest/20"
              onClick={() => setIsOpen(false)}
            >
              Zur Kasse
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
