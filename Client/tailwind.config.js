module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Archivos de JavaScript y JSX en tu proyecto
    "./public/index.html", // Archivo HTML principal
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // screens: {
    //   'tablet': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // }
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans"],
      },
    },
  },
  plugins: [],
};
