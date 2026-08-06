import { useState } from 'react';
import { Calendar, Clock, Check, Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNav } from '@/lib/nav';
import { useReveal } from '@/lib/hooks';
import RippleButton from '@/components/RippleButton';
import { SectionHeading } from '@/components/Sections';

const interests = [
  'Bridal Couture', 'Designer Saree', 'Lehenga', 'Gown / Party Wear',
  'Modest Wear', 'Jewellery', 'Indo-Western', 'Style Consultation',
];

const slots = ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];

export default function Appointment() {
  const { navigate } = useNav();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', interest: interests[0], notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const ref = useReveal<HTMLDivElement>();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes('@') || !form.phone || !form.date || !form.time) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const { error } = await supabase.from('appointment_bookings').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferred_date: form.date,
        preferred_time: form.time,
        interest: form.interest,
        notes: form.notes,
      });
      if (error) throw error;
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-28 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald text-ivory animate-fade-up">
          <Check size={36} />
        </div>
        <h1 className="mt-8 font-serif text-4xl text-ink md:text-5xl">Appointment Requested</h1>
        <p className="mt-4 max-w-md text-sm text-stone-500">
          Thank you, {form.name.split(' ')[0]}. Our concierge will call {form.phone} within
          one business day to confirm your {form.interest} appointment on {form.date} at {form.time}.
        </p>
        <RippleButton variant="fill" className="mt-8" onClick={() => navigate('home')}>
          Return Home
        </RippleButton>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32">
      <section className="mx-auto max-w-[1300px] px-6">
        <SectionHeading
          eyebrow="Private Styling"
          title="Book a styling appointment"
          subtitle="A 90-minute private session in our Mumbai atelier — champagne, a personal stylist, and the full collection at your fingertips."
          align="left"
        />
      </section>

      <section className="mx-auto mt-12 max-w-[1300px] px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* visual */}
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800"
              alt="Maison Élise boutique interior"
              loading="lazy"
              className="h-full min-h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
              <p className="eyebrow text-champagne-300">The Experience</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  '90 minutes with a dedicated stylist',
                  'Champagne & private fitting suite',
                  'Full collection access, including archives',
                  'Complimentary alterations on couture',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Sparkles size={14} className="text-champagne-300" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* form */}
          <div ref={ref} className="reveal rounded-[2rem] bg-ivory-100 p-7 shadow-glass md:p-9">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <AptField label="Full Name">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="apt-input" placeholder="Your name" />
                </AptField>
                <AptField label="Phone">
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="apt-input" placeholder="+91 …" />
                </AptField>
              </div>
              <AptField label="Email">
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="apt-input" placeholder="you@email.com" />
              </AptField>

              <AptField label="I am interested in">
                <div className="flex flex-wrap gap-2">
                  {interests.map((it) => (
                    <button
                      key={it}
                      type="button"
                      onClick={() => setForm({ ...form, interest: it })}
                      className={`rounded-full border px-3.5 py-2 text-[0.65rem] uppercase tracking-wide-2 transition-all ${
                        form.interest === it
                          ? 'border-emerald bg-emerald text-ivory'
                          : 'border-ink/15 text-stone-600 hover:border-emerald'
                      }`}
                    >
                      {it}
                    </button>
                  ))}
                </div>
              </AptField>

              <div className="grid gap-5 sm:grid-cols-2">
                <AptField label="Preferred Date">
                  <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setForm({ ...form, date: e.target.value })} className="apt-input" />
                </AptField>
                <AptField label="Preferred Time">
                  <div className="flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, time: s })}
                        className={`rounded-full border px-3 py-1.5 text-[0.65rem] transition-all ${
                          form.time === s
                            ? 'border-emerald bg-emerald text-ivory'
                            : 'border-ink/15 text-stone-600 hover:border-emerald'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </AptField>
              </div>

              <AptField label="Notes (optional)">
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="apt-input resize-none"
                  placeholder="Tell us about your occasion or any requests…"
                />
              </AptField>

              <RippleButton type="submit" variant="fill" disabled={status === 'loading'} className="w-full">
                {status === 'loading' ? 'Requesting…' : (<><Calendar size={15} /> Request Appointment <ArrowRight size={15} /></>)}
              </RippleButton>

              {status === 'error' && (
                <p className="text-sm text-ruby">Please complete all required fields with a valid email.</p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-stone-500">
          <Clock size={15} className="text-champagne-500" />
          Appointments are available Monday–Saturday. Sunday by special request.
        </div>
      </section>

      <style>{`
        .apt-input {
          width: 100%;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(26,23,20,0.12);
          border-radius: 0.9rem;
          padding: 0.8rem 1rem;
          font-size: 0.875rem;
          color: #1a1714;
          transition: border-color .3s, box-shadow .3s;
        }
        .apt-input:focus {
          outline: none;
          border-color: #c5a572;
          box-shadow: 0 0 0 3px rgba(197,165,114,0.18);
        }
        .apt-input::placeholder { color: #8a8278; }
      `}</style>
    </div>
  );
}

function AptField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] uppercase tracking-wide-2 text-stone-500">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
