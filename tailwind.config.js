/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c3d5ff',
          300: '#94b4ff',
          400: '#5c84ff',
          500: '#3b5bf6',
          600: '#253ea8',
          700: '#1d3087',
          800: '#1a276e',
          900: '#0b0f19',
          950: '#060811',
        },
        accent: {
          cyan: '#00f2fe',
          violet: '#7928ca',
          pink: '#ff0080',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(59, 91, 246, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 242, 254, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
