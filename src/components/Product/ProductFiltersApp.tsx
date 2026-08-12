'use client';

import { Dispatch, SetStateAction } from 'react';
import { Product, ProductType } from '@/types/product';
import Button from '@/components/UI/Button.component';
import Checkbox from '@/components/UI/Checkbox.component';
import RangeSlider from '@/components/UI/RangeSlider.component';

interface ProductFiltersAppProps {
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
    <div className="space-y-12 py-4">
      {/* Product Types */}
      <div>
        <h3 className="text-[10px] font-bold mb-8 text-accent uppercase tracking-[0.3em]">
          Category
        </h3>
        <div className="space-y-4">
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
        <h3 className="text-[10px] font-bold mb-8 text-accent uppercase tracking-[0.3em]">
          Price Range
        </h3>
        <div className="px-2">
          <RangeSlider
            id="price-range"
            label="Price"
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
          <h3 className="text-[10px] font-bold mb-8 text-accent uppercase tracking-[0.3em]">
            Size
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-3 text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  selectedSizes.includes(size)
                    ? 'bg-white text-obsidian border-white'
                    : 'bg-transparent text-white border-white/10 hover:border-white/30'
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
          <h3 className="text-[10px] font-bold mb-8 text-accent uppercase tracking-[0.3em]">
            Variant
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                  selectedColors.includes(color.name)
                    ? 'border-accent scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.slug.includes('-') ? undefined : color.slug }}
                title={color.name}
              >
                {selectedColors.includes(color.name) && (
                   <div className="w-1 h-1 bg-white rounded-full shadow-glow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full py-4 text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted hover:text-white transition-colors border-t border-white/5 pt-8"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default ProductFiltersApp;
