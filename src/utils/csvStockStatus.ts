import { Product } from '@/types/product';

// Slugs of the 60 DRAFT (out of stock) products from D:\download\products_export_1.csv
const DRAFT_SLUGS = new Set([
  'redwood-pterocarpus-soyauxii-taub',
  'sandelholz-rot-peru-santalum-paniculatum-kopie',
  'schwarzkiefer-harz-pinus-nigra',
  'mapacho-rolle-peru',
  'mapacho-rolle',
  'aztekensalbei-salvia-divinorum-lebendpflanze-gross',
  'alpengummi-der-naturliche-harz-kaugummi',
  'shipibo-schamanen-rassel',
  'rassel-shipibo-ornamente',
  'professionelle-feinwaage-kern-1000x1g',
  'sandelholz-raucherstabchen-1',
  'honeysuckle-geissblatt-raucherstabchen',
  'raucherkuche',
  'sandelholz-extra-bio-2ml',
  'teesamenol-kaltgepresst-1',
  'aroma-diffuser-ella-fur-atherische-ole',
  'chlordioxid-wasseraufbereitung-2-komponenten-losung',
  'aromalampe-sonne',
  'himalaya-krauter-raucherstabchen',
  'white-sage-fresh-1-ml',
  'pfefferminze-fine-bio-5-ml',
  'palo-santo-super-2-ml',
  'palmarosa-bio-10-ml',
  'mandarine-rot-bio-10-ml',
  'lavandin-super-bio',
  'ingwer-3-ml',
  'gewurznelke-super-bio-3-ml',
  'elemi-10-ml',
  'basilikum-tulsi-nord-3-ml',
  'angelicawurzel-fine-1-ml',
  'propolis-tropfen-sinapura-30-ml',
  'natural-incense-company-vanilla-spice-raucherstabchen',
  'natural-incense-company-halmaddi-styrax-heaven-tree-raucherstabchen',
  'natural-incense-company-old-patchouli-raucherstabchen',
  'arganol-bio',
  'african-dreamherb-extrakt-50x-3g',
  'dmae-dimethylaminoethanol-130mg',
  'sakae-naa-combretum-quadrangulare-25x-extrakt-5-gramm',
  'raucherteller-fur-kegel-und-stabchen-lebensbaum',
  'geiles-ziegenkraut-extrakt',
  'digitale-taschenwaage-feinwaage-krauterwaage',
  'ptychopetalum-olacoides-muira-puama-4x-extrakt-3g',
  'paullinia-cupana-guarana-3x-extrakt-10g',
  'l-tryptophan-vitamin-b6-60-kapseln',
  'griffonia-simplicifolia-extrakt-naturliches-5-htp-60-kapseln',
  'leonotis-leonurus-extrakt-mix-jo-burg-high-3-gramm',
  'soulbottles-3er-pack-gummidichtungen-turkis-violett-weiss',
  'soulbottles-trinkflasche-glas-1l',
  'soulbottles-trinkflasche-glas-0-6l',
  'hanfol-hanfsamenol-bio',
  'propolis-tropfen-lenz-20ml',
  'aroma-diffuser-duftoase-1',
  'swak-zahnburste-eichenholz',
  'khoisan-gourmet-meersalz-fein',
  'krauter-mundol-100ml',
  'anti-schuppen-krauter-shampoo-500ml',
  'lippenbalsam-hydrophil',
  'raucherschale-rom',
  'teelichtglas',
  'schwarzkiefer-scharrharz-pinus-nigra',
]);

/**
 * Enforces exact stock status from products_export_1.csv:
 * If a product's slug is in DRAFT_SLUGS -> OUT_OF_STOCK
 * Otherwise -> IN_STOCK
 */
export function applyCsvStockStatus<T extends Product>(products: T[]): T[] {
  if (!products || !Array.isArray(products)) return [];

  return products.map((product) => {
    const slug = product.slug?.toLowerCase().trim();
    const isDraft = DRAFT_SLUGS.has(slug);
    const stockStatus = isDraft ? 'OUT_OF_STOCK' : 'IN_STOCK';

    return {
      ...product,
      stockStatus,
    };
  });
}
