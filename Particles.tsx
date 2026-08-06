import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'fill' | 'outline' | 'gold' | 'ghost';
  magnetic?: boolean;
}

/** Luxury button with ripple effect + optional magnetic pull. */
export default function RippleButton({
  children,
  variant = 'fill',
  magnetic = true,
  className = '',
  onClick,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const variantClass =
    variant === 'fill'
      ? 'btn-lux-fill'
      : variant === 'outline'
      ? 'btn-lux-outline'
      : variant === 'gold'
      ? 'btn-lux-gold'
      : 'btn-lux text-ink hover:text-emerald';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ref.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'absolute rounded-full bg-white/40 animate-ripple pointer-events-none';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
    onClick?.(e);
  };

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic) return;
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };
  const handleLeave = () => {
    const btn = ref.current;
    if (btn) btn.style.transform = 'translate(0,0)';
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${variantClass} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
