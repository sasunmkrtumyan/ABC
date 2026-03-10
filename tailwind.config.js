/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B3D91",
          red: "#D90012",
          orange: "#F2A800",
          light: "#EDF4FF",
          dark: "#061C44",
        },
      },
      boxShadow: {
        glow: "0 20px 60px rgba(11, 61, 145, 0.28)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 15%, rgba(242, 168, 0, 0.2), transparent 40%), radial-gradient(circle at 80% 20%, rgba(217, 0, 18, 0.18), transparent 36%), linear-gradient(135deg, #0B3D91 0%, #061C44 100%)",
      },
    },
  },
  plugins: [],
};
