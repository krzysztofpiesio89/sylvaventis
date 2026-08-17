export interface CategoryStockImage {
  name: string;
  slug: string;
  stockUrl: string;
  localPath: string;
  description: string;
}

export const CATEGORY_STOCK_IMAGES: Record<string, CategoryStockImage> = {
  'uncategorized': {
    name: 'Uncategorized',
    slug: 'uncategorized',
    stockUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/uncategorized.jpg',
    description: 'Brak kategorii / Ogólne produkty sklepu',
  },
  'apparel-accessories': {
    name: 'Apparel & Accessories',
    slug: 'apparel-accessories',
    stockUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/apparel-accessories.jpg',
    description: 'Odzież i akcesoria modowe',
  },
  'jewelry': {
    name: 'Jewelry',
    slug: 'jewelry',
    stockUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/jewelry.jpg',
    description: 'Elegancja biżuteria luksusowa',
  },
  'bracelets': {
    name: 'Bracelets',
    slug: 'bracelets',
    stockUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/bracelets.jpg',
    description: 'Stylowe bransoletki i bransolety',
  },
  'charms-pendants': {
    name: 'Charms & Pendants',
    slug: 'charms-pendants',
    stockUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/charms-pendants.jpg',
    description: 'Zawieszki, charmsy i wisiorki',
  },
  'earrings': {
    name: 'Earrings',
    slug: 'earrings',
    stockUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/earrings.jpg',
    description: 'Eleganckie kolczyki i wkrętki',
  },
  'necklaces': {
    name: 'Necklaces',
    slug: 'necklaces',
    stockUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/necklaces.jpg',
    description: 'Naszyjniki, łańcuszki i koliery',
  },
  'arts-entertainment': {
    name: 'Arts & Entertainment',
    slug: 'arts-entertainment',
    stockUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/arts-entertainment.jpg',
    description: 'Sztuka i rozrywka',
  },
  'hobbies-creative-arts': {
    name: 'Hobbies & Creative Arts',
    slug: 'hobbies-creative-arts',
    stockUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/hobbies-creative-arts.jpg',
    description: 'Hobby i sztuka kreatywna',
  },
  'arts-crafts': {
    name: 'Arts & Crafts',
    slug: 'arts-crafts',
    stockUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/arts-crafts.jpg',
    description: 'Rękodzieło i rzemiosło artystyczne',
  },
  'art-crafting-materials': {
    name: 'Art & Crafting Materials',
    slug: 'art-crafting-materials',
    stockUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/art-crafting-materials.jpg',
    description: 'Materiały do twórczości artystycznej',
  },
  'craft-paint-ink-glaze': {
    name: 'Craft Paint, Ink & Glaze',
    slug: 'craft-paint-ink-glaze',
    stockUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/craft-paint-ink-glaze.jpg',
    description: 'Farby, tusze i szkliwa rzemieślnicze',
  },
  'craft-dyes': {
    name: 'Craft Dyes',
    slug: 'craft-dyes',
    stockUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/craft-dyes.jpg',
    description: 'Barwniki i pigmenty do tkanin oraz rzemiosła',
  },
  'embellishments-trims': {
    name: 'Embellishments & Trims',
    slug: 'embellishments-trims',
    stockUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/embellishments-trims.jpg',
    description: 'Ozdoby, tasiemki i wykończenia',
  },
  'beads': {
    name: 'Beads',
    slug: 'beads',
    stockUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/beads.jpg',
    description: 'Koraliki i paciorki biżuteryjne',
  },
  'loose-stones': {
    name: 'Loose Stones',
    slug: 'loose-stones',
    stockUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/loose-stones.jpg',
    description: 'Kamienie szlachetne i półszlachetne',
  },
  'olfactory-arts-materials': {
    name: 'Olfactory Arts Materials',
    slug: 'olfactory-arts-materials',
    stockUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/olfactory-arts-materials.jpg',
    description: 'Materiały do sztuki zapachowej i aromaterapii',
  },
  'perfumery-ingredients': {
    name: 'Perfumery Ingredients',
    slug: 'perfumery-ingredients',
    stockUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/perfumery-ingredients.jpg',
    description: 'Składniki perfumeryjne i ekstrakty',
  },
  'fragrance-ingredients': {
    name: 'Fragrance Ingredients',
    slug: 'fragrance-ingredients',
    stockUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/fragrance-ingredients.jpg',
    description: 'Naturalne esencje i kompozycje zapachowe',
  },
  'musical-instruments': {
    name: 'Musical Instruments',
    slug: 'musical-instruments',
    stockUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    localPath: '/images/categories/musical-instruments.jpg',
    description: 'Instrumenty muzyczne i akcesoria',
  },
};

export const getCategoryStockImage = (slug: string): string => {
  return (
    CATEGORY_STOCK_IMAGES[slug]?.localPath ||
    CATEGORY_STOCK_IMAGES[slug]?.stockUrl ||
    '/images/categories/uncategorized.jpg'
  );
};
