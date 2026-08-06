import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, MessageCircle, Send, Check, type LucideIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useReveal } from '@/lib/hooks';
import RippleButton from '@/components/RippleButton';
import { SectionHeading } from '@/components/Sections';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const ref = useReveal<HTMLDivElement>();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes('@') || !form.message) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_messages').insert(form);
      if (error) throw error;
      setStatus('ok');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-28 md:pt-32">
      <section className="mx-auto max-w-[1300px] px-6">
        <SectionHeading
          eyebrow="Concierge"
          title="We would love to hear from you"
          subtitle="Whether it is a bespoke commission, a styling question or a press enquiry — our concierge replies within one business day."
          align="left"
        />
      </section>

      <section className="mx-auto mt-12 max-w-[1300px] px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* form */}
          <div ref={ref} className="reveal rounded-[2rem] bg-ivory-100 p-7 shadow-glass md:p-10">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="lux-input"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="lux-input"
                    placeholder="you@email.com"
                  />
                </Field>
              </div>
              <Field label="Subject">
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="lux-input"
                  placeholder="How can we help?"
                />
              </Field>
              <Field label="Message">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="lux-input resize-none"
                  placeholder="Tell us about your moment…"
                />
              </Field>

              <RippleButton type="submit" variant="fill" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : (<><Send size={15} /> Send Message</>)}
              </RippleButton>

              {status === 'ok' && (
                <p className="flex items-center gap-2 text-sm text-emerald">
                  <Check size={16} /> Thank you — your message is on its way.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-ruby">Please complete all fields with a valid email.</p>
              )}
            </form>
          </div>

          {/* details */}
          <div className="space-y-6">
            <ContactCard icon={Phone} label="Call the concierge" value="+91 98200 11234" sub="Mon–Sat, 10am–8pm IST" href="tel:+919820011234" />
            <ContactCard icon={Mail} label="Email us" value="concierge@maisonelise.com" sub="Replies within 1 business day" href="mailto:concierge@maisonelise.com" />
            <ContactCard icon={MessageCircle} label="WhatsApp" value="+91 98200 11234" sub="Quick questions & order updates" href="https://wa.me/919820011234" />
            <ContactCard icon={Instagram} label="Instagram" value="@maisonelise" sub="Daily edits & behind-the-atelier" href="https://instagram.com" />

            <div className="rounded-[2rem] bg-emerald p-7 text-ivory">
              <div className="flex items-center gap-2 text-champagne-300">
                <Clock size={18} />
                <h3 className="text-[0.7rem] uppercase tracking-wide-2">Boutique Hours</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex justify-between"><span>Monday – Friday</span><span className="text-ivory/80">10:00 – 20:00</span></li>
                <li className="flex justify-between"><span>Saturday</span><span className="text-ivory/80">10:00 – 21:00</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="text-ivory/80">By appointment</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* map */}
        <div className="mt-12 overflow-hidden rounded-[2rem] shadow-glass">
          <iframe
            title="Maison Élise boutique location"
            src="https://www.google.com/maps?q=Colaba%20Mumbai&output=embed"
            className="h-[380px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-stone-500">
          <MapPin size={15} className="text-champagne-500" />
          24 Heritage Lane, Colaba, Mumbai 400001
        </div>
      </section>

      <style>{`
        .lux-input {
          width: 100%;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(26,23,20,0.12);
          border-radius: 0.9rem;
          padding: 0.85rem 1rem;
          font-size: 0.875rem;
          color: #1a1714;
          transition: border-color .3s, box-shadow .3s;
        }
        .lux-input:focus {
          outline: none;
          border-color: #c5a572;
          box-shadow: 0 0 0 3px rgba(197,165,114,0.18);
        }
        .lux-input::placeholder { color: #8a8278; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] uppercase tracking-wide-2 text-stone-500">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ContactCard({
  icon: Icon, label, value, sub, href,
}: {
  icon: LucideIcon;
  label: string; value: string; sub: string; href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-[1.5rem] border border-ink/10 bg-ivory-100 p-5 transition-all hover:border-champagne hover:shadow-glass"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald group-hover:text-ivory">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[0.65rem] uppercase tracking-wide-2 text-stone-500">{label}</p>
        <p className="font-serif text-lg text-ink">{value}</p>
        <p className="text-xs text-stone-400">{sub}</p>
      </div>
    </a>
  );
}
