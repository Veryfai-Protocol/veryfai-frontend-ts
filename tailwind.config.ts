import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
// @ts-expect-error no avaliable typing
import scrollbar from 'tailwind-scrollbar-hide';
import Colors from './src/site-settings/colors';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom:
          '0px 0px 13.683px 0px rgba(107, 114, 128, 0.24), 0px 0px 13.683px 0px rgba(107, 114, 128, 0.24), 0px 0px 13.683px 0px rgba(107, 114, 128, 0.24), 0px -2.281px 9.122px 0px rgba(0, 0, 0, 0.25) inset, 0px 2.281px 9.122px 0px rgba(0, 0, 0, 0.25) inset;',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        ...Colors,
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollReverse: {
          '0%': { transform: 'translateX(-50%)' }, // Changed this
          '100%': { transform: 'translateX(0)' }, // Changed this
        },
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        'scroll-reverse': 'scrollReverse 40s linear infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
      },
    },
  },
  plugins: [animate, scrollbar],
};

export default config;
