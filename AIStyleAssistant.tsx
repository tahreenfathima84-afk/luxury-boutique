import { useEffect, useState } from 'react';

/** Cinematic loading screen: flowing silk, golden particles, logo reveal. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1700);
    const t3 = setTimeout(() => setPhase(3), 2900);
    const t4 = setTimeout(() => setHidden(true), 3600);
    const t5 = setTimeout(() => onDone(), 4100);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-ink overflow-hidden transition-opacity duration-700 ${
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={hidden}
    >
      {/* flowing silk layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-silk-drape bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 opacity-40" style={{ animationDelay: '0s' }} />
        <div className="absolute inset-0 animate-silk-drape bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-300 opacity-30" style={{ animationDelay: '0.4s' }} />
        <div className="absolute inset-0 animate-silk-drape bg-gradient-to-r from-ruby-400 via-ruby-300 to-ruby-400 opacity-20" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* golden particle burst */}
      <div className="absolute inset-0">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-champagne-200"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
              animation: `pulse-gold ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite, fade-in 1s ease ${0.4 + Math.random() * 0.8}s forwards`,
              boxShadow: '0 0 8px rgba(197,165,114,0.8)',
            }}
          />
        ))}
      </div>

      {/* logo */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div
          className={`transition-all duration-1000 ease-luxury ${
            phase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <span className="block font-serif text-[0.7rem] uppercase tracking-ultra-wide text-champagne-300/80">
            Maison
          </span>
          <h1 className="mt-2 font-serif text-5xl text-ivory sm:text-7xl">
            <span className="gold-text italic">Élise</span>
          </h1>
        </div>

        <div
          className={`mt-6 overflow-hidden transition-all duration-1000 ${
            phase >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-[0.7rem] uppercase tracking-ultra-wide text-stone-400">
            Luxury Crafted For Every Woman
          </p>
        </div>

        {/* progress line */}
        <div className="mt-10 h-px w-44 overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-champagne-300 to-champagne-500"
            style={{
              width: phase >= 3 ? '100%' : phase >= 2 ? '70%' : '20%',
              transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes silk-drape {
          0% { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: translateX(120%) skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
