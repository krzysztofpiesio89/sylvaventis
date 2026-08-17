'use client';

import { Dispatch, SetStateAction } from 'react';
import { Product, ProductType } from '@/types/product';
import Checkbox from '@/components/UI/Checkbox.component';
import RangeSlider from '@/components/UI/RangeSlider.component';

interface ProductFiltersAppProps {
  inStockOnly?: boolean;
  setInStockOnly?: Dispatch<SetStateAction<boolean>>;
  selectedSizes: string[];
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
  selectedColors: string[];
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  productTypes: ProductType[];
  toggleProductType: (id: string) => void;
  products: Product[];
  resetFilters: () => void;
}

const ProductFiltersApp = ({
  inStockOnly = false,
  setInStockOnly,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  productTypes,
  toggleProductType,
  products,
  resetFilters,
}: ProductFiltersAppProps) => {
  // Get unique sizes from all products
  const sizes = Array.from(
    new Set(
      products.flatMap(
        (product: Product) =>
          product.allPaSizes?.nodes.map(
            (node: { name: string }) => node.name,
          ) || [],
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  // Get unique colors from all products
  const availableColors = products
    .flatMap((product: Product) => product.allPaColors?.nodes || [])
    .filter((color, index, self) => 
      index === self.findIndex((c) => c.slug === color.slug)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const colors = availableColors.map((color) => ({
    name: color.name,
    class: `bg-${color.slug}-500`,
    slug: color.slug
  }));

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  return (
    <div className="space-y-10 py-4">
      {/* Availability Filter */}
      {setInStockOnly && (
        <div className="border-b border-stone-200 dark:border-stone-800/80 pb-8">
          <h3 className="text-[10px] font-bold mb-6 text-amber-400 uppercase tracking-[0.3em] font-accent">
            Verfügbarkeit
          </h3>
          <div className="font-sans text-sm">
            <Checkbox
              id="in-stock-only"
              label="Nur auf Lager"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
            />
          </div>
        </div>
      )}

      {/* Product Types */}
      <div>
        <h3 className="text-[10px] font-bold mb-6 text-amber-400 uppercase tracking-[0.3em] font-accent">
          Kategorie
        </h3>
        <div className="space-y-3 font-sans text-sm">
          {productTypes.map((type) => (
            <Checkbox
              key={type.id}
              id={type.id}
              label={type.name}
              checked={type.checked}
              onChange={() => toggleProductType(type.id)}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-[10px] font-bold mb-6 text-amber-400 uppercase tracking-[0.3em] font-accent">
          Preisspanne
        </h3>
        <div className="px-2 font-sans">
          <RangeSlider
            id="price-range"
            label="Preis"
            min={0}
            max={1000}
            value={priceRange[1]}
            startValue={priceRange[0]}
            onChange={(value) => setPriceRange([priceRange[0], value])}
            formatValue={(value) => `€${value}`}
          />
        </div>
      </div>

      {/* Sizes */}
      {sizes.length > 0 && (
        <div>
          <h3 className="text-[10px] font-bold mb-6 text-amber-400 uppercase tracking-[0.3em]">
            Größe
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`py-3 text-[10px] uppercase tracking-widest border transition-all duration-300 font-accent rounded-xl ${
                  selectedSizes.includes(size)
                    ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow'
                    : 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-amber-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {colors.length > 0 && (
        <div>
          <h3 className="text-[10px] font-bold mb-6 text-amber-400 uppercase tracking-[0.3em]">
            Variante
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                  selectedColors.includes(color.name)
                    ? 'border-amber-400 scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.slug.includes('-') ? undefined : color.slug }}
                title={color.name}
              >
                {selectedColors.includes(color.name) && (
                   <div className="w-1.5 h-1.5 bg-white rounded-full shadow-glow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        type="button"
        onClick={resetFilters}
        className="w-full py-4 text-[10px] uppercase font-mono tracking-[0.25em] font-bold text-amber-400 hover:underline border-t border-stone-200 dark:border-stone-800 pt-6"
      >
        Alle Filter zurücksetzen
      </button>
    </div>
  );
};

export default ProductFiltersApp;
