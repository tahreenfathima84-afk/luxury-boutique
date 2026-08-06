import { useState } from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNav, type RouteName } from '@/lib/nav';
import RippleButton from './RippleButton';
import { useReveal, useCountUp } from '@/lib/hooks';

export function BrandMarquee() {
  const words = ['Dior-inspired', 'Couture Crafted', 'Hand Embroidered', 'Timeless', 'Editorial', 'Exclusive', 'Heritage Silk', 'Bespoke'];
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-ivory-100 py-5">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-2xl italic text-ink/70">
            {w}
            <span className="text-champagne-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatsBar() {
  const stats = [
    { value: 25000, suffix: '+', label: 'Muses Dressed' },
    { value: 18, suffix: ' yrs', label: 'Of Craftsmanship' },
    { value: 120, suffix: '+', label: 'Artisans Employed' },
    { value: 60, suffix: '+', label: 'Cities Served' },
  ];
  return (
    <section className="bg-emerald py-16 text-ivory">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <CountUp key={s.label} target={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}

function CountUp({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, value } = useCountUp(target, 2200);
  return (
    <div className="text-center">
      <span ref={ref} className="block font-serif text-4xl text-champagne-300 md:text-5xl">
        {value.toLocaleString('en-IN')}{suffix}
      </span>
      <span className="mt-2 block text-[0.65rem] uppercase tracking-wide-2 text-ivory/70">{label}</span>
    </div>
  );
}

export function Testimonials() {
  const reviews = [
    {
      name: 'Ananya Mehra',
      role: 'Bride, Udaipur',
      text: 'My Aurelia gown made me feel like a Renaissance painting. Every pearl was placed with intention — Maison Élise understood the moment before I could describe it.',
      avatar: 'https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
      rating: 5,
    },
    {
      name: 'Layla Rahman',
      role: 'Client, Dubai',
      text: 'The Noor abaya is the most considered piece in my wardrobe. The gold detail whispers rather than shouts. True luxury is restraint, and they understand that.',
      avatar: 'https://images.pexels.com/photos/1820575/pexels-photo-1820575.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
      rating: 5,
    },
    {
      name: 'Divya Sharma',
      role: 'Collector, Mumbai',
      text: 'I have bought from ateliers across Paris and Delhi. The Meera Banarasi hangs beside my Hermès scarves and holds its own. That is the highest praise I can offer.',
      avatar: 'https://images.pexels.com/photos/6497112/pexels-photo-6497112.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
      rating: 5,
    },
  ];
  const [idx, setIdx] = useState(0);
  const ref = useReveal<HTMLDivElement>();
  const active = reviews[idx];

  return (
    <section ref={ref} className="reveal bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow">The Maison Voices</p>
        <h2 className="reveal reveal-delay-1 mt-4 font-serif text-4xl text-ink md:text-5xl">
          Loved by women who notice everything
        </h2>
        <div className="reveal reveal-delay-2 mt-12 min-h-[12rem]">
          <p className="font-serif text-2xl italic leading-relaxed text-ink/85 md:text-3xl">
            “{active.text}”
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <img src={active.avatar} alt={active.name} className="h-12 w-12 rounded-full object-cover" />
            <div className="text-left">
              <p className="font-serif text-lg text-ink">{active.name}</p>
              <p className="text-[0.65rem] uppercase tracking-wide-2 text-stone-500">{active.role}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === idx ? 'w-8 bg-emerald' : 'w-2 bg-ink/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramFeed() {
  const imgs = [
    'https://images.pexels.com/photos/27269998/pexels-photo-27269998.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    'https://images.pexels.com/photos/34058551/pexels-photo-34058551.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    'https://images.pexels.com/photos/32178223/pexels-photo-32178223.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    'https://images.pexels.com/photos/34952212/pexels-photo-34952212.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    'https://images.pexels.com/photos/17833830/pexels-photo-17833830.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    'https://images.pexels.com/photos/12959396/pexels-photo-12959396.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  ];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal py-24 md:py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="text-center">
          <p className="eyebrow flex items-center justify-center gap-2">
            <Instagram size={14} /> @maisonelise
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Follow the Maison</h2>
          <p className="mt-3 text-sm text-stone-500">A daily edit of couture, craft and the women who wear it.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {imgs.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={src}
                alt="Instagram post"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/40 group-hover:opacity-100">
                <Instagram className="text-ivory" size={22} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const ref = useReveal<HTMLDivElement>();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email });
      if (error && error.code !== '23505') throw error;
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  const dark = variant === 'dark';

  return (
    <section
      ref={ref}
      className={`reveal relative overflow-hidden py-24 md:py-32 ${
        dark ? 'bg-ink text-ivory' : 'bg-ivory-200 text-ink'
      }`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-champagne/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <p className="eyebrow">The Élise Circle</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          First access to collections,<br />stories & private events
        </h2>
        <p className={`mt-4 text-sm ${dark ? 'text-ivory/70' : 'text-stone-500'}`}>
          Join our list for early previews of limited editions and seasonal lookbooks.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus('idle');
            }}
            placeholder="Your email address"
            className={`w-full rounded-full border bg-white/70 px-5 py-3.5 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-champagne ${
              dark ? 'border-ivory/20' : 'border-ink/15'
            }`}
            aria-label="Email address"
          />
          <RippleButton type="submit" variant="gold" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining…' : 'Join the Circle'}
          </RippleButton>
        </form>
        {status === 'ok' && (
          <p className="mt-4 text-sm text-emerald">Welcome to the Élise Circle. Watch your inbox.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-ruby">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  const { navigate } = useNav();
  const cols: { title: string; links: { label: string; route?: RouteName; param?: string; href?: string }[] }[] = [
    {
      title: 'Shop',
      links: [
        { label: 'Bridal Collection', route: 'shop', param: 'cat:Bridal Collection' },
        { label: 'Designer Sarees', route: 'shop', param: 'cat:Designer Sarees' },
        { label: 'Luxury Lehengas', route: 'shop', param: 'cat:Luxury Lehengas' },
        { label: 'New Arrivals', route: 'shop', param: 'new' },
        { label: 'Best Sellers', route: 'shop', param: 'best' },
      ],
    },
    {
      title: 'Maison',
      links: [
        { label: 'About Us', route: 'about' },
        { label: 'Lookbook', route: 'lookbook' },
        { label: 'Book Appointment', route: 'appointment' },
        { label: 'Contact', route: 'contact' },
      ],
    },
    {
      title: 'Care',
      links: [
        { label: 'Order Tracking', route: 'contact' },
        { label: 'Gift Cards', route: 'shop' },
        { label: 'Style Quiz', route: 'appointment' },
        { label: 'FAQs', route: 'contact' },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-[1300px] px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-serif text-[0.6rem] uppercase tracking-ultra-wide text-champagne-300">Maison</span>
            <h3 className="font-serif italic text-4xl">Élise</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              Luxury Crafted For Every Woman. Hand-embroidered couture, heritage silks and
              considered modestwear, made by master artisans.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.7rem] uppercase tracking-wide-2 text-champagne-300">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => l.route && navigate(l.route, l.param)}
                      className="link-underline text-sm text-ivory/70 hover:text-ivory"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-[0.7rem] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5"><MapPin size={13} /> 24 Heritage Lane, Mumbai 400001</span>
            <span className="flex items-center gap-1.5"><Phone size={13} /> +91 98200 11234</span>
            <span className="flex items-center gap-1.5"><Mail size={13} /> concierge@maisonelise.com</span>
          </div>
          <p>© {new Date().getFullYear()} Maison Élise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-ink md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-sm leading-relaxed text-stone-500">{subtitle}</p>}
    </div>
  );
}

export function CTAButtons({ onPrimary, onSecondary, onTertiary, primaryLabel, secondaryLabel, tertiaryLabel }: {
  onPrimary?: () => void; primaryLabel?: string;
  onSecondary?: () => void; secondaryLabel?: string;
  onTertiary?: () => void; tertiaryLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {primaryLabel && (
        <RippleButton variant="fill" onClick={onPrimary} className="gap-2">
          {primaryLabel} <ArrowRight size={15} />
        </RippleButton>
      )}
      {secondaryLabel && (
        <RippleButton variant="outline" onClick={onSecondary}>{secondaryLabel}</RippleButton>
      )}
      {tertiaryLabel && (
        <RippleButton variant="gold" onClick={onTertiary}>{tertiaryLabel}</RippleButton>
      )}
    </div>
  );
}
