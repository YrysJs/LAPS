module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './app.vue', // если есть
    // и т.д., в зависимости от структуры
  ],
  theme: {
    extend: {
      backgroundImage: {
        'authbg': "url('/images/auth-bg.webp')",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        montserrat_alt: ['Montserrat Alternates', 'sans-serif'],
      },
    },
  },
  plugins: [],
}