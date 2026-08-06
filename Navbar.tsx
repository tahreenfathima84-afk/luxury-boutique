import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useShop } from '@/lib/shop';
import { useNav } from '@/lib/nav';
import { formatINR } from '@/lib/products';
import RippleButton from './RippleButton';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQty, cartTotal } = useShop();
  const { navigate } = useNav();

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
            <ShoppingBag className="text-emerald" size={20} />
            <h2 className="font-serif text-2xl text-ink">Your Atelier Bag</h2>
          </div>
          <button onClick={onClose} aria-label="Close cart">
            <X className="text-ink" size={22} />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-ivory-200">
              <ShoppingBag className="text-champagne-500" size={28} />
            </div>
            <p className="font-serif text-2xl text-ink">Your bag is empty</p>
            <p className="mt-2 text-sm text-stone-500">
              Discover handcrafted pieces made for the modern muse.
            </p>
            <RippleButton
              variant="fill"
              className="mt-6"
              onClick={() => {
                onClose();
                navigate('shop');
              }}
            >
              Explore Collections
            </RippleButton>
          </div>
        ) : (
          <>
            <ul className="hide-scrollbar flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {cart.map((line, i) => (
                <li key={i} className="flex gap-4">
                  <img
                    src={line.image}
                    alt={line.name}
                    className="h-28 w-24 rounded-2xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-serif text-lg leading-tight text-ink">{line.name}</p>
                        <p className="mt-1 text-[0.7rem] uppercase tracking-wide-2 text-stone-500">
                          {line.colour} · {line.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(i)}
                        aria-label="Remove"
                        className="text-stone-400 transition-colors hover:text-ruby"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-ink/15 px-2 py-1">
                        <button
                          onClick={() => updateQty(i, line.qty - 1)}
                          aria-label="Decrease"
                          className="text-stone-600 hover:text-emerald"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm text-ink">{line.qty}</span>
                        <button
                          onClick={() => updateQty(i, line.qty + 1)}
                          aria-label="Increase"
                          className="text-stone-600 hover:text-emerald"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-serif text-lg text-ink">
                        {formatINR(line.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-ink/10 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] uppercase tracking-wide-2 text-stone-500">
                  Subtotal
                </span>
                <span className="font-serif text-2xl text-ink">{formatINR(cartTotal)}</span>
              </div>
              <p className="mt-1 text-[0.7rem] text-stone-400">
                Shipping & taxes calculated at checkout.
              </p>
              <RippleButton
                variant="fill"
                className="mt-5 w-full"
                onClick={() => {
                  onClose();
                  navigate('checkout');
                }}
              >
                Proceed to Checkout
              </RippleButton>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
