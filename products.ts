import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, Heart, X, Sparkles } from 'lucide-react';
import { useNav, type RouteName } from '@/lib/nav';
import { useShop } from '@/lib/shop';
import { useScrolledPast } from '@/lib/hooks';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import { products } from '@/lib/products';

const links: { label: string; route: RouteName; param?: string }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Shop', route: 'shop' },
  { label: 'About', route: 'about' },
  { label: 'Lookbook', route: 'lookbook' },
  { label: 'Contact', route: 'contact' },
];

export default function Navbar() {
  const { route, navigate } = useNav();
  const { cartCount, wishlist } = useShop();
  const scrolled = useScrolledPast(60);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const go = (r: RouteName, p?: string) => {
    navigate(r, p);
    setMobileOpen(false);
  };

  const dark = route !== 'home' || scrolled;

  const results = query.trim()
    ? products
        .filter((p) =>
          (p.name + ' ' + p.category + ' ' + p.collection)
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ease-luxury ${
          dark ? 'glass shadow-glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
          {/* Left: mobile toggle + desktop links */}
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className={dark ? 'text-ink' : 'text-ivory'} size={22} />
            </button>
            <ul className="hidden items-center gap-7 lg:flex">
              {links.slice(0, 3).map((l) => (
                <li key={l.route}>
                  <button
                    onClick={() => go(l.route)}
                    className={`link-underline text-[0.72rem] uppercase tracking-wide-2 font-medium transition-colors ${
                      route === l.route
                        ? 'is-active text-emerald'
                        : dark
                        ? 'text-ink/80 hover:text-emerald'
                        : 'text-ivory/90 hover:text-champagne-300'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: logo */}
          <button
            onClick={() => go('home')}
            className="flex flex-col items-center"
            aria-label="Maison Élise home"
          >
            <span
              className={`font-serif text-[0.6rem] uppercase tracking-ultra-wide leading-none transition-colors ${
                dark ? 'text-champagne-600' : 'text-champagne-300'
              }`}
            >
              Maison
            </span>
            <span
              className={`font-serif italic text-2xl leading-none transition-colors sm:text-3xl ${
                dark ? 'text-ink' : 'text-ivory'
              }`}
            >
              Élise
            </span>
          </button>

          {/* Right: links + actions */}
          <div className="flex items-center gap-5">
            <ul className="hidden items-center gap-7 lg:flex">
              {links.slice(3).map((l) => (
                <li key={l.route}>
                  <button
                    onClick={() => go(l.route)}
                    className={`link-underline text-[0.72rem] uppercase tracking-wide-2 font-medium transition-colors ${
                      route === l.route
                        ? 'is-active text-emerald'
                        : dark
                        ? 'text-ink/80 hover:text-emerald'
                        : 'text-ivory/90 hover:text-champagne-300'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="transition-transform hover:scale-110">
              <Search className={dark ? 'text-ink' : 'text-ivory'} size={20} />
            </button>
            <button onClick={() => setWishOpen(true)} aria-label="Wishlist" className="relative transition-transform hover:scale-110">
              <Heart className={dark ? 'text-ink' : 'text-ivory'} size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ruby text-[0.55rem] font-medium text-ivory">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative transition-transform hover:scale-110">
              <ShoppingBag className={dark ? 'text-ink' : 'text-ivory'} size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[0.55rem] font-medium text-ivory">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[1100] lg:hidden transition-all duration-500 ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute left-0 top-0 h-full w-[82%] max-w-sm bg-ivory p-8 shadow-luxury-lg transition-transform duration-500 ease-luxury ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif italic text-2xl text-ink">Élise</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="text-ink" size={22} />
            </button>
          </div>
          <div className="mt-10 h-px w-full bg-champagne/30" />
          <ul className="mt-8 space-y-6">
            {links.map((l) => (
              <li key={l.route}>
                <button
                  onClick={() => go(l.route)}
                  className="font-serif text-3xl text-ink transition-colors hover:text-emerald"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => go('appointment')}
                className="font-serif text-3xl text-emerald"
              >
                Book Appointment
              </button>
            </li>
          </ul>
          <div className="mt-12 flex items-center gap-3 text-stone-500">
            <Sparkles size={16} className="text-champagne-500" />
            <span className="text-[0.7rem] uppercase tracking-wide-2">Luxury Crafted For Every Woman</span>
          </div>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} />

      {/* Search overlay */}
      <div
        className={`fixed inset-0 z-[1150] transition-all duration-400 ${
          searchOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setSearchOpen(false)}
      >
        <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
        <div
          className="relative mx-auto mt-24 max-w-2xl px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass-card rounded-3xl p-6 shadow-luxury-lg">
            <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
              <Search className="text-stone-500" size={22} />
              <input
                autoFocus={searchOpen}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections, fabrics, occasions…"
                className="w-full bg-transparent text-lg text-ink placeholder:text-stone-400 focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="text-stone-500" size={20} />
              </button>
            </div>
            {results.length > 0 && (
              <ul className="mt-4 max-h-80 overflow-y-auto">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        go('shop', p.id);
                        setSearchOpen(false);
                        setQuery('');
                      }}
                      className="flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-colors hover:bg-ivory-200"
                    >
                      <img src={p.image} alt={p.name} className="h-16 w-14 rounded-xl object-cover" />
                      <div>
                        <p className="font-serif text-lg text-ink">{p.name}</p>
                        <p className="text-[0.7rem] uppercase tracking-wide-2 text-stone-500">{p.category}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {query && results.length === 0 && (
              <p className="mt-6 text-center text-stone-500">No results for “{query}”.</p>
            )}
            {!query && (
              <p className="mt-6 text-center text-[0.7rem] uppercase tracking-wide-2 text-stone-400">
                Try “bridal”, “saree”, “lehenga”, “abaya”…
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
