import { wpFetch } from '@/lib/wordpress';
import { FETCH_ALL_PRODUCTS_QUERY } from '@/lib/queries';
import { cleanPrice } from '@/utils/functions/functions';
import HeroApp from '@/components/Index/HeroApp';
import PartnersApp from '@/components/Index/PartnersApp';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
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
    <div className="min-h-screen bg-obsidian">
      <HeroApp />
      
      {/* Featured Collection Section */}
      <section className="py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-6">Curated Experience</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Selected specimens for the <span className="italic font-bold">enlightened</span> mind.
            </h3>
          </div>
          <Link href="/products" className="text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b border-accent hover:border-white transition-colors">
            View All Products
          </Link>
        </div>

        {/* Modern Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {products.map((product) => (
            <Link key={product.databaseId} href={`/product/${product.slug}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-obsidian-alt shadow-2xl">
                {product.image?.sourceUrl && (
                  <Image
                    src={product.image.sourceUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                )}
                {product.onSale && (
                  <div className="absolute top-6 right-6 z-10 glass px-4 py-2 text-[8px] font-bold uppercase tracking-widest">
                    Exceptional Value
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-light mb-2 group-hover:text-accent transition-colors">{product.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted">Amanita Muscaria</p>
                </div>
                <div className="text-right">
                  {product.onSale ? (
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">{product.salePrice}</span>
                      <span className="text-[10px] text-text-muted line-through">{product.regularPrice}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">{product.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-obsidian-alt relative overflow-hidden">
        <div className="absolute -left-20 top-0 text-[15rem] font-bold text-white/5 whitespace-nowrap select-none">
          AMANITA SALE AMANITA SALE
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-light mb-12 leading-tight">
              We bridge the gap between <span className="text-accent italic">ancient wisdom</span> and modern biological standards.
            </h2>
            <p className="text-text-muted text-lg font-light leading-relaxed mb-12">
              Every specimen is hand-selected from the pristine forests of Estonia and Northern Europe. 
              Our commitment to quality ensures that you receive only the most potent and pure products, 
              processed with scientific precision.
            </p>
            <Link href="/about" className="btn-premium inline-block">
              Our Process
            </Link>
          </div>
        </div>
      </section>

      <PartnersApp />
    </div>
  );
}
