/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#00BFFF',
        secondary: '#32CD32',
        accent: '#FF1493',
        surface: '#FFF8E1',
        background: '#F0F8FF',
        success: '#00FF7F',
        warning: '#FFD700',
        error: '#FF4500',
        info: '#00CED1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.08)',
        'soft-lg': '0 4px 16px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}