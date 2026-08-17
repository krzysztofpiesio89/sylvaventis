import Link from 'next/link';
import Image from 'next/image';
import { paddedPrice } from '@/utils/functions/functions';

interface ProductCardProps {
  databaseId: number;
  name: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
  onSale: boolean;
  slug: string;
  stockStatus?: string;
  image?: {
    sourceUrl?: string;
  };
}

const ProductCard = ({
  databaseId,
  name,
  price,
  regularPrice,
  salePrice,
  onSale,
  slug,
  stockStatus,
  image,
}: ProductCardProps) => {
  // Add padding/empty character after currency symbol
  const formattedPrice = price ? paddedPrice(price, '€') : price;
  const formattedRegularPrice = regularPrice ? paddedPrice(regularPrice, '€') : regularPrice;
  const formattedSalePrice = salePrice ? paddedPrice(salePrice, '€') : salePrice;

  const isOutOfStock = stockStatus === 'OUT_OF_STOCK';

  return (
    <div className="group bg-surface-card rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
      <div className="aspect-square overflow-hidden bg-obsidian-alt relative">
        <Link href={`/product/${slug}`} className="relative block w-full h-full">
          {image?.sourceUrl ? (
            <Image
              src={image.sourceUrl}
              alt={name}
              fill
              className={`w-full h-full object-cover object-center transition duration-700 group-hover:scale-105 ${
                isOutOfStock ? 'grayscale-[35%] opacity-85' : ''
              }`}
              priority={databaseId === 1}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="h-full w-full bg-obsidian-alt flex items-center justify-center">
              <span className="text-text-muted">Kein Bild</span>
            </div>
          )}

          {/* Badges Container */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            {isOutOfStock ? (
              <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest bg-stone-950/90 text-red-400 border border-red-500/30 rounded-full backdrop-blur-md shadow-md">
                ● Ausverkauft
              </span>
            ) : (
              <span />
            )}

            {onSale && (
              <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-400 text-stone-950 rounded-full shadow-md">
                Angebot
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/product/${slug}`} className="flex-grow">
          <h4 className="text-lg font-serif font-semibold text-center cursor-pointer group-hover:text-amber-400 transition-colors duration-200 mb-4 text-stone-900 dark:text-stone-100 line-clamp-2">
            {name}
          </h4>
        </Link>
        
        <div className="mt-auto text-center mb-6">
          {onSale ? (
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl font-mono font-bold text-red-500">{formattedSalePrice}</span>
              <span className="text-sm font-mono text-stone-400 line-through">{formattedRegularPrice}</span>
            </div>
          ) : (
            <span className="text-xl font-mono font-bold text-stone-900 dark:text-stone-100">{formattedPrice}</span>
          )}
        </div>
        
        <Link href={`/product/${slug}`} className="w-full mt-auto block">
          <button
            className={`w-full py-3 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-sm ${
              isOutOfStock
                ? 'bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-700'
                : 'bg-amber-400 text-stone-950 hover:bg-amber-300'
            }`}
          >
            {isOutOfStock ? 'Ausverkauft (Details)' : 'Zum Produkt'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
