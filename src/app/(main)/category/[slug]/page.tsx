import { wpFetch } from '@/lib/wordpress';
import { GET_PRODUCTS_BY_CATEGORY_SLUG } from '@/lib/queries';
import { cleanPrice } from '@/utils/functions/functions';
import ProductListApp from '@/components/Product/ProductListApp';
import { getCategoryRealImage } from '@/utils/categoryRealImages';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  return {
    title: `${decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1)} | Sylvaventis`,
    description: `Produkte in der Kategorie ${decodedSlug} bei Sylvaventis.`,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let categoryName = decodedSlug;
  let categoryDescription = '';
  let subcategories: any[] = [];
  let products: any[] = [];

  try {
    const data = await wpFetch<{
      productCategory: {
        name: string;
        description: string;
        children?: { nodes: any[] };
        products?: { nodes: any[] };
      };
    }>(
      GET_PRODUCTS_BY_CATEGORY_SLUG,
      { slug: decodedSlug },
      { tags: ['products', 'categories'] }
    );

    if (data?.productCategory) {
      categoryName = data.productCategory.name || decodedSlug;
      categoryDescription = data.productCategory.description || '';
      subcategories = data.productCategory.children?.nodes || [];
      products = (data.productCategory.products?.nodes || []).map((product) => ({
        ...product,
        price: cleanPrice(product.price),
        regularPrice: cleanPrice(product.regularPrice),
        salePrice: cleanPrice(product.salePrice),
      }));
    }
  } catch (error) {
    console.error(`Error fetching products for category ${decodedSlug}:`, error);
  }

  return (
    <div className="min-h-screen bg-obsidian text-text">
      {/* Header Spacer */}
      <div className="h-32 lg:h-44" />

      <main className="container-wide pb-32">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center text-xs uppercase tracking-widest text-accent hover:underline mb-6 font-mono"
          >
            ← Alle Kategorien
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground font-semibold mb-4">
            {categoryName}
          </h1>
          {categoryDescription && (
            <div
              className="text-muted-foreground text-sm max-w-2xl font-sans"
              dangerouslySetInnerHTML={{ __html: categoryDescription }}
            />
          )}
          <div className="w-20 h-px bg-accent/40 mt-6" />
        </div>

        {/* Subcategories Tree Section (If Child Categories exist) */}
        {subcategories.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-6 font-accent">
              Unterkategorien in {categoryName}
            </h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {subcategories.map((sub) => {
                const imageUrl =
                  sub.image?.sourceUrl || getCategoryRealImage(sub.slug, sub.name);
                return (
                  <Link
                    key={sub.slug}
                    href={`/kategori/${encodeURIComponent(sub.slug)}`}
                    className="group relative overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-sm hover:shadow-2xl hover:border-amber-400/60 transition-all duration-500 flex flex-col"
                  >
                    <div className="relative w-full h-44 overflow-hidden bg-stone-900">
                      <Image
                        src={imageUrl}
                        alt={sub.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity" />

                      {typeof sub.count === 'number' && sub.count > 0 && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-widest bg-black/80 text-amber-300 backdrop-blur-md border border-amber-400/30 shadow-md">
                          {sub.count} {sub.count === 1 ? 'Produkt' : 'Produkte'}
                        </span>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-lg font-serif font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors drop-shadow-md">
                          {sub.name}
                        </p>
                        <p className="text-[10px] text-amber-400 font-mono uppercase tracking-widest mt-1 opacity-90">
                          {sub.slug}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Product List Section */}
        {products.length > 0 ? (
          <ProductListApp products={products} title={`Produkte in ${categoryName}`} />
        ) : (
          subcategories.length === 0 && (
            <div className="py-20 text-center text-muted-foreground font-sans">
              In dieser Kategorie wurden noch keine Produkte gefunden.
            </div>
          )
        )}
      </main>
    </div>
  );
}
