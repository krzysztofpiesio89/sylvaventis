import Link from 'next/link';
import Image from 'next/image';
import { getCategoryRealImage } from '@/utils/categoryRealImages';

interface CategoryNode {
  id?: string;
  databaseId?: number;
  name: string;
  slug: string;
  count?: number;
  image?: {
    sourceUrl?: string;
  };
}

interface ICategoriesProps {
  categories: CategoryNode[];
}

interface MainPillar {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  defaultImageSlug: string;
}

const MAIN_PILLARS: MainPillar[] = [
  {
    slug: 'apparel-accessories',
    title: 'Apparel & Accessories',
    subtitle: 'Moda & Schmuck',
    description: 'Edler Schmuck, handgefertigte Amulette, Armbänder, Kolczyki i naszyjniki.',
    defaultImageSlug: 'apparel-accessories',
  },
  {
    slug: 'jewelry',
    title: 'Jewelry & Accessories',
    subtitle: 'Schmuck-Kollektion',
    description: 'Feine Armbänder, Amulette, Kolczyki, Anhänger und wertvolle Steine.',
    defaultImageSlug: 'jewelry',
  },
  {
    slug: 'arts-entertainment',
    title: 'Arts & Entertainment',
    subtitle: 'Sztuka & Muzyka',
    description: 'Kreatives Kunsthandwerk, Musikinstrumente, Farben und klangliche Kunstwerke.',
    defaultImageSlug: 'arts-entertainment',
  },
  {
    slug: 'olfactory-arts-materials',
    title: 'Olfactory Arts Materials',
    subtitle: 'Aromatherapie & Duftstoffe',
    description: 'Erlesenes Räucherwerk, ätherische Öle, Harze, Parfum-Zutaten und Naturkosmetik.',
    defaultImageSlug: 'olfactory-arts-materials',
  },
];

export default function Categories({ categories }: ICategoriesProps) {
  // Find category node or fallback
  const getPillarData = (pillar: MainPillar) => {
    const matchedCategory = categories.find(
      (c) => c.slug.toLowerCase() === pillar.slug.toLowerCase() || c.name.toLowerCase().includes(pillar.slug)
    );
    const imageUrl =
      matchedCategory?.image?.sourceUrl || getCategoryRealImage(pillar.slug, pillar.title);
    const count = matchedCategory?.count;

    return {
      slug: matchedCategory?.slug || pillar.slug,
      name: matchedCategory?.name || pillar.title,
      imageUrl,
      count,
    };
  };

  return (
    <div className="w-full space-y-12">
      {/* 4 Main Root Category Pillars Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {MAIN_PILLARS.map((pillar) => {
          const data = getPillarData(pillar);
          return (
            <Link
              key={pillar.slug}
              href={`/kategori/${encodeURIComponent(data.slug)}`}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-lg hover:shadow-2xl hover:border-amber-400/50 transition-all duration-500 flex flex-col h-80 md:h-96"
            >
              <Image
                src={data.imageUrl}
                alt={pillar.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* High contrast gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />

              {typeof data.count === 'number' && data.count > 0 && (
                <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-black/80 text-amber-300 backdrop-blur-md border border-amber-400/30 shadow-md">
                  {data.count} {data.count === 1 ? 'Produkt' : 'Produkte'}
                </span>
              )}

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] uppercase tracking-[0.35em] text-amber-400 font-bold block mb-2 font-accent drop-shadow">
                  {pillar.subtitle}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors drop-shadow-md">
                  {pillar.title}
                </h2>
                <p className="text-xs md:text-sm text-stone-200 mt-2 line-clamp-2 max-w-lg font-sans opacity-90 drop-shadow-sm">
                  {pillar.description}
                </p>
                <div className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1.5 transition-all">
                  Unterkategorien erkunden →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
