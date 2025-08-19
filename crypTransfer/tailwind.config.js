/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        web3: '#0B0F19',
        'web3-card': '#0F1629',
        'web3-accent': '#00FFC2',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,255,194,0.25)',
      }
    },
  },
  plugins: [],
}
