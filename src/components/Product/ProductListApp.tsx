'use client';

import { Product } from '@/types/product';
import { useProductFilters } from '@/hooks/useProductFilters';
import ProductCard from './ProductCard.component';
import ProductFiltersApp from './ProductFiltersApp';

interface ProductListAppProps {
  products: Product[];
  title: string;
}

const ProductListApp = ({ products, title }: ProductListAppProps) => {
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

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <ProductFiltersApp
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-2">
              {title}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
              Displaying {filteredProducts.length} items
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-text-muted">Sort by:</span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-obsidian-alt border border-white/10 rounded-none px-4 py-2 text-[10px] uppercase tracking-widest focus:border-accent outline-none transition-colors"
            >
              <option value="popular">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
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
        ) : (
          <div className="py-40 text-center border border-dashed border-white/10">
            <p className="text-text-muted uppercase tracking-[0.2em] text-xs">No products match your criteria</p>
            <button 
              onClick={resetFilters}
              className="mt-6 text-accent uppercase tracking-widest text-[10px] font-bold hover:text-white transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListApp;
