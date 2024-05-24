// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "main-light": {
          extend: "light",
          colors: {
            foreground: "#0D001A",
            background: "#ffffff",
            primary: {
              100: "#D7FEF9",
              200: "#B0FEFA",
              300: "#88F9FC",
              400: "#6AECFA",
              500: "#3AD6F7",
              600: "#2AA9D4",
              700: "#1D81B1",
              800: "#125D8F",
              900: "#0B4376",
              DEFAULT: "#3AD6F7",
              foreground: "#ffffff",
            },
            success: {
              100: "#F3FBCB",
              200: "#E6F899",
              300: "#CDEA64",
              400: "#B0D53D",
              500: "#8ABA09",
              600: "#729F06",
              700: "#5B8504",
              800: "#466B02",
              900: "#375901",
              DEFAULT: "#8ABA09",
              foreground: "#ffffff",
            },
            info: {
              100: "#D2FAFF",
              200: "#A4F0FF",
              300: "#78E0FF",
              400: "#56CEFF",
              500: "#1EB0FF",
              600: "#1589DB",
              700: "#0F67B7",
              800: "#094993",
              900: "#05347A",
              DEFAULT: "#1EB0FF",
              foreground: "#ffffff",
            },
            warning: {
              100: "#FFF5D0",
              200: "#FFE9A1",
              300: "#FFD972",
              400: "#FFC94E",
              500: "#FFB014",
              600: "#DB8F0E",
              700: "#B7710A",
              800: "#935506",
              900: "#7A4203",
              DEFAULT: "#FFB014",
              foreground: "#ffffff",
            },
            danger: {
              100: "#FFE6DA",
              200: "#FFC8B6",
              300: "#FFA391",
              400: "#FF8076",
              500: "#FF494C",
              600: "#DB3546",
              700: "#B72440",
              800: "#93173A",
              900: "#7A0E35",
              DEFAULT: "#FF494C",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};
