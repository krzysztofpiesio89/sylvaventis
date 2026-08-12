'use client';

import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useMutation } from '@apollo/client';
import { CHECKOUT_MUTATION } from '@/utils/gql/GQL_MUTATIONS';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThankYouAnimation from '@/components/Checkout/ThankYouAnimation';

// Added state for payment method selection
const PAYMENT_OPTIONS = [
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'cheque', label: 'Check Payments' },
  { value: 'bacs', label: 'Direct Bank Transfer' },
];

export default function CheckoutPage() {
  const { cart, clearWooCommerceSession } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('cod'); // default

  const [checkout] = useMutation(CHECKOUT_MUTATION, {
    onCompleted: (data) => {
      console.log('Order Completed:', data);
      setIsSuccess(true);
      clearWooCommerceSession();
      // Wait for animation to play before redirect
      setTimeout(() => {
        router.push('/checkout/thank-you');
      }, 4000);
    },
    onError: (err) => {
      console.error('Checkout Error:', err);
      setError('An error occurred during checkout. Please try again.');
      setIsProcessing(false);
    }
  });

  if (!isSuccess && (!cart || cart.products.length === 0)) {
    return (
      <div className="bg-obsidian min-h-screen flex flex-col items-center justify-center p-12 text-center">
        <h1 className="text-4xl font-light text-white mb-8">Your bag is empty</h1>
        <Link href="/products" className="btn-premium px-12 py-5 !text-obsidian uppercase tracking-widest font-bold">
          Start Discovery
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const checkoutInput = {
      clientMutationId: uuidv4(),
      billing: {
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        address1: data.address as string,
        city: data.city as string,
        postcode: data.postcode as string,
        email: data.email as string,
        phone: data.phone as string,
        country: data.country as string,
      },
      shipping: {
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        address1: data.address as string,
        city: data.city as string,
        postcode: data.postcode as string,
        email: data.email as string,
        phone: data.phone as string,
        country: data.country as string,
      },
      shipToDifferentAddress: false,
      paymentMethod: selectedPayment, // dynamic based on user choice
      isPaid: false,
    };

    checkout({ variables: { input: checkoutInput } });
  };

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-20 px-6 lg:px-12 font-outfit text-text">
      {isSuccess ? (
        <ThankYouAnimation />
      ) : (
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-5xl lg:text-7xl font-light text-white mb-16 tracking-tight">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-20">
          
          {/* Left Column: Billing Details */}
          <div className="flex-1 space-y-12">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-8">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required name="firstName" placeholder="First Name" className="checkout-input" />
                <input required name="lastName" placeholder="Last Name" className="checkout-input" />
                <input required name="email" type="email" placeholder="Email Address" className="checkout-input md:col-span-2" />
                <input required name="phone" placeholder="Phone Number" className="checkout-input md:col-span-2" />
                <input required name="address" placeholder="Shipping Address" className="checkout-input md:col-span-2" />
                <input required name="city" placeholder="City" className="checkout-input" />
                <input required name="postcode" placeholder="Postal Code" className="checkout-input" />
                <select required name="country" className="checkout-input md:col-span-2" defaultValue="">
                  <option value="" disabled>Select Country</option>
                  <option value="DE">Germany</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="FR">France</option>
                  <option value="NL">Netherlands</option>
                </select>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-8">Payment Method</h2>
              <div className="glass p-6 border border-accent/20">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center mb-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={selectedPayment === opt.value}
                      onChange={() => setSelectedPayment(opt.value)}
                      className="mr-2 h-4 w-4 border border-accent text-accent focus:ring-accent"
                    />
                    <span className="text-sm font-bold text-white uppercase tracking-widest">{opt.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[450px]">
            <div className="glass p-10 sticky top-32 shadow-2xl border border-white/5">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-10 pb-6 border-b border-white/5">Summary</h2>
              
              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart!.products.map((item) => (
                  <div key={item.cartKey} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-white/5 shrink-0">
                      <Image src={item.image?.sourceUrl || ''} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-white leading-tight">{item.name}</h3>
                      <p className="text-[9px] text-text-muted mt-1 uppercase tracking-widest">Qty: {item.qty}</p>
                      <p className="text-[10px] font-bold text-accent mt-2">{item.totalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between text-xs uppercase tracking-widest">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-white font-bold">{cart!.totalProductsPrice?.replace(/&nbsp;/g, ' ')}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest">
                  <span className="text-text-muted">Shipping</span>
                  <span className="text-success font-bold">Free</span>
                </div>
                <div className="flex justify-between pt-6 mt-4 border-t border-white/10">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">Total</span>
                  <span className="text-2xl font-bold text-accent">{cart!.totalProductsPrice?.replace(/&nbsp;/g, ' ')}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="btn-premium w-full !text-obsidian py-6 mt-12 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                    Processing...
                  </>
                ) : 'Complete Purchase'}
              </button>

              {error && (
                <p className="mt-6 text-[10px] text-error uppercase text-center font-bold tracking-widest">{error}</p>
              )}
            </div>
          </div>

        </form>
        </div>
      )}
    </div>
  );
}
