import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors from CLAUDE.md
        'brand-cream': '#F8F4E6',
        'brand-dark': '#2C2C2C',
        'brand-blue': '#152885', // From Figma design

        // CSS variable colors for dynamic theming
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Coffee color palette - rich browns
        coffee: {
          50: '#f9f6f3',
          100: '#f3ede7',
          200: '#e7dbcf',
          300: '#d4bfa8',
          400: '#bf9d7f',
          500: '#a87c58',
          600: '#8b6144',
          700: '#6e4d36',
          800: '#5a402e',
          900: '#4a3628',
          950: '#271b14',
        },

        // Cream color palette - warm neutrals
        cream: {
          DEFAULT: '#faf8ef', // Updated from Figma design
          50: '#fdfcf8',
          100: '#faf8ef',
          200: '#f5edda',
          300: '#efdfc0',
          400: '#e7cb9d',
          500: '#ddb37a',
          600: '#c89755',
          700: '#a77944',
          800: '#88613a',
          900: '#6f5032',
          950: '#3c2918',
        },

        // Charcoal color palette - dark neutrals
        charcoal: {
          DEFAULT: '#2C2C2C', // Brand dark as default
          50: '#f6f6f7',
          100: '#e2e3e4',
          200: '#c5c6c9',
          300: '#a0a2a6',
          400: '#7b7d82',
          500: '#606268',
          600: '#4c4d52',
          700: '#3f4044',
          800: '#353638',
          900: '#2f2f31',
          950: '#1a1a1b',
        },
      },
      fontFamily: {
        'sans': ['var(--font-inria-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['var(--font-inria-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],

        // Menu typography from Figma
        'menu-large-link': ['5.063rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }], // 81.01px
        'menu-section-title': ['3.125rem', { lineHeight: '1', letterSpacing: '-0.06em', fontWeight: '400' }], // 50px
        'menu-section-subtitle': ['1.875rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '400' }], // 30px
        'menu-item-title': ['1.875rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '400' }], // 30px
        'menu-item-description': ['1.063rem', { lineHeight: '1.55', letterSpacing: '-0.01em', fontWeight: '400' }], // 17px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
      },
      minHeight: {
        'touch': '44px', // Accessibility - minimum touch target
      },
      minWidth: {
        'touch': '44px', // Accessibility - minimum touch target
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
