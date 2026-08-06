import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useNav } from '@/lib/nav';
import { useReveal, useParallax } from '@/lib/hooks';
import RippleButton from '@/components/RippleButton';

interface Look {
  id: string;
  title: string;
  season: string;
  image: string;
  desc: string;
  span?: boolean;
}

const looks: Look[] = [
  {
    id: 'l1',
    title: 'The Bridal Cathedral',
    season: 'Élise Bridal · Vol. III',
    image: 'https://images.pexels.com/photos/27603890/pexels-photo-27603890.jpeg?auto=compress&cs=tinysrgb&h=1100&w=900',
    desc: 'A cathedral-train gown photographed in the light of a Goan chapel. Lace over raw silk, hand-pearled.',
    span: true,
  },
  {
    id: 'l2',
    title: 'Ruby Reception',
    season: 'Saanjh Series',
    image: 'https://images.pexels.com/photos/12959396/pexels-photo-12959396.jpeg?auto=compress&cs=tinysrgb&h=800&w=640',
    desc: 'Mirror work catching the evening light of a Delhi reception.',
  },
  {
    id: 'l3',
    title: 'The Silk Drape',
    season: 'Heritage Edit',
    image: 'https://images.pexels.com/photos/34058551/pexels-photo-34058551.jpeg?auto=compress&cs=tinysrgb&h=800&w=640',
    desc: 'A Banarasi zari pallu shot against an Udaipur doorway.',
  },
  {
    id: 'l4',
    title: 'Noor at Dusk',
    season: 'Modest Line',
    image: 'https://images.pexels.com/photos/32178223/pexels-photo-32178223.jpeg?auto=compress&cs=tinysrgb&h=1100&w=900',
    desc: 'An embroidered abaya in the blue hour. Gold that whispers.',
    span: true,
  },
  {
    id: 'l5',
    title: 'After Dark',
    season: 'Evening Edit',
    image: 'https://images.pexels.com/photos/14801162/pexels-photo-14801162.jpeg?auto=compress&cs=tinysrgb&h=800&w=640',
    desc: 'Velvet and sequin, shot under a single gallery lamp.',
  },
  {
    id: 'l6',
    title: 'Indo-Modern',
    season: 'Sehr Co-ord',
    image: 'https://images.pexels.com/photos/38264826/pexels-photo-38264826.jpeg?auto=compress&cs=tinysrgb&h=800&w=640',
    desc: 'A tailored satin co-ord set bridging Mumbai and Milan.',
  },
];

export default function Lookbook() {
  const { navigate } = useNav();
  const [active, setActive] = useState<Look | null>(null);
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="pt-28 md:pt-32">
      <section className="mx-auto max-w-[1300px] px-6">
        <p className="eyebrow">The Élise Lookbook</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
          A cinematic journey<br />through the season
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600">
          Editorials shot in chapels, chawls and ateliers — the stories behind every
          silhouette in the Maison.
        </p>
      </section>

      <section ref={ref} className="reveal mx-auto mt-16 max-w-[1400px] px-6">
        <div className="grid auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {looks.map((l, i) => (
            <LookCard key={l.id} look={l} index={i} onOpen={() => setActive(l)} />
          ))}
        </div>
      </section>

      <section className="mx-auto my-24 max-w-[1300px] px-6 text-center">
        <h2 className="font-serif text-4xl text-ink md:text-5xl">Wear the story</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-stone-500">
          Every look in this book is shoppable. Explore the pieces behind the pages.
        </p>
        <RippleButton variant="fill" className="mt-7" onClick={() => navigate('shop')}>
          Shop the Collections <ArrowRight size={15} />
        </RippleButton>
      </section>

      {/* lightbox */}
      {active && (
        <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md animate-fade-in" onClick={() => setActive(null)} />
          <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-ivory shadow-luxury-lg animate-fade-up md:grid-cols-2">
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink backdrop-blur-md transition-colors hover:bg-white"
            >
              <X size={20} />
            </button>
            <img src={active.image} alt={active.title} className="h-72 w-full object-cover md:h-full" />
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="eyebrow">{active.season}</p>
              <h3 className="mt-3 font-serif text-3xl text-ink md:text-4xl">{active.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-stone-600">{active.desc}</p>
              <RippleButton
                variant="outline"
                className="mt-7 self-start"
                onClick={() => {
                  setActive(null);
                  navigate('shop');
                }}
              >
                Shop this look <ArrowRight size={15} />
              </RippleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LookCard({ look, index, onOpen }: { look: Look; index: number; onOpen: () => void }) {
  const { ref, offset } = useParallax<HTMLDivElement>(0.12);
  return (
    <button
      onClick={onOpen}
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={`group relative overflow-hidden rounded-[2rem] text-left ${
        look.span ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <img
        src={look.image}
        alt={look.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-luxury group-hover:scale-110"
        style={{ transform: `translateY(${offset * 0.1}px)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
        <p className="text-[0.6rem] uppercase tracking-ultra-wide text-champagne-300">{look.season}</p>
        <h3 className="mt-1 font-serif text-2xl md:text-3xl">{look.title}</h3>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-wide-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          View story <ArrowRight size={12} />
        </span>
      </div>
    </button>
  );
}
