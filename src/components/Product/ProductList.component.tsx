import { useTranslation } from 'next-i18next/pages';
import { Product } from '@/types/product';
import { useProductFilters } from '@/hooks/useProductFilters';
import ProductCard from './ProductCard.component';
import ProductFilters from './ProductFilters.component';

interface ProductListProps {
  products: Product[];
  title: string;
}

const ProductList = ({ products, title }: ProductListProps) => {
  const { t } = useTranslation('common');
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
    <div className="flex flex-col md:flex-row gap-8">
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

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left text-white uppercase tracking-[0.2em] drop-shadow-2xl">
            {title} <span className="text-accent-gold italic">({filteredProducts.length})</span>
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4">
            <label htmlFor="sort-select" className="text-sm font-medium text-text">{t('sort_by')}:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-w-[140px] border border-border rounded-md px-3 py-1.5 text-sm bg-surface text-text focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="popular">{t('popular')}</option>
              <option value="price-low">{t('price_low_high')}</option>
              <option value="price-high">{t('price_high_low')}</option>
              <option value="newest">{t('newest')}</option>
            </select>
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
