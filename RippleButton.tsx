import { useMemo, useState, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronDown, Sparkles, Check } from 'lucide-react';
import {
  products, allCategories, allColours, allFabrics, allOccasions,
  type Product, type Category, type Occasion,
} from '@/lib/products';
import { useShop } from '@/lib/shop';
import { useNav } from '@/lib/nav';
import { useReveal } from '@/lib/hooks';
import ProductCard from '@/components/ProductCard';
import QuickView from '@/components/QuickView';
import RippleButton from '@/components/RippleButton';
import AIStyleAssistant from '@/components/AIStyleAssistant';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'new', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const { param, navigate } = useNav();
  const { recentlyViewed, trackView } = useShop();
  const [quick, setQuick] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);

  const [cats, setCats] = useState<Set<Category>>(new Set());
  const [colours, setColours] = useState<Set<string>>(new Set());
  const [sizes, setSizes] = useState<Set<string>>(new Set());
  const [fabrics, setFabrics] = useState<Set<string>>(new Set());
  const [occasions, setOccasions] = useState<Set<Occasion>>(new Set());
  const [priceMax, setPriceMax] = useState(300000);
  const [flags, setFlags] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState('featured');

  // read param (cat:..., new, best, pid) into filters
  useEffect(() => {
    if (!param) return;
    if (param === 'new') setFlags(new Set(['newArrival']));
    else if (param === 'best') setFlags(new Set(['bestSeller']));
    else if (param.startsWith('cat:')) {
      const c = param.slice(4) as Category;
      setCats(new Set([c]));
    }
  }, [param]);

  // open quick view if param is a product id
  useEffect(() => {
    if (param && !param.startsWith('cat:') && param !== 'new' && param !== 'best') {
      const p = products.find((x) => x.id === param);
      if (p) {
        setQuick(p);
        trackView(p.id);
      }
    }
  }, [param, trackView]);

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cats.size && !cats.has(p.category)) return false;
      if (colours.size && !p.colours.some((c) => colours.has(c.name))) return false;
      if (sizes.size && !p.sizes.some((s) => sizes.has(s))) return false;
      if (fabrics.size) {
        const f = p.fabric.toLowerCase();
        if (![...fabrics].some((x) => f.includes(x.toLowerCase()))) return false;
      }
      if (occasions.size && !occasions.has(p.occasion)) return false;
      if (p.price > priceMax) return false;
      if (flags.has('newArrival') && !p.newArrival) return false;
      if (flags.has('bestSeller') && !p.bestSeller) return false;
      if (flags.has('trending') && !p.trending) return false;
      if (flags.has('limitedEdition') && !p.limitedEdition) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'new') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return 0;
    });
    return list;
  }, [cats, colours, sizes, fabrics, occasions, priceMax, flags, sort]);

  const clearAll = () => {
    setCats(new Set()); setColours(new Set()); setSizes(new Set());
    setFabrics(new Set()); setOccasions(new Set()); setFlags(new Set());
    setPriceMax(300000);
    navigate('shop');
  };

  const activeCount =
    cats.size + colours.size + sizes.size + fabrics.size + occasions.size + flags.size +
    (priceMax < 300000 ? 1 : 0);

  const ref = useReveal<HTMLDivElement>();
  const recent = recentlyViewed
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p)
    .slice(0, 4);

  return (
    <div className="pt-28 md:pt-32">
      {/* header */}
      <div className="mx-auto max-w-[1400px] px-6">
        <p className="eyebrow">The Boutique</p>
        <h1 className="mt-3 font-serif text-5xl text-ink md:text-6xl">Shop the Maison</h1>
        <p className="mt-3 max-w-xl text-sm text-stone-500">
          Filter by category, colour, fabric and occasion to find the piece made for your moment.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] px-6">
        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-[0.7rem] uppercase tracking-wide-2 text-ink transition-colors hover:border-emerald lg:hidden"
            >
              <SlidersHorizontal size={15} /> Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            <span className="text-sm text-stone-500">{filtered.length} pieces</span>
            {activeCount > 0 && (
              <button onClick={clearAll} className="link-underline text-[0.7rem] uppercase tracking-wide-2 text-ruby">
                Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAssistant(true)}
              className="flex items-center gap-2 rounded-full bg-champagne-50 px-4 py-2.5 text-[0.7rem] uppercase tracking-wide-2 text-champagne-700 transition-colors hover:bg-champagne-100"
            >
              <Sparkles size={15} /> AI Style Assistant
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-full border border-ink/15 bg-ivory py-2.5 pl-4 pr-10 text-[0.7rem] uppercase tracking-wide-2 text-ink focus:outline-none focus:ring-2 focus:ring-champagne"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-8">
          {/* desktop filters */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <FilterPanel
              cats={cats} colours={colours} sizes={sizes} fabrics={fabrics}
              occasions={occasions} priceMax={priceMax} flags={flags}
              toggle={toggle} setCats={setCats} setColours={setColours}
              setSizes={setSizes} setFabrics={setFabrics} setOccasions={setOccasions}
              setPriceMax={setPriceMax} setFlags={setFlags}
            />
          </aside>

          {/* grid */}
          <div ref={ref} className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="font-serif text-3xl text-ink">No pieces match your filters</p>
                <p className="mt-2 text-sm text-stone-500">Try widening your selection.</p>
                <RippleButton variant="outline" className="mt-6" onClick={clearAll}>
                  Reset Filters
                </RippleButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuick} index={i} />
                ))}
              </div>
            )}

            {/* recently viewed */}
            {recent.length > 0 && (
              <div className="mt-24">
                <h3 className="font-serif text-2xl text-ink">Recently Viewed</h3>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
                  {recent.map((p, i) => (
                    <ProductCard key={p.id} product={p} onQuickView={setQuick} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter drawer */}
      <div className={`fixed inset-0 z-[1250] lg:hidden transition-all duration-400 ${showFilters ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
        <div className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-ivory p-6 shadow-luxury-lg transition-transform duration-400 ease-luxury ${showFilters ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-ink">Filters</h2>
            <button onClick={() => setShowFilters(false)} aria-label="Close"><X className="text-ink" size={22} /></button>
          </div>
          <div className="mt-6">
            <FilterPanel
              cats={cats} colours={colours} sizes={sizes} fabrics={fabrics}
              occasions={occasions} priceMax={priceMax} flags={flags}
              toggle={toggle} setCats={setCats} setColours={setColours}
              setSizes={setSizes} setFabrics={setFabrics} setOccasions={setOccasions}
              setPriceMax={setPriceMax} setFlags={setFlags}
            />
          </div>
          <RippleButton variant="fill" className="mt-6 w-full" onClick={() => setShowFilters(false)}>
            Show {filtered.length} Pieces
          </RippleButton>
        </div>
      </div>

      <QuickView product={quick} onClose={() => { setQuick(null); if (param && !param.startsWith('cat:')) navigate('shop'); }} />
      <AIStyleAssistant open={showAssistant} onClose={() => setShowAssistant(false)} onPick={(p) => { setShowAssistant(false); setQuick(p); }} />
    </div>
  );
}

/* ---------------- Filter panel ---------------- */
function FilterPanel({
  cats, colours, sizes, fabrics, occasions, priceMax, flags,
  toggle, setCats, setColours, setSizes, setFabrics, setOccasions,
  setPriceMax, setFlags,
}: {
  cats: Set<Category>; colours: Set<string>; sizes: Set<string>; fabrics: Set<string>;
  occasions: Set<Occasion>; priceMax: number; flags: Set<string>;
  toggle: <T>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => void;
  setCats: (s: Set<Category>) => void;
  setColours: (s: Set<string>) => void;
  setSizes: (s: Set<string>) => void;
  setFabrics: (s: Set<string>) => void;
  setOccasions: (s: Set<Occasion>) => void;
  setPriceMax: (n: number) => void;
  setFlags: (s: Set<string>) => void;
}) {
  const toggleFlag = (f: string) => {
    const next = new Set(flags);
    next.has(f) ? next.delete(f) : next.add(f);
    setFlags(next);
  };

  const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-ink/10 py-5">
      <h3 className="text-[0.7rem] uppercase tracking-wide-2 text-ink">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );

  return (
    <div>
      <Group title="Category">
        <div className="space-y-2">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => toggle(cats, c, setCats)}
              className="flex w-full items-center gap-2.5 text-left text-sm text-stone-600"
            >
              <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-all ${
                cats.has(c) ? 'border-emerald bg-emerald text-ivory' : 'border-ink/25'
              }`}>
                {cats.has(c) && <Check size={11} />}
              </span>
              {c}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Colour">
        <div className="flex flex-wrap gap-2">
          {allColours.map((c) => (
            <button
              key={c.name}
              onClick={() => toggle(colours, c.name, setColours)}
              aria-label={c.name}
              className={`h-7 w-7 rounded-full border transition-all ${
                colours.has(c.name) ? 'ring-2 ring-champagne ring-offset-2 ring-offset-ivory' : 'border-ink/15'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </Group>

      <Group title="Size">
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'One Size', '36', '37', '38', '39', '40', '41'].map((s) => (
            <button
              key={s}
              onClick={() => toggle(sizes, s, setSizes)}
              className={`rounded-full border px-3 py-1.5 text-[0.65rem] uppercase tracking-wide-2 transition-all ${
                sizes.has(s) ? 'border-emerald bg-emerald text-ivory' : 'border-ink/15 text-stone-600 hover:border-emerald'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Fabric">
        <div className="space-y-2">
          {allFabrics.map((f) => (
            <button
              key={f}
              onClick={() => toggle(fabrics, f, setFabrics)}
              className="flex w-full items-center gap-2.5 text-left text-sm text-stone-600"
            >
              <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-all ${
                fabrics.has(f) ? 'border-emerald bg-emerald text-ivory' : 'border-ink/25'
              }`}>
                {fabrics.has(f) && <Check size={11} />}
              </span>
              {f}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Occasion">
        <div className="flex flex-wrap gap-2">
          {allOccasions.map((o) => (
            <button
              key={o}
              onClick={() => toggle(occasions, o, setOccasions)}
              className={`rounded-full border px-3 py-1.5 text-[0.65rem] uppercase tracking-wide-2 transition-all ${
                occasions.has(o) ? 'border-emerald bg-emerald text-ivory' : 'border-ink/15 text-stone-600 hover:border-emerald'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </Group>

      <Group title={`Price · up to ₹${priceMax.toLocaleString('en-IN')}`}>
        <input
          type="range"
          min={5000}
          max={300000}
          step={5000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-emerald"
        />
      </Group>

      <Group title="Highlights">
        <div className="space-y-2">
          {[
            { v: 'newArrival', l: 'New Arrival' },
            { v: 'bestSeller', l: 'Best Seller' },
            { v: 'trending', l: 'Trending' },
            { v: 'limitedEdition', l: 'Limited Edition' },
          ].map((f) => (
            <button
              key={f.v}
              onClick={() => toggleFlag(f.v)}
              className="flex w-full items-center gap-2.5 text-left text-sm text-stone-600"
            >
              <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-all ${
                flags.has(f.v) ? 'border-emerald bg-emerald text-ivory' : 'border-ink/25'
              }`}>
                {flags.has(f.v) && <Check size={11} />}
              </span>
              {f.l}
            </button>
          ))}
        </div>
      </Group>
    </div>
  );
}


