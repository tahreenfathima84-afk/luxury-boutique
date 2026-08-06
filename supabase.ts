import { useRef, useState } from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatINR } from '@/lib/products';
import { useShop } from '@/lib/shop';
import { useNav } from '@/lib/nav';

export default function ProductCard({
  product,
  onQuickView,
  index = 0,
}: {
  product: Product;
  onQuickView: (p: Product) => void;
  index?: number;
}) {
  const { toggleWishlist, isInWishlist, addToCart, trackView } = useShop();
  const { navigate } = useNav();
  const imgRef = useRef<HTMLDivElement>(null);
  const [activeColour, setActiveColour] = useState(0);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const wished = isInWishlist(product.id);

  const onMove = (e: React.MouseEvent) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `scale(1.08) translate(${x * 12}px, ${y * 12}px)`;
  };
  const onLeave = () => {
    const el = imgRef.current;
    if (el) el.style.transform = 'scale(1) translate(0,0)';
  };

  const badge = product.limitedEdition
    ? 'Limited Edition'
    : product.newArrival
    ? 'New Arrival'
    : product.bestSeller
    ? 'Best Seller'
    : null;

  return (
    <article
      className="reveal group flex flex-col"
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-ivory-200">
        <div
          ref={imgRef}
          className="parallax-img aspect-[3/4] w-full transition-transform duration-700 ease-luxury"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        {/* badge */}
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[0.6rem] uppercase tracking-wide-2 text-champagne-300 backdrop-blur-sm">
            {badge}
          </span>
        )}

        {/* wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
            wished ? 'bg-ruby text-ivory' : 'bg-white/70 text-ink hover:bg-white'
          }`}
        >
          <Heart size={17} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-6 flex-col gap-2 p-4 opacity-0 transition-all duration-500 ease-luxury group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={() => onQuickView(product)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/90 py-3 text-[0.65rem] uppercase tracking-wide-2 text-ink backdrop-blur-md transition-colors hover:bg-white"
            >
              <Eye size={15} /> Quick View
            </button>
            <button
              onClick={() => {
                if (!activeSize) {
                  onQuickView(product);
                  return;
                }
                addToCart(product, activeSize, product.colours[activeColour].name);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald py-3 text-[0.65rem] uppercase tracking-wide-2 text-ivory transition-colors hover:bg-emerald-600"
            >
              <ShoppingBag size={15} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* info */}
      <div className="mt-5 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-[0.65rem] uppercase tracking-wide-2 text-champagne-600">
            {product.category}
          </p>
          <div className="flex items-center gap-1 text-stone-500">
            <Star size={13} className="fill-champagne-400 text-champagne-400" />
            <span className="text-xs">{product.rating}</span>
            <span className="text-[0.65rem]">({product.reviewCount})</span>
          </div>
        </div>

        <button
          onClick={() => {
            trackView(product.id);
            navigate('shop', product.id);
          }}
          className="mt-1 text-left font-serif text-xl leading-tight text-ink transition-colors hover:text-emerald"
        >
          {product.name}
        </button>

        {/* colours */}
        <div className="mt-3 flex items-center gap-1.5">
          {product.colours.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActiveColour(i)}
              aria-label={c.name}
              className={`h-5 w-5 rounded-full border transition-all ${
                activeColour === i ? 'ring-2 ring-champagne ring-offset-2 ring-offset-ivory' : 'border-ink/15'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        {/* sizes */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSize(s)}
              className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-wide-2 transition-all ${
                activeSize === s
                  ? 'border-emerald bg-emerald text-ivory'
                  : 'border-ink/15 text-stone-600 hover:border-emerald'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-serif text-xl text-ink">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-stone-400 line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
