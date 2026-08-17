'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { ADD_TO_CART } from '@/utils/gql/GQL_MUTATIONS';
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { useCartStore } from '@/stores/cartStore';

interface AddToCartProps {
  productId: number;
  variationId?: number;
  disabled?: boolean;
  outOfStock?: boolean;
}

const AddToCartApp = ({ productId, variationId, disabled, outOfStock }: AddToCartProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoading: isCartLoading } = useCartStore();

  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    variables: {
      input: {
        clientMutationId: uuidv4(),
        productId,
        ...(variationId ? { variationId } : {}),
      },
    },
    context: {
      fetchOptions: {
        mode: 'cors',
      },
    },
    refetchQueries: [{ query: GET_CART }],
    onCompleted: () => {
      setIsSuccess(true);
      // Odświeżamy okno, aby wszystkie komponenty (Navbar, Cart) pobrały świeże dane
      // W wersji produkcyjnej użyjemy bardziej subtelnego odświeżania stanu, 
      // ale to zapewni 100% pewności działania teraz.
      setTimeout(() => {
        setIsSuccess(false);
        window.location.reload();
      }, 1500);
    },
    onError: (error) => {
      console.error('Add to Cart Error:', error);
      const message = error?.message ? error.message.replace(/&quot;/g, '"') : 'Failed to add product to cart. Please check your connection.';
      alert(message);
    }
  });

  const isDisabled = loading || isCartLoading || disabled || outOfStock;

  return (
    <button 
      onClick={() => addToCart()}
      disabled={isDisabled}
      className={`w-full px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 font-accent tracking-widest uppercase font-bold shadow-md hover:shadow-lg ${
        isSuccess 
          ? 'bg-success text-kn-cream' 
          : isDisabled 
            ? 'bg-kn-sand/50 text-kn-stone cursor-not-allowed'
            : 'bg-kn-forest text-kn-cream hover:bg-kn-moss hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Hinzufügen...
        </>
      ) : isSuccess ? (
        'Hinzugefügt'
      ) : outOfStock ? (
        'Ausverkauft'
      ) : disabled ? (
        'Variante wählen'
      ) : (
        'IN DEN WARENKORB'
      )}
    </button>
  );
};

export default AddToCartApp;
