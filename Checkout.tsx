import { useNav } from '@/lib/nav';
import { useReveal, useParallax } from '@/lib/hooks';
import { ArrowRight, Award, HandHeart, Leaf, Scissors } from 'lucide-react';
import RippleButton from '@/components/RippleButton';
import { Newsletter } from '@/components/Sections';

export default function About() {
  const { navigate } = useNav();

  return (
    <div className="pt-28 md:pt-32">
      {/* editorial hero */}
      <section className="relative mx-auto max-w-[1300px] px-6">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">The Maison Story</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
              A house built on<br />patience & silk
            </h1>
          </div>
          <p className="text-base leading-relaxed text-stone-600 md:pb-4">
            Maison Élise began in a single Mumbai room with two looms and one belief —
            that luxury is not loud. It is the weight of real silk, the patience of a
            hand-stitched hem, the quiet confidence of a garment made to outlive the season.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          <img
            src="https://images.pexels.com/photos/5830661/pexels-photo-5830661.jpeg?auto=compress&cs=tinysrgb&h=700&w=560"
            alt="Atelier"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover"
          />
          <img
            src="https://images.pexels.com/photos/6461114/pexels-photo-6461114.jpeg?auto=compress&cs=tinysrgb&h=700&w=560"
            alt="Pattern cutting"
            loading="lazy"
            className="mt-8 aspect-[4/5] w-full rounded-[2rem] object-cover md:mt-16"
          />
          <img
            src="https://images.pexels.com/photos/7776111/pexels-photo-7776111.jpeg?auto=compress&cs=tinysrgb&h=700&w=560"
            alt="Scissors and fabric"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover"
          />
        </div>
      </section>

      {/* craftsmanship */}
      <Craftsmanship />

      {/* timeline */}
      <Timeline />

      {/* values */}
      <Values />

      {/* atelier CTA */}
      <section className="relative mx-auto my-24 max-w-[1300px] px-6">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <img
            src="https://images.pexels.com/photos/13068364/pexels-photo-13068364.jpeg?auto=compress&cs=tinysrgb&h=900&w=2000"
            alt="Maison Élise boutique"
            loading="lazy"
            className="h-[60vh] min-h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory">
            <p className="eyebrow text-champagne-300">Visit the Atelier</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-5xl">
              Touch the silk. Meet your stylist.
            </h2>
            <RippleButton variant="gold" className="mt-7" onClick={() => navigate('appointment')}>
              Book a Private Appointment <ArrowRight size={15} />
            </RippleButton>
          </div>
        </div>
      </section>

      <Newsletter variant="light" />
    </div>
  );
}

function Craftsmanship() {
  const { ref, offset } = useParallax<HTMLDivElement>(0.15);
  const textRef = useReveal<HTMLDivElement>();
  return (
    <section className="bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <div ref={ref} className="reveal-scale overflow-hidden rounded-[2rem]">
          <img
            src="https://images.pexels.com/photos/6461164/pexels-photo-6461164.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
            alt="Hand embroidery"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
            style={{ transform: `translateY(${offset * 0.2}px)` }}
          />
        </div>
        <div ref={textRef} className="reveal reveal-delay-1">
          <p className="eyebrow">The Craft</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
            Three hundred hours<br />per bridal gown
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone-600">
            Our embroiderers trace patterns by candlelight, couch gold thread by hand,
            and place each pearl with a needle they have held for decades. A single
            bridal piece can pass through six artisans before it is finished.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-600">
            We refuse to rush this. The result is a garment that does not just fit your
            body — it remembers the moment you wore it.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { n: '300+', l: 'Hours per couture gown' },
              { n: '120+', l: 'Master artisans' },
              { n: '18', l: 'Years of atelier' },
              { n: '6', l: 'Hands per bridal piece' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/60 p-5">
                <p className="font-serif text-3xl text-emerald">{s.n}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-wide-2 text-stone-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const milestones = [
    { year: '2007', title: 'The First Loom', text: 'Founder Élise Mehra begins with two handlooms and a single Banarasi weaver in a Mumbai chawl.' },
    { year: '2012', title: 'The Bridal Atelier', text: 'Our first couture bridal gown is worn at the Taj Lake Palace. Word travels.' },
    { year: '2017', title: 'The Modest Line', text: 'Noor launches — considered abayas and hijabs for the modern woman.' },
    { year: '2021', title: 'Going Global', text: 'Shipping to 60+ cities. The Élise Circle private client list opens.' },
    { year: '2025', title: 'The Heritage Edit', text: 'A preservation partnership with Banarasi weavers to keep handloom alive.' },
  ];
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="text-center">
          <p className="eyebrow">Our Journey</p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Eighteen years, one conviction</h2>
        </div>

        <div ref={ref} className="reveal mt-16">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-champagne/40 md:left-1/2 md:-translate-x-1/2" />
            <ul className="space-y-12">
            {milestones.map((m, i) => (
              <li
                key={m.year}
                className={`relative flex md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="hidden flex-1 md:block" />
                <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-champagne bg-ivory md:left-1/2">
                  <span className="h-2 w-2 rounded-full bg-emerald" />
                </div>
                <div className="ml-12 flex-1 md:ml-0">
                  <div className="rounded-2xl bg-ivory-100 p-6 shadow-glass">
                    <span className="font-serif text-3xl text-champagne-600">{m.year}</span>
                    <h3 className="mt-2 font-serif text-xl text-ink">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{m.text}</p>
                  </div>
                </div>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    { icon: HandHeart, title: 'Artisan First', text: 'We pay our craftspeople above market and credit their work. Luxury begins with fairness.' },
    { icon: Leaf, title: 'Made to Last', text: 'Natural fibres, biodegradable packaging, and repairs for life. Nothing here is disposable.' },
    { icon: Scissors, title: 'Bespoke by Default', text: 'Every gown includes a fitting. Your silhouette is the pattern, not the other way around.' },
    { icon: Award, title: 'Quietly Exclusive', text: 'Limited editions are numbered and never repeated. Owning an Élise piece means something.' },
  ];
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="bg-emerald py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="text-center">
          <p className="eyebrow text-champagne-300">What We Believe</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">The Maison values</h2>
        </div>
        <div ref={ref} className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl bg-white/5 p-7 backdrop-blur-sm transition-colors hover:bg-white/10"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <v.icon className="text-champagne-300" size={26} />
              <h3 className="mt-5 font-serif text-xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
