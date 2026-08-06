import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, Wand2 } from 'lucide-react';
import { products, type Product } from '@/lib/products';

interface Msg {
  role: 'assistant' | 'user';
  text: string;
  picks?: Product[];
}

const quickPrompts = [
  'I have a winter wedding',
  'A cocktail party this weekend',
  'Everyday modest wear',
  'A gift for my mother',
];

/** Lightweight rule-based stylist that recommends from the catalog. */
function recommend(input: string): Product[] {
  const q = input.toLowerCase();
  const score = (p: Product) => {
    let s = 0;
    if (/wedding|bride|bridal|shaadi/.test(q) && /bridal|wedding|reception/i.test(p.occasion + p.category)) s += 4;
    if (/cocktail|party|evening|soiree/.test(q) && /cocktail|party/i.test(p.occasion)) s += 4;
    if (/modest|hijab|abaya/.test(q) && /modest|abayas|hijabs/i.test(p.occasion + p.category)) s += 4;
    if (/everyday|casual|daily|work/.test(q) && /everyday/i.test(p.occasion)) s += 4;
    if (/saree|sari/.test(q) && /saree/i.test(p.category)) s += 4;
    if (/lehenga|lehenga/.test(q) && /lehenga/i.test(p.category)) s += 4;
    if (/gift|mother|mum|mom/.test(q)) s += p.bestSeller ? 2 : 0;
    if (/red|ruby|ruby/.test(q) && p.colours.some((c) => /ruby|red/i.test(c.name))) s += 2;
    if (/green|emerald/.test(q) && p.colours.some((c) => /emerald|green/i.test(c.name))) s += 2;
    if (/gold|champagne/.test(q) && p.colours.some((c) => /champagne|gold/i.test(c.name))) s += 2;
    if (/budget|affordable|under/.test(q) && p.price < 40000) s += 2;
    if (/luxury|premium|expensive|couture/.test(q) && p.price > 100000) s += 2;
    s += p.rating / 2;
    return s;
  };
  return [...products].sort((a, b) => score(b) - score(a)).slice(0, 3);
}

export default function AIStyleAssistant({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (p: Product) => void;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: 'assistant',
      text: 'Namaste. I am Élise, your virtual stylist. Tell me about the occasion, a colour you love, or a budget — and I will curate three pieces for you.',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const picks = recommend(text);
      setTyping(false);
      setMsgs((m) => [
        ...m,
        {
          role: 'assistant',
          text: picks.length
            ? 'Based on what you described, these three pieces feel right for you. Tap any to look closer.'
            : 'Tell me a little more — the occasion, a colour, or a price range — and I will refine my picks.',
          picks,
        },
      ]);
    }, 1100);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1400] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-md animate-fade-in" onClick={onClose} />
      <div className="relative flex h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[2rem] bg-ivory shadow-luxury-lg animate-fade-up sm:h-[80vh] sm:rounded-[2rem]">
        <header className="flex items-center justify-between border-b border-ink/10 bg-emerald px-5 py-4 text-ivory">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne text-ink">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="font-serif text-xl">Élise Style Assistant</h2>
              <p className="text-[0.65rem] uppercase tracking-wide-2 text-ivory/70">Your virtual stylist</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close"><X size={22} /></button>
        </header>

        <div className="hide-scrollbar flex-1 space-y-4 overflow-y-auto p-5">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-emerald text-ivory'
                    : 'bg-ivory-200 text-ink'
                }`}
              >
                <p>{m.text}</p>
                {m.picks && m.picks.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {m.picks.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onPick(p)}
                        className="flex w-full items-center gap-3 rounded-xl bg-white/80 p-2 text-left transition-colors hover:bg-white"
                      >
                        <img src={p.image} alt={p.name} className="h-16 w-14 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="truncate font-serif text-base text-ink">{p.name}</p>
                          <p className="text-[0.65rem] uppercase tracking-wide-2 text-stone-500">{p.category}</p>
                          <p className="mt-0.5 text-sm text-emerald">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-ivory-200 px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-stone-400"
                      style={{ animation: `float-soft 1s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-ink/10 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-ink/15 px-3 py-1.5 text-[0.65rem] uppercase tracking-wide-2 text-stone-600 transition-colors hover:border-emerald hover:text-emerald"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5"
          >
            <Wand2 size={18} className="text-champagne-500" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your moment…"
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-stone-400 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-ivory transition-colors hover:bg-emerald-600"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
