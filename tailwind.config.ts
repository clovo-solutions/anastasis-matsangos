import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F8FA',
        ink: '#0E1624',
        navy: '#0F326D',
        graphite: '#50535E',
        accent: '#C8D4E8',
        white: '#FFFFFF',
        obsidian: '#080B10',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale. Display sizes are viewport-driven by design —
        // they are meant to be cropped by the viewport, not to fit it.
        mega: ['clamp(4rem, 13vw, 13rem)', { lineHeight: '0.84', letterSpacing: '-0.045em' }],
        colossal: ['clamp(3.25rem, 10vw, 10rem)', { lineHeight: '0.86', letterSpacing: '-0.04em' }],
        giant: ['clamp(2.5rem, 6.5vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        large: ['clamp(1.75rem, 3.4vw, 3rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        lede: ['clamp(1rem, 1.35vw, 1.25rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
        label: '0.24em',
      },
      transitionTimingFunction: {
        // Single shared easing curve. Every transition in the system uses this
        // or the spring in lib/motion.ts — nothing else.
        precision: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'dial-rotate': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        'dial-rotate': 'dial-rotate 90s linear infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
