/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A3D62',
        accent: '#1B7FCC',
        light: '#EAF4FF',
      },
      boxShadow: {
        card: '0 10px 30px rgba(10, 61, 98, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
