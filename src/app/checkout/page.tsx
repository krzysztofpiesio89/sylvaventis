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

const PAYMENT_OPTIONS = [
  { 
    value: 'cod', 
    label: 'Cash on Delivery', 
    description: 'Pay with cash upon package delivery.' 
  },
  { 
    value: 'cheque', 
    label: 'Check Payments', 
    description: 'Send a check to our store address.' 
  },
  { 
    value: 'bacs', 
    label: 'Direct Bank Transfer', 
    description: 'Make your payment directly into our bank account.' 
  },
];

export default function CheckoutPage() {
  const { cart, clearWooCommerceSession } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('cod');

  const [checkout] = useMutation(CHECKOUT_MUTATION, {
    onCompleted: (data) => {
      console.log('Order Completed:', data);
      setIsSuccess(true);
      clearWooCommerceSession();
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
      <div className="bg-stone-50 dark:bg-stone-950 min-h-screen flex flex-col items-center justify-center p-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-8">Dein Warenkorb ist leer</h1>
        <Link href="/categories" className="px-10 py-4 bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-300 transition-colors shadow-md">
          Jetzt Entdecken →
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
      paymentMethod: selectedPayment,
      isPaid: false,
    };

    checkout({ variables: { input: checkoutInput } });
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pt-36 pb-24 px-6 lg:px-12 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {isSuccess ? (
        <ThankYouAnimation />
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-mono font-bold block mb-2">
              Secure Checkout · Sylvaventis Sanctuary
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">Kasse</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Billing Details */}
            <div className="lg:col-span-7 space-y-10">
              <section className="rounded-3xl border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/80 p-8 md:p-10 shadow-sm backdrop-blur-md space-y-8">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-amber-400">Rechnungsdetails</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input required name="firstName" placeholder="Vorname *" className="checkout-input-premium" />
                  <input required name="lastName" placeholder="Nachname *" className="checkout-input-premium" />
                  <input required name="email" type="email" placeholder="E-Mail Adresse *" className="checkout-input-premium md:col-span-2 font-mono" />
                  <input required name="phone" placeholder="Telefonnummer *" className="checkout-input-premium md:col-span-2 font-mono" />
                  <input required name="address" placeholder="Adresse *" className="checkout-input-premium md:col-span-2" />
                  <input required name="city" placeholder="Stadt *" className="checkout-input-premium" />
                  <input required name="postcode" placeholder="Postleitzahl *" className="checkout-input-premium font-mono" />
                  <select required name="country" className="checkout-input-premium md:col-span-2" defaultValue="">
                    <option value="" disabled>Land auswählen *</option>
                    <option value="DE">Deutschland</option>
                    <option value="AT">Österreich</option>
                    <option value="CH">Schweiz</option>
                  </select>
                </div>
              </section>

              {/* Payment Methods Section */}
              <section className="rounded-3xl border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/80 p-8 md:p-10 shadow-sm backdrop-blur-md space-y-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-amber-400">Zahlungsmethode</h2>
                <div className="space-y-3">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const isSelected = selectedPayment === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400/10 shadow-sm'
                            : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 hover:border-amber-400/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.value}
                          checked={isSelected}
                          onChange={() => setSelectedPayment(opt.value)}
                          className="mt-1 h-4 w-4 text-amber-400 focus:ring-amber-400 border-stone-300 dark:border-stone-700 accent-amber-400"
                        />
                        <div className="space-y-1">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 block">
                            {opt.label}
                          </span>
                          <span className="text-xs font-sans text-stone-500 dark:text-stone-400 block">
                            {opt.description}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/90 p-8 md:p-10 sticky top-36 shadow-xl backdrop-blur-md space-y-8">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-amber-400 pb-4 border-b border-stone-200 dark:border-stone-800">
                  Bestellübersicht
                </h2>
                
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart!.products.map((item) => (
                    <div key={item.cartKey} className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800/60">
                      <div className="relative w-14 h-14 bg-stone-200 dark:bg-stone-800 shrink-0 rounded-xl overflow-hidden border border-stone-300 dark:border-stone-700">
                        <Image src={item.image?.sourceUrl || ''} alt={item.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 truncate">{item.name}</h3>
                        <p className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider mt-0.5">Qty: {item.qty}</p>
                        <p className="text-xs font-mono font-bold text-amber-400 mt-1">{item.totalPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-stone-200 dark:border-stone-800 font-mono text-xs">
                  <div className="flex justify-between tracking-widest text-stone-600 dark:text-stone-400">
                    <span>Zwischensumme</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">{cart!.totalProductsPrice?.replace(/&nbsp;/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between tracking-widest text-stone-600 dark:text-stone-400">
                    <span>Versand</span>
                    <span className="font-bold text-emerald-500">Kostenlos</span>
                  </div>
                  <div className="flex justify-between pt-6 mt-4 border-t border-stone-200 dark:border-stone-800 text-sm">
                    <span className="font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100">Gesamtsumme</span>
                    <span className="text-2xl font-bold text-amber-400">{cart!.totalProductsPrice?.replace(/&nbsp;/g, ' ')}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-5 rounded-full bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-[0.3em] hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-400/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                      Verarbeitung...
                    </>
                  ) : 'Kostenpflichtig Bestellen'}
                </button>

                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center space-y-3">
                  <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest text-center">Sicherer Checkout · 256-Bit SSL Encryption</p>
                  <div className="flex items-center justify-center gap-4 text-stone-400">
                    {/* SSL Icon */}
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    {/* Card Icon */}
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    {/* Check Icon */}
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 text-xs font-mono text-red-500 uppercase text-center font-bold tracking-widest">{error}</p>
                )}
              </div>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
