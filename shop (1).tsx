import { Heart, X } from 'lucide-react';
import { useShop } from '@/lib/shop';
import { useNav } from '@/lib/nav';
import { products, formatINR } from '@/lib/products';
import RippleButton from './RippleButton';

export default function WishlistDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { wishlist, toggleWishlist } = useShop();
  const { navigate } = useNav();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div
      className={`fixed inset-0 z-[1200] transition-all duration-500 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-luxury-lg transition-transform duration-500 ease-luxury ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <Heart className="text-ruby" size={20} />
            <h2 className="font-serif text-2xl text-ink">Wishlist</h2>
          </div>
          <button onClick={onClose} aria-label="Close wishlist">
            <X className="text-ink" size={22} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-ivory-200">
              <Heart className="text-champagne-500" size={28} />
            </div>
            <p className="font-serif text-2xl text-ink">No favourites yet</p>
            <p className="mt-2 text-sm text-stone-500">
              Tap the heart on any piece to save it here.
            </p>
            <RippleButton
              variant="outline"
              className="mt-6"
              onClick={() => {
                onClose();
                navigate('shop');
              }}
            >
              Discover Pieces
            </RippleButton>
          </div>
        ) : (
          <ul className="hide-scrollbar flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {items.map((p) => (
              <li key={p.id} className="flex gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-28 w-24 rounded-2xl object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-serif text-lg leading-tight text-ink">{p.name}</p>
                      <p className="mt-1 text-[0.7rem] uppercase tracking-wide-2 text-stone-500">
                        {p.category}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      aria-label="Remove from wishlist"
                      className="text-ruby transition-transform hover:scale-110"
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-serif text-lg text-ink">{formatINR(p.price)}</span>
                    <button
                      onClick={() => {
                        onClose();
                        navigate('shop', p.id);
                      }}
                      className="link-underline text-[0.7rem] uppercase tracking-wide-2 text-emerald"
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
