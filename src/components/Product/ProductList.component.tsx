'use client';

import { useState, useRef, useEffect } from 'react';
import { Product } from '@/types/product';
import { useProductFilters } from '@/hooks/useProductFilters';
import ProductCard from './ProductCard.component';
import ProductFilters from './ProductFilters.component';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'motion/react';

interface ProductListProps {
  products: Product[];
  title: string;
}

const ProductList = ({ products, title }: ProductListProps) => {
  const { t } = useTranslation('common');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const {
    sortBy,
    setSortBy,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    priceRange,
    setPriceRange,
    productTypes,
    toggleProductType,
    resetFilters,
    filterProducts
  } = useProductFilters(products);

  const filteredProducts = filterProducts(products);

  const sortOptions = [
    { value: 'popular', label: t('popular') || 'Popularity' },
    { value: 'price-low', label: t('price_low_high') || 'Price: Low to High' },
    { value: 'price-high', label: t('price_high_low') || 'Price: High to Low' },
    { value: 'newest', label: t('newest') || 'Newest' },
  ];

  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || 'Popularity';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64">
        <ProductFilters
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          productTypes={productTypes}
          toggleProductType={toggleProductType}
          products={products}
          resetFilters={resetFilters}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center sm:text-left text-stone-900 dark:text-stone-100 uppercase tracking-[0.15em] drop-shadow">
            {title} <span className="text-amber-400 italic">({filteredProducts.length})</span>
          </h1>

          {/* Custom Sort Dropdown */}
          <div className="flex items-center gap-3 relative" ref={sortRef}>
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold">
              {t('sort_by')}:
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between gap-3 min-w-[180px] px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-mono font-bold uppercase tracking-wider hover:border-amber-400 transition-all shadow-sm focus:outline-none"
              >
                <span>{currentSortLabel}</span>
                <svg
                  className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xl backdrop-blur-xl p-2 z-50 overflow-hidden"
                  >
                    {sortOptions.map((option) => {
                      const isSelected = option.value === sortBy;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all text-left ${
                            isSelected
                              ? 'bg-amber-400/15 text-amber-400 font-bold'
                              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-amber-400'
                          }`}
                        >
                          <span>{option.label}</span>
                          {isSelected && (
                            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard
              key={product.databaseId}
              databaseId={product.databaseId}
              name={product.name}
              price={product.price}
              regularPrice={product.regularPrice}
              salePrice={product.salePrice}
              onSale={product.onSale}
              slug={product.slug}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
