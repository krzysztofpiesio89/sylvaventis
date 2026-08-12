import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Cart } from '@/types/cart';

export type { CartProduct, Cart } from '@/types/cart';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isOpen: boolean;
  setCart: (cart: CartState['cart']) => void;
  updateCart: (newCart: NonNullable<CartState['cart']>) => void;
  syncWithWooCommerce: (cart: NonNullable<CartState['cart']>) => void;
  clearWooCommerceSession: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      isLoading: false,
      isOpen: false,
      setCart: (cart) => set({ cart }),
      updateCart: (newCart) => {
        set({ cart: newCart });
        // Sync with WooCommerce
        localStorage.setItem('woocommerce-cart', JSON.stringify(newCart));
      },
      syncWithWooCommerce: (cart) => {
        set({ cart });
        localStorage.setItem('woocommerce-cart', JSON.stringify(cart));
      },
      clearWooCommerceSession: () => {
        set({ cart: null });
        localStorage.removeItem('woo-session');
        localStorage.removeItem('woocommerce-cart');
      },
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
