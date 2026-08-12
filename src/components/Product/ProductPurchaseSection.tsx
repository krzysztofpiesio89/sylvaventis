'use client';

import { useState, useEffect } from 'react';
import AddToCartApp from './AddToCartApp';
import { cleanPrice } from '@/utils/functions/functions';

interface Variation {
  databaseId: number;
  name: string;
  price: string;
  attributes: {
    nodes: Array<{
      name: string;
      value: string;
    }>;
  };
}

interface ProductPurchaseSectionProps {
  productId: number;
  variations?: {
    nodes: Variation[];
  };
  defaultPrice: string;
}

export default function ProductPurchaseSection({ productId, variations, defaultPrice }: ProductPurchaseSectionProps) {
  const hasVariations = variations && variations.nodes.length > 0;
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);

  // If there's only one variation, select it by default
  useEffect(() => {
    if (hasVariations && variations.nodes.length === 1) {
      setSelectedVariation(variations.nodes[0]);
    }
  }, [hasVariations, variations]);

  const currentPrice = selectedVariation ? selectedVariation.price : defaultPrice;

  return (
    <div className="space-y-8">
      <div className="flex items-baseline gap-6 mt-2 mb-10">
        <span className="text-3xl md:text-4xl font-bold text-text">{cleanPrice(currentPrice)}</span>
      </div>

      {hasVariations && (
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">Select Option</label>
          <div className="grid grid-cols-2 gap-3">
            {variations.nodes.map((v) => (
              <button
                key={v.databaseId}
                onClick={() => setSelectedVariation(v)}
                className={`px-4 py-3 text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  selectedVariation?.databaseId === v.databaseId
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border hover:border-text-muted text-text-muted'
                }`}
              >
                {v.attributes.nodes[0]?.value || v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="glass p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_10px_rgba(50,215,75,0.5)]" />
          <span className="text-xs uppercase tracking-widest text-success font-bold">Laboratory Tested &amp; Pure</span>
        </div>
        
        <AddToCartApp 
          productId={productId} 
          variationId={selectedVariation?.databaseId} 
          disabled={hasVariations && !selectedVariation}
        />
        
        <p className="text-center mt-6 text-[10px] text-text-light tracking-widest uppercase">Free Premium Delivery on orders over €150</p>
      </div>
    </div>
  );
}
