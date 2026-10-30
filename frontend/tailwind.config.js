/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./public/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        recipedia: {
          bg: '#FAF9F6',
          'bg-secondary': '#F1F0E9',
          primary: '#526B50',
          'primary-hover': '#435842',
          secondary: '#809276',
          accent: '#D98B55',
          'accent-hover': '#C57741',
          text: '#282B25',
          'text-muted': '#77796F',
          card: '#FFFFFF',
          border: '#EAE8E0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(40, 43, 37, 0.04)',
        'card': '0 4px 20px rgba(40, 43, 37, 0.06)',
        'float': '0 12px 36px rgba(40, 43, 37, 0.12)',
      }
    },
  },
  plugins: [],
}
