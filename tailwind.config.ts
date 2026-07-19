import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        baby: {
          50: '#FDFBF7', // Cream
          100: '#F5F1E7', // Light Beige
          200: '#EBE3D5', // Beige
          300: '#DFD3C3',
          400: '#C7B7A3',
          800: '#5C5449',
          900: '#3D3831',
        },
        cloud: {
          50: '#F2F6FA',
          100: '#E0EAF5',
          200: '#C1D5EB',
          300: '#94B4D6',
          400: '#7599C2',
          800: '#2A4365',
        },
        silver: {
          100: '#F0F1F2',
          300: '#D1D5D8',
          400: '#B0B5B9',
          500: '#8E959A',
        },
        gold: {
          100: '#FBF8F1',
          300: '#F2DEBA',
          400: '#E8C58D',
          500: '#D5A449', // Gold accent
          600: '#B08436',
          900: '#4D3814',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config
