module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: "hsl(179, 81%, 29%)",
      "primary-600": "hsl(179, 55%, 61%)",
      accent: "hsl(25, 94%, 86%)",
      prose: "hsl(215, 19%, 25%)",
      cream: "hsl(43, 78%, 98%)",
      gray: "hsl(215, 5%, 54%)",
      disabled: "hsl(25, 11%, 87%)"
    },
    fontFamily: {
      "serif": ["Fraunces", "serif"],
      "sans": ["Barlow", "sans"],
    },
    fontSize: {
      3: "0.75rem",
      "base-sm": "0.9375rem",
      base: "1rem",
      "base-lg": "1.125rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      18: "4.5rem",
      24: "6rem",
      "v-large": "9.375rem",
    },
    lineHeight: {
      base: "1.625",
      tight: "1.33",
      tigher: "1.125",
      none: "1",
      half: "0.48",
    },
    extend: {
      screens: {
        "coffee-sm": "765px",
        "coffee-lg": "1230px"
      },
      spacing: {
        18: "4.5rem",
        25: "6.25rem",
        30: "7.5rem",
        34: "8.5rem",
        50: "12.5rem"
      },
      backgroundImage: {
        'hero': `url("/assets/home/mobile/image-hero-coffeepress.jpg")`,
        'hero-sm': `url("/assets/home/tablet/image-hero-coffeepress.jpg")`,
        'hero-md': `url("/assets/home/desktop/image-hero-coffeepress.jpg")`,
      },
      borderRadius: {
        10: "0.625em"
      }
    }
  },
};
