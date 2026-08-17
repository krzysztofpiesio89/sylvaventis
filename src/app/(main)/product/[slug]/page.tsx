import { wpFetch } from '@/lib/wordpress';
import { GET_PRODUCT_BY_SLUG } from '@/lib/queries';
import { cleanPrice } from '@/utils/functions/functions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductPurchaseSection from '@/components/Product/ProductPurchaseSection';
import ProductCard from '@/components/Product/ProductCard.component';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const data = await wpFetch<{ product: any }>(
      GET_PRODUCT_BY_SLUG,
      { slug }
    );

    if (!data.product) notFound();

    const { product } = data;

    // Clean prices
    const displayPrice = cleanPrice(product.price);
    const displayRegularPrice = cleanPrice(product.regularPrice);
    const displaySalePrice = cleanPrice(product.salePrice);

    return (
      <div className="bg-obsidian min-h-screen font-outfit text-text">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-32">
          
          {/* Breadcrumbs - Minimalist */}
          <nav className="mb-12 text-[10px] uppercase tracking-[0.2em] text-text-muted flex items-center gap-3 font-accent">
            <a href="/" className="hover:text-accent-gold transition-colors">Startseite</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href="/products" className="hover:text-accent-gold transition-colors">Kollektion</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-accent-gold font-bold">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            
            {/* Left Column: Visuals (Sticky) */}
            <div className="lg:w-[55%] lg:sticky lg:top-48 h-fit">
              <div className="relative aspect-[4/5] bg-obsidian-alt group overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {product.image?.sourceUrl && (
                  <Image
                    src={product.image.sourceUrl}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-[2s] group-hover:scale-110"
                  />
                )}
                {product.onSale && (
                  <div className="absolute top-6 left-6 z-20 bg-error text-white text-[10px] font-accent font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-md">
                    Angebot
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Information */}
            <div className="lg:w-[45%] pt-4">
              <div className="max-w-xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-4 font-accent">Premium Naturprodukte</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-text leading-tight mb-8">
                  {product.name}
                </h1>

                {/* Purchase Area - Glassmorphism Card */}
                <ProductPurchaseSection 
                  productId={product.databaseId} 
                  variations={product.variations}
                  defaultPrice={product.price}
                  stockStatus={product.stockStatus}
                />

                {/* Story / Description */}
                <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <h2 className="text-xs font-bold font-accent uppercase tracking-[0.3em] text-text">Die Essenz</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  
                  <div 
                    className="prose prose-stone max-w-none text-text-muted leading-[2] font-sans text-base
                    prose-p:mb-8 prose-strong:text-text prose-strong:font-bold
                    [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:my-16 [&_iframe]:shadow-xl"
                    // nosemgrep
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                {/* Meta Info */}
                <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-text-muted font-accent">
                  <div className="flex gap-8">
                    <span>SKU: {product.sku || 'N/A'}</span>
                    <span>Herkunft: Europa</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-8 h-[1px] bg-border" />
                    <span>Reine Qualität</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Related Products */}
          {product.related?.nodes?.length > 0 && (
            <div className="mt-32 pt-20 border-t border-border">
              <h2 className="text-3xl font-serif text-text mb-12 text-center">
                Dazu passend
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.related.nodes.map((relatedProduct: any) => (
                  <ProductCard
                    key={relatedProduct.databaseId}
                    databaseId={relatedProduct.databaseId}
                    name={relatedProduct.name}
                    price={cleanPrice(relatedProduct.price)}
                    regularPrice={cleanPrice(relatedProduct.regularPrice)}
                    salePrice={cleanPrice(relatedProduct.salePrice)}
                    onSale={relatedProduct.onSale}
                    slug={relatedProduct.slug}
                    image={relatedProduct.image}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="min-h-screen flex items-center justify-center p-12 text-center bg-surface">
        <div className="max-w-md">
          <h1 className="text-4xl font-light text-text mb-4">Connection Lost</h1>
          <p className="text-text-muted mb-8 font-light">We encountered a problem while retrieving the product details. Please try again in a moment.</p>
          <a href="/" className="inline-block py-4 px-8 border border-text text-[10px] uppercase tracking-widest hover:bg-text hover:text-white transition-all">Return to Home</a>
        </div>
      </div>
    );
  }
}
