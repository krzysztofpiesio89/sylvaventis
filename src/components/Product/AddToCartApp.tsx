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
}

const AddToCartApp = ({ productId, variationId, disabled }: AddToCartProps) => {
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
      alert('Failed to add product to cart. Please check your connection.');
    }
  });

  return (
    <button 
      onClick={() => addToCart()}
      disabled={loading || isCartLoading || disabled}
      className={`btn-premium w-full !text-obsidian flex items-center justify-center gap-3 transition-all ${
        isSuccess ? '!bg-success !text-white' : ''
      } ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
          Adding...
        </>
      ) : isSuccess ? (
        'Added to Experience'
      ) : disabled ? (
        'Select an Option'
      ) : (
        'Add to Experience'
      )}
    </button>
  );
};

export default AddToCartApp;
