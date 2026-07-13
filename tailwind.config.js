/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alarming: '#ff5252',
        'alarming-variant': '#e42828',
        'always-white': '#ffffff',
        'always-black': '#000000',
        'always-dark': '#202124',
        'background-default': '#ffffff',
        'background-modal': 'rgba(32, 33, 36, 0.6)',
        'background-variant': '#f2f4f7',
        'brand-carpool': '#1ee592',
        'brand-waze': '#33ccff',
        cautious: '#ffc400',
        'cautious-variant': '#e37400',
        'content-default': '#202124',
        'content-p1': '#3c4043',
        'content-p2': '#55595e',
        'content-p3': '#72767d',
        'disabled-text': '#b7babf',
        'hint-text': '#72767d',
        hairline: '#d5d7db',
        'hairline-strong': '#90959c',
        'separator-default': '#e8eaed',
        safe: '#23cc68',
        'safe-variant': '#118742',
        primary: '#0075e3',
        'primary-variant': '#842feb',
        'surface-default': '#ffffff',
        'surface-alt': '#f2f4f7',
        'surface-variant': '#e8eaed',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
        'waze-boing': ['"Waze Boing"', 'Rubik', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(32, 33, 36, 0.08)',
        'elevation-2': '0 2px 6px rgba(32, 33, 36, 0.12)',
        'elevation-3': '0 4px 16px rgba(32, 33, 36, 0.16)',
      }
    },
  },
  plugins: [],
}
