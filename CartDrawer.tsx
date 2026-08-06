@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ivory: #faf6ee;
  --emerald: #0b5d4b;
  --champagne: #c5a572;
  --ruby: #9b1c2e;
  --ink: #1a1714;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--ivory);
  color: var(--ink);
  font-family: 'Jost', sans-serif;
  font-weight: 300;
  overflow-x: hidden;
}

::selection {
  background: var(--emerald);
  color: var(--ivory);
}

/* Luxury scrollbar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f4ecdd;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(var(--emerald), #094d3e);
  border-radius: 999px;
  border: 2px solid #f4ecdd;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--champagne);
}

/* Hide native cursor on capable devices for the custom cursor */
@media (hover: hover) and (pointer: fine) {
  .has-lux-cursor * {
    cursor: none !important;
  }
}

@layer components {
  .font-serif {
    font-family: 'Cormorant Garamond', Georgia, serif;
  }

  .eyebrow {
    @apply text-[0.7rem] uppercase tracking-ultra-wide font-medium text-champagne-600;
  }

  .glass {
    background: rgba(250, 246, 238, 0.55);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .glass-dark {
    background: rgba(26, 23, 20, 0.45);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border: 1px solid rgba(197, 165, 114, 0.25);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px) saturate(150%);
    -webkit-backdrop-filter: blur(20px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.55);
  }

  .btn-lux {
    @apply relative inline-flex items-center justify-center gap-2 px-8 py-4 text-[0.72rem] uppercase tracking-wide-2 font-medium overflow-hidden transition-all duration-500 ease-luxury;
  }
  .btn-lux-fill {
    @apply btn-lux bg-emerald text-ivory hover:shadow-luxury;
  }
  .btn-lux-outline {
    @apply btn-lux border border-ink/30 text-ink hover:border-emerald hover:text-emerald;
  }
  .btn-lux-gold {
    @apply btn-lux bg-champagne text-ink hover:shadow-gold;
  }

  .link-underline {
    @apply relative inline-block;
  }
  .link-underline::after {
    content: '';
    @apply absolute left-0 -bottom-1 h-px w-0 bg-champagne transition-all duration-500 ease-luxury;
  }
  .link-underline:hover::after,
  .link-underline.is-active::after {
    @apply w-full;
  }

  .lux-line {
    @apply h-px bg-gradient-to-r from-transparent via-champagne to-transparent;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  /* Scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(34px);
    transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
      transform 1s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-scale {
    opacity: 0;
    transform: scale(1.06);
    transition: opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1),
      transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal-scale.is-visible {
    opacity: 1;
    transform: scale(1);
  }
  .reveal-blur {
    opacity: 0;
    filter: blur(12px);
    transition: opacity 1.2s ease, filter 1.2s ease;
  }
  .reveal-blur.is-visible {
    opacity: 1;
    filter: blur(0);
  }

  .reveal-delay-1 { transition-delay: 0.12s; }
  .reveal-delay-2 { transition-delay: 0.24s; }
  .reveal-delay-3 { transition-delay: 0.36s; }
  .reveal-delay-4 { transition-delay: 0.48s; }
  .reveal-delay-5 { transition-delay: 0.6s; }

  .parallax-img {
    will-change: transform;
  }

  .gold-text {
    background: linear-gradient(120deg, #dcc480, #b6925a, #f5ecd6, #c5a572);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-pan 8s ease infinite;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .perspective {
    perspective: 1200px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal,
  .reveal-scale,
  .reveal-blur {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}
