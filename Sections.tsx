import { useEffect, useState } from 'react';
import { Heart, Minus, Plus, ShoppingBag, Star, X, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatINR } from '@/lib/products';
import { useShop } from '@/lib/shop';
import { useNav } from '@/lib/nav';
import RippleButton from './RippleButton';

export default function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, toggleWishlist, isInWishlist, trackView } = useShop();
  const { navigate } = useNav();
  const [activeImg, setActiveImg] = useState(0);
  const [colour, setColour] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'details' | 'fabric' | 'care' | 'reviews'>('details');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImg(0);
      setColour(0);
      setSize(null);
      setQty(1);
      setTab('details');
      setError('');
      trackView(product.id);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product, trackView]);

  if (!product) return null;

  const wished = isInWishlist(product.id);

  const handleAdd = (buyNow = false) => {
    if (!size) {
      setError('Please select a size');
      setTab('details');
      return;
    }
    setError('');
    addToCart(product, size, product.colours[colour].name, qty);
    if (buyNow) {
      onClose();
      navigate('checkout');
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-md animate-fade-in" onClick={onClose} />

      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-ivory shadow-luxury-lg animate-fade-up sm:rounded-[2rem]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink backdrop-blur-md transition-colors hover:bg-white"
        >
          <X size={20} />
        </button>

        <div className="hide-scrollbar flex flex-col overflow-y-auto md:grid md:grid-cols-2">
          {/* gallery */}
          <div className="bg-ivory-200 p-4 md:p-8">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={product.gallery[activeImg]}
                alt={product.name}
                className="aspect-[3/4] w-full object-cover transition-all duration-500"
              />
            </div>
            <div className="mt-4 flex gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden rounded-xl border-2 transition-all ${
                    activeImg === i ? 'border-emerald' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={g} alt="" className="h-20 w-16 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col p-6 md:p-10">
            <p className="text-[0.65rem] uppercase tracking-ultra-wide text-champagne-600">
              {product.category}
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">
              {product.name}
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i < Math.round(product.rating) ? 'fill-champagne-400 text-champagne-400' : 'text-ink/15'}
                  />
                ))}
              </div>
              <span className="text-xs text-stone-500">
                {product.rating} · {product.reviewCount} reviews
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-ink">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-stone-600">
              {product.description}
            </p>

            {/* colours */}
            <div className="mt-6">
              <p className="text-[0.65rem] uppercase tracking-wide-2 text-stone-500">
                Colour · <span className="text-ink">{product.colours[colour].name}</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                {product.colours.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColour(i)}
                    aria-label={c.name}
                    className={`h-7 w-7 rounded-full border transition-all ${
                      colour === i ? 'ring-2 ring-champagne ring-offset-2 ring-offset-ivory' : 'border-ink/15'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* sizes */}
            <div className="mt-5">
              <p className="text-[0.65rem] uppercase tracking-wide-2 text-stone-500">Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError('');
                    }}
                    className={`min-w-[2.75rem] rounded-full border px-3 py-2 text-[0.7rem] uppercase tracking-wide-2 transition-all ${
                      size === s
                        ? 'border-emerald bg-emerald text-ivory'
                        : 'border-ink/15 text-stone-600 hover:border-emerald'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="mt-2 text-xs text-ruby">{error}</p>}
            </div>

            {/* qty + actions */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="text-stone-600 hover:text-emerald">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-sm text-ink">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="text-stone-600 hover:text-emerald">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                  wished ? 'border-ruby bg-ruby text-ivory' : 'border-ink/15 text-ink hover:border-ruby'
                }`}
              >
                <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <RippleButton variant="fill" className="flex-1" onClick={() => handleAdd(false)}>
                <ShoppingBag size={16} /> Add to Bag
              </RippleButton>
              <RippleButton variant="gold" className="flex-1" onClick={() => handleAdd(true)}>
                Buy Now
              </RippleButton>
            </div>

            {/* perks */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] text-stone-500">
              <span className="flex items-center gap-1.5"><Truck size={14} className="text-emerald" /> Complimentary delivery</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald" /> Authenticity guaranteed</span>
              <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-champagne-500" /> Gift wrapped</span>
            </div>

            {/* tabs */}
            <div className="mt-7 border-t border-ink/10 pt-5">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {(['details', 'fabric', 'care', 'reviews'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-[0.7rem] uppercase tracking-wide-2 transition-colors ${
                      tab === t ? 'text-emerald' : 'text-stone-500 hover:text-ink'
                    }`}
                  >
                    {t === 'details' ? 'Details' : t === 'fabric' ? 'Fabric' : t === 'care' ? 'Care' : `Reviews (${product.reviews.length})`}
                  </button>
                ))}
              </div>
              <div className="mt-4 min-h-[7rem] text-sm leading-relaxed text-stone-600">
                {tab === 'details' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    <p className="text-stone-500">Collection: {product.collection}</p>
                    <p className="text-stone-500">Occasion: {product.occasion}</p>
                  </div>
                )}
                {tab === 'fabric' && <p>{product.fabricDetails}</p>}
                {tab === 'care' && (
                  <ul className="space-y-2">
                    {product.care.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-champagne-500" /> {c}
                      </li>
                    ))}
                  </ul>
                )}
                {tab === 'reviews' && (
                  <div className="space-y-5">
                    {product.reviews.map((rv, i) => (
                      <div key={i} className="rounded-2xl bg-ivory-100 p-4">
                        <div className="flex items-center gap-3">
                          <img src={rv.avatar} alt={rv.name} className="h-10 w-10 rounded-full object-cover" />
                          <div>
                            <p className="font-serif text-base text-ink">{rv.name}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <Star key={s} size={11} className={s < rv.rating ? 'fill-champagne-400 text-champagne-400' : 'text-ink/15'} />
                              ))}
                            </div>
                          </div>
                          <span className="ml-auto text-[0.65rem] text-stone-400">{rv.date}</span>
                        </div>
                        <p className="mt-3 text-sm text-stone-600">{rv.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
