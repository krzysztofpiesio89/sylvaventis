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
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-kn-forest font-bold mb-6">Ausgewählte Kollektion</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-kn-bark">
              Botanische Waldschätze für den <span className="italic font-bold text-kn-moss">bewussten</span> Geist.
            </h3>
          </div>
          <Link href="/products" className="text-[10px] uppercase tracking-[0.3em] font-accent font-bold pb-2 border-b border-kn-forest text-kn-forest hover:border-kn-moss hover:text-kn-moss transition-colors">
            Alle Produkte ansehen
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
                    className="object-cover object-center transition-all duration-700 group-hover:scale-110"
                  />
                )}
                {product.onSale && (
                  <div className="absolute top-6 right-6 z-10 bg-error text-white px-4 py-2 text-[10px] font-accent font-bold uppercase tracking-widest rounded-sm shadow-md">
                    Angebot
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-serif mb-2 group-hover:text-accent transition-colors">{product.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-accent">Naturprodukte</p>
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
      <section className="py-40 bg-kn-cream-warm relative overflow-hidden">
        <div className="absolute -left-20 top-0 text-[15rem] font-bold text-kn-sand/20 whitespace-nowrap select-none font-serif">
          SYLVAVENTIS SYLVAVENTIS
        </div>
        <div className="container-wide relative z-10 px-6 lg:px-12 max-w-[1440px] mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight text-kn-bark">
              Die Brücke zwischen <span className="text-kn-forest italic">altem Wissen</span> und modernen Qualitätsstandards.
            </h2>
            <p className="text-kn-stone text-lg font-sans leading-relaxed mb-12">
              Jedes Exemplar wird in den unberührten Wäldern handverlesen. 
              Unser Engagement für Qualität stellt sicher, dass Du nur die 
              edelsten und reinsten Produkte erhältst, verarbeitet mit 
              größter Sorgfalt im Einklang mit der Natur.
            </p>
            <Link href="/about" className="bg-kn-forest text-kn-cream px-8 py-4 font-accent tracking-widest text-[10px] font-bold uppercase transition-all duration-300 hover:bg-kn-moss hover:scale-105 shadow-md inline-block">
              Unser Prozess
            </Link>
          </div>
        </div>
      </section>

      <PartnersApp />
    </div>
  );
}
