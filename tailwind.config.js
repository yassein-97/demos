/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: "#ebf7ea",
          100: "#b0e0ac",
          200: "#71c76b",
          300: "#59bf53",
          400: "#0aad0a",
          500: "#0aad0a",
          600: "#057f05",
          700: "#025502",
          800: "#012d01",
          900: "#001b00",
        },
      },
      fontFamily: {
        cairo: "Cairo Variable",
      },
      screens: {
        lg: "1000px",
        xl: "1200px",
        "2xl": "1500px",
      },
    },
  },
  plugins: [],
};
