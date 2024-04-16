import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: "#FF6B03",
        secondary: "#ffe6c9",
        secondary1: "rgb(0,0,0,0.5)",
        sidebar: "#111111",
        dashboard: "#000000",
        dashboardText: "##969696",
        dashboardGray: "#3C3C3C",
      },
      borderColor: {
        gy: "#3C3C3C",
      },
    },
  },  
  plugins: [],
};
export default config;
