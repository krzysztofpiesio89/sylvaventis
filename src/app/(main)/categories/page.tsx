import { wpFetch } from '@/lib/wordpress';
import { FETCH_ALL_CATEGORIES_QUERY } from '@/lib/queries';
import Categories from '@/components/Category/Categories.component';

export const metadata = {
  title: 'Kategorien | Sylvaventis',
  description: 'Entdecke unsere vielfältigen Kategorien an Naturprodukten, Räucherwerk und Handwerkskunst.',
};

export default async function CategoriesPage() {
  let categories: any[] = [];
  try {
    const data = await wpFetch<{ productCategories: { nodes: any[] } }>(
      FETCH_ALL_CATEGORIES_QUERY,
      {},
      { tags: ['categories'] }
    );
    categories = data?.productCategories?.nodes || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <div className="min-h-screen bg-obsidian text-text">
      {/* Header Spacer */}
      <div className="h-32 lg:h-44" />

      <main className="container-wide pb-32">
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block animate-fade-in font-accent">
            Produkt-Kategorien
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground font-semibold mb-4">
            Kategorien Übersicht
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base font-sans">
            Wähle eine Kategorie, um unsere erlesenen Naturprodukte, ätherischen Öle, Räucherstoffe und Kunsthandwerk zu entdecken.
          </p>
          <div className="w-20 h-px bg-accent/40 mt-8 mb-4 mx-auto md:mx-0" />
        </div>

        {categories.length > 0 ? (
          <Categories categories={categories} />
        ) : (
          <div className="py-20 text-center text-muted-foreground font-sans">
            Keine Kategorien gefunden.
          </div>
        )}
      </main>
    </div>
  );
}
