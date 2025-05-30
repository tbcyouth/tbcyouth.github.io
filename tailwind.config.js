/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // сканировать все файлы внутри src
  ],
  theme: {
    container: {
      center: true, // центрировать контейнер
      padding: "1rem", // отступы по бокам
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px", // кастомное значение для больших экранов
      },
    },
    extend: {
      colors: {
        primary: "#1D4ED8",    // твой основной цвет (ярко-синий)
        secondary: "#64748B",  // дополнительный цвет (серо-синий)
        accent: "#F59E0B",     // акцентный цвет (оранжевый)
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // подключим красивый шрифт
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
}
