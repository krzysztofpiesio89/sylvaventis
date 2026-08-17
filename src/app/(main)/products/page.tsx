import { wpFetch } from '@/lib/wordpress';
import { FETCH_ALL_PRODUCTS_QUERY } from '@/lib/queries';
import { cleanPrice } from '@/utils/functions/functions';
import ProductListApp from '@/components/Product/ProductListApp';

export const metadata = {
  title: 'Kollektion | Sylvaventis',
  description: 'Entdecke unsere handverlesene Kollektion an Premium-Naturprodukten.',
};

export default async function ProductsPage() {
  const data = await wpFetch<{ products: { nodes: any[] } }>(
    FETCH_ALL_PRODUCTS_QUERY,
    {},
    { tags: ['products'] }
  );

  const products = data.products.nodes.map(product => ({
    ...product,
    price: cleanPrice(product.price),
    regularPrice: cleanPrice(product.regularPrice),
    salePrice: cleanPrice(product.salePrice),
  }));

  return (
    <div className="min-h-screen bg-obsidian text-text">
      {/* Hero / Header Spacer */}
      <div className="h-40 lg:h-56" />
      
      <main className="container-wide pb-32">
        <div className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-6 animate-fade-in font-accent">
            Premium Auswahl
          </h2>
          <div className="w-20 h-px bg-accent/30 mb-12" />
        </div>

        <ProductListApp 
          products={products} 
          title="Kollektion" 
        />
      </main>
    </div>
  );
}
