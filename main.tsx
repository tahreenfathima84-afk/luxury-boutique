import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { useShop } from '@/lib/shop';
import { products, collections, formatINR, type Product } from '@/lib/products';
import { useReveal, useParallax, useScrolledPast } from '@/lib/hooks';
import RippleButton from '@/components/RippleButton';
import ProductCard from '@/components/ProductCard';
import {
  BrandMarquee, StatsBar, Testimonials, InstagramFeed, Newsletter, SectionHeading,
} from '@/components/Sections';
import QuickView from '@/components/QuickView';

export default function Home() {
  const { navigate } = useNav();
  const [quick, setQuick] = useState<Product | null>(null);

  return (
    <div className="relative">
      <Hero />
      <BrandMarquee />
      <FeaturedCollections />
      <BrandStory />
      <NewArrivals onQuickView={setQuick} />
      <StatsBar />
      <LookbookTeaser />
      <Testimonials />
      <InstagramFeed />
      <Newsletter variant="dark" />
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { navigate } = useNav();
  const { ref, offset } = useParallax<HTMLDivElement>(0.25);
  const scrolled = useScrolledPast(20);
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
      <div ref={ref} className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/27269998/pexels-photo-27269998.jpeg?auto=compress&cs=tinysrgb&h=1400&w=2000"
          alt="Maison Élise bridal couture"
          onLoad={() => setLoaded(true)}
          className="h-[120%] w-full object-cover object-center transition-transform duration-[1.6s] ease-luxury"
          style={{
            transform: `translateY(${offset * 0.4}px) scale(${loaded ? 1.05 : 1.15})`,
            opacity: loaded ? 1 : 0,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
      </div>

      {/* floating gold orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[12%] top-[24%] h-40 w-40 rounded-full bg-champagne/20 blur-3xl animate-float-slow" />
        <div className="absolute left-[8%] top-[40%] h-56 w-56 rounded-full bg-emerald/20 blur-3xl animate-float-soft" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 md:pb-28">
        <div className="max-w-2xl">
          <span
            className={`eyebrow text-champagne-300 transition-all duration-1000 ${
              scrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Maison Élise · Couture Atelier
          </span>
          <h1
            className="mt-5 font-serif text-display text-ivory"
            style={{ textShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
          >
            Elegance
            <br />
            Beyond Fashion
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/80">
            Discover handcrafted luxury collections designed to make every occasion
            unforgettable — couture, heritage silk and considered modestwear.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RippleButton variant="fill" className="bg-emerald text-ivory" onClick={() => navigate('shop')}>
              Explore Collection <ArrowRight size={15} />
            </RippleButton>
            <RippleButton
              variant="outline"
              className="border-ivory/40 text-ivory hover:border-champagne hover:text-champagne-300"
              onClick={() => navigate('shop', 'new')}
            >
              New Arrivals
            </RippleButton>
            <RippleButton
              variant="gold"
              onClick={() => navigate('appointment')}
            >
              <Calendar size={15} /> Book Styling Appointment
            </RippleButton>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-ivory/60">
          <span className="text-[0.6rem] uppercase tracking-ultra-wide">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
            <span className="absolute inset-x-0 top-0 h-3 animate-[float-soft_2s_ease-in-out_infinite] bg-champagne-300" />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Featured Collections ---------------- */
function FeaturedCollections() {
  const { navigate } = useNav();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="The Maison Edit"
            title="Featured Collections"
            subtitle="Eight curated worlds of dress — from the bridal atelier to everyday Élise."
            align="left"
          />
          <button
            onClick={() => navigate('shop')}
            className="link-underline flex items-center gap-2 text-[0.72rem] uppercase tracking-wide-2 text-emerald"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div ref={ref} className="reveal mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {collections.map((c, i) => (
            <button
              key={c.id}
              onClick={() => navigate('shop', `cat:${c.name}`)}
              className={`group relative overflow-hidden rounded-3xl ${
                i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className={`overflow-hidden ${i % 5 === 0 ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-[3/4]'}`}>
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxury group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <p className="text-[0.6rem] uppercase tracking-ultra-wide text-champagne-300">{c.tagline}</p>
                <h3 className={`mt-1 font-serif text-ivory ${i % 5 === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                  {c.name}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-wide-2 text-ivory/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Brand Story ---------------- */
function BrandStory() {
  const { navigate } = useNav();
  const { ref, offset } = useParallax<HTMLDivElement>(0.15);
  const textRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <div ref={ref} className="reveal-scale relative">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src="https://images.pexels.com/photos/4622423/pexels-photo-4622423.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
              alt="Atelier craftsmanship"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
              style={{ transform: `translateY(${offset * 0.2}px)` }}
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden w-44 overflow-hidden rounded-2xl border-4 border-ivory-100 shadow-luxury sm:block">
            <img
              src="https://images.pexels.com/photos/6461164/pexels-photo-6461164.jpeg?auto=compress&cs=tinysrgb&h=300&w=300"
              alt="Hand embroidery"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div ref={textRef} className="reveal reveal-delay-1">
          <p className="eyebrow">Our Philosophy</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-ink md:text-5xl">
            Where heritage<br />meets the modern muse
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone-600">
            Maison Élise was born from a single conviction — that every woman deserves
            garments made with the patience of a bygone era and the ease of today. Each
            piece passes through the hands of artisans who have stitched for generations,
            then is finished in our Mumbai atelier.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            We do not chase trends. We make heirlooms — silk that outlives seasons,
            embroidery that tells a story, silhouettes that remember you.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Sparkles, label: 'Hand Embroidered' },
              { icon: Star, label: 'Heritage Silk' },
              { icon: Calendar, label: 'Bespoke Fitting' },
            ].map((v) => (
              <div key={v.label} className="rounded-2xl bg-white/60 p-4 text-center">
                <v.icon className="mx-auto text-champagne-500" size={20} />
                <p className="mt-2 text-[0.6rem] uppercase tracking-wide-2 text-stone-600">{v.label}</p>
              </div>
            ))}
          </div>

          <RippleButton variant="outline" className="mt-8" onClick={() => navigate('about')}>
            Our Story <ArrowRight size={15} />
          </RippleButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- New Arrivals carousel ---------------- */
function NewArrivals({ onQuickView }: { onQuickView: (p: Product) => void }) {
  const { navigate } = useNav();
  const scroller = useRef<HTMLDivElement>(null);
  const newArrivals = products.filter((p) => p.newArrival || p.trending).concat(products.slice(0, 4));

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Just Arrived"
            title="New & Trending"
            subtitle="The season's most-coveted pieces, fresh from the atelier."
            align="left"
          />
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scroll(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-emerald hover:text-emerald">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-emerald hover:text-emerald">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {newArrivals.map((p, i) => (
            <div key={p.id} className="w-[78vw] flex-shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[23vw]">
              <ProductCard product={p} onQuickView={onQuickView} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <RippleButton variant="fill" onClick={() => navigate('shop', 'new')}>
            Shop All New Arrivals <ArrowRight size={15} />
          </RippleButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Lookbook teaser ---------------- */
function LookbookTeaser() {
  const { navigate } = useNav();
  const ref = useReveal<HTMLDivElement>();
  const { ref: imgRef, offset } = useParallax<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className="reveal relative h-[80vh] min-h-[520px] overflow-hidden">
      <div ref={imgRef} className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/35730946/pexels-photo-35730946.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000"
          alt="Lookbook editorial"
          loading="lazy"
          className="h-[120%] w-full object-cover"
          style={{ transform: `translateY(${offset * 0.4}px)` }}
        />
        <div className="absolute inset-0 bg-ink/45" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-champagne-300">The Élise Lookbook</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl text-ivory md:text-6xl">
          A cinematic journey through the season
        </h2>
        <p className="mt-5 max-w-lg text-sm text-ivory/80">
          Editorials, behind-the-atelier films and the stories behind every silhouette.
        </p>
        <RippleButton
          variant="gold"
          className="mt-8"
          onClick={() => navigate('lookbook')}
        >
          Enter the Lookbook <ArrowRight size={15} />
        </RippleButton>
      </div>
    </section>
  );
}
