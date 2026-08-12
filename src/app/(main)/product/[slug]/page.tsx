import { wpFetch } from '@/lib/wordpress';
import { GET_PRODUCT_BY_SLUG } from '@/lib/queries';
import { cleanPrice } from '@/utils/functions/functions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductPurchaseSection from '@/components/Product/ProductPurchaseSection';

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
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-56 pb-32">
          
          {/* Breadcrumbs - Minimalist */}
          <nav className="mb-12 text-[10px] uppercase tracking-[0.2em] text-text-muted flex items-center gap-3">
            <a href="/" className="hover:text-accent-gold transition-colors">Home</a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a href="/products" className="hover:text-accent-gold transition-colors">Collection</a>
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
                    className="object-cover object-center transition-transform duration-[2s] group-hover:scale-110"
                  />
                )}
                {product.onSale && (
                  <div className="absolute top-6 left-6 z-20 bg-error text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2">
                    Sale
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Information */}
            <div className="lg:w-[45%] pt-4">
              <div className="max-w-xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-4">Premium Selection</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight mb-8">
                  {product.name}
                </h1>

                {/* Purchase Area - Glassmorphism Card */}
                <ProductPurchaseSection 
                  productId={product.databaseId} 
                  variations={product.variations}
                  defaultPrice={product.price}
                />

                {/* Story / Description */}
                <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">The Essence</h2>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>
                  
                  <div 
                    className="prose prose-invert prose-stone max-w-none text-text-muted leading-[2] font-light
                    prose-p:mb-8 prose-strong:text-white prose-strong:font-bold
                    [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-none [&_iframe]:my-16 [&_iframe]:shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    // nosemgrep
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                {/* Meta Info */}
                <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-text-light">
                  <div className="flex gap-8">
                    <span>SKU: AM-2026-WL</span>
                    <span>Origin: Europe</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-8 h-[1px] bg-border" />
                    <span>Pure Quality</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
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
