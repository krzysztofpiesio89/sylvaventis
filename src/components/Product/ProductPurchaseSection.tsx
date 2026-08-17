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
  stockStatus: string;
}

interface ProductPurchaseSectionProps {
  productId: number;
  variations?: {
    nodes: Variation[];
  };
  defaultPrice: string;
  stockStatus: string;
}

export default function ProductPurchaseSection({ productId, variations, defaultPrice, stockStatus }: ProductPurchaseSectionProps) {
  const hasVariations = variations && variations.nodes.length > 0;
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);

  // If there's only one variation, select it by default
  useEffect(() => {
    if (hasVariations && variations.nodes.length === 1) {
      setSelectedVariation(variations.nodes[0]);
    }
  }, [hasVariations, variations]);

  const currentPrice = selectedVariation ? selectedVariation.price : defaultPrice;
  const currentStockStatus = selectedVariation ? selectedVariation.stockStatus : stockStatus;
  const isOutOfStock = currentStockStatus === 'OUT_OF_STOCK';

  return (
    <div className="space-y-8">
      <div className="flex items-baseline gap-6 mt-2 mb-10">
        <span className="text-3xl md:text-4xl font-bold text-text">{cleanPrice(currentPrice)}</span>
      </div>

      {hasVariations && (
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold font-accent">Variante wählen</label>
          <div className="grid grid-cols-2 gap-3">
            {variations.nodes.map((v) => {
              const vOutOfStock = v.stockStatus === 'OUT_OF_STOCK';
              return (
                <button
                  key={v.databaseId}
                  onClick={() => setSelectedVariation(v)}
                  className={`px-4 py-3 text-[10px] uppercase tracking-widest border font-accent transition-all duration-300 rounded-sm flex justify-center items-center gap-2 ${
                    selectedVariation?.databaseId === v.databaseId
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-accent text-text-muted hover:text-text'
                  } ${vOutOfStock ? 'opacity-50 line-through' : ''}`}
                >
                  {v.attributes.nodes[0]?.value || v.name}
                  {vOutOfStock && <span className="text-[8px] text-error">(Ausverkauft)</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-surface-card border border-border p-8 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          {isOutOfStock ? (
            <>
              <div className="w-2 h-2 rounded-full bg-error animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
              <span className="text-xs uppercase tracking-widest text-error font-bold font-accent">Ausverkauft</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_10px_rgba(74,103,65,0.5)]" />
              <span className="text-xs uppercase tracking-widest text-success font-bold font-accent">Nachhaltig &amp; Rein</span>
            </>
          )}
        </div>
        
        <AddToCartApp 
          productId={productId} 
          variationId={selectedVariation?.databaseId} 
          disabled={hasVariations && !selectedVariation}
          outOfStock={isOutOfStock}
        />
        
        <p className="text-center mt-6 text-[10px] text-text-muted tracking-widest uppercase font-accent">Kostenloser Versand ab €150</p>
      </div>
    </div>
  );
}
