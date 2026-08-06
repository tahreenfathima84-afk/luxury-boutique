import { useEffect, useRef, useState } from 'react';

/** Soft mouse-follow glow + luxury custom cursor with hover-grow. */
export default function LuxCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('has-lux-cursor');

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement;
      setHovering(
        !!t.closest('a, button, [data-cursor="hover"], input, textarea, select, label')
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-lux-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(197,165,114,0.22) 0%, rgba(11,93,75,0.10) 40%, transparent 70%)',
          transition: 'opacity 0.4s ease',
          mixBlendMode: 'screen',
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-champagne/70 transition-[width,height,background-color,border-color] duration-300 ease-luxury"
        style={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          backgroundColor: hovering ? 'rgba(197,165,114,0.14)' : 'transparent',
          scale: down ? '0.8' : '1',
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-emerald"
        aria-hidden
      />
    </>
  );
}
