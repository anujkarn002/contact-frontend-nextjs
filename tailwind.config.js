const colors = {
  transparent: "transparent",

  black: "#22292f",
  "grey-darkest": "#3d4852",
  "grey-darker": "#606f7b",
  "grey-dark": "#8795a1",
  grey: "#b8c2cc",
  "grey-light": "#dae1e7",
  "grey-lighter": "#f1f5f8",
  "grey-lightest": "#f8fafc",
  white: "#ffffff",

  "red-darkest": "#3b0d0c",
  "red-darker": "#621b18",
  "red-dark": "#cc1f1a",
  red: "#e3342f",
  "red-light": "#ef5753",
  "red-lighter": "#f9acaa",
  "red-lightest": "#fcebea",

  "orange-darkest": "#462a16",
  "orange-darker": "#613b1f",
  "orange-dark": "#de751f",
  orange: "#f6993f",
  "orange-light": "#faad63",
  "orange-lighter": "#fcd9b6",
  "orange-lightest": "#fff5eb",

  "yellow-darkest": "#453411",
  "yellow-darker": "#684f1d",
  "yellow-dark": "#f2d024",
  yellow: "#ffed4a",
  "yellow-light": "#fff382",
  "yellow-lighter": "#fff9c2",
  "yellow-lightest": "#fcfbeb",

  "green-darkest": "#0f2f21",
  "green-darker": "#1a4731",
  "green-dark": "#1f9d55",
  green: "#38c172",
  "green-light": "#51d88a",
  "green-lighter": "#a2f5bf",
  "green-lightest": "#e3fcec",

  "teal-darkest": "#0d3331",
  "teal-darker": "#20504f",
  "teal-dark": "#38a89d",
  teal: "#4dc0b5",
  "teal-light": "#64d5ca",
  "teal-lighter": "#a0f0ed",
  "teal-lightest": "#e8fffe",

  "blue-darkest": "#12283a",
  "blue-darker": "#1c3d5a",
  "blue-dark": "#2779bd",
  blue: "#3490dc",
  "blue-light": "#6cb2eb",
  "blue-lighter": "#bcdefa",
  "blue-lightest": "#eff8ff",

  "indigo-darkest": "#191e38",
  "indigo-darker": "#2f365f",
  "indigo-dark": "#5661b3",
  indigo: "#6574cd",
  "indigo-light": "#7886d7",
  "indigo-lighter": "#b2b7ff",
  "indigo-lightest": "#e6e8ff",

  "purple-darkest": "#21183c",
  "purple-darker": "#382b5f",
  "purple-dark": "#794acf",
  purple: "#9561e2",
  "purple-light": "#a779e9",
  "purple-lighter": "#d6bbfc",
  "purple-lightest": "#f3ebff",

  "pink-darkest": "#451225",
  "pink-darker": "#6f213f",
  "pink-dark": "#eb5286",
  pink: "#f66d9b",
  "pink-light": "#fa7ea8",
  "pink-lighter": "#ffbbca",
  "pink-lightest": "#ffebef",
  button: "var(--color-button-text)",
  primary: {
    100: "var(--color-primary-100)",
    200: "var(--color-primary-200)",
    300: "var(--color-primary-300)",
    600: "var(--color-primary-600)",
    700: "var(--color-primary-700)",
    800: "var(--color-primary-800)",
    900: "var(--color-primary-900)",
  },
  secondary: {
    DEFAULT: "var(--color-secondary)",
    "washed-out": "var(--color-secondary-washed-out)",
  },
  accent: {
    DEFAULT: "var(--color-accent)",
    hover: "var(--color-accent-hover)",
    disabled: "var(--color-accent-disabled)",
  },
  error: {
    DEFAULT: "var(--color-error)",
    hover: "var(--color-error-hover)",
  },
};

// const purgeEnabled = false
const purgeEnabled = process.env.NODE_ENV === "production";

console.log("\n");
console.log(`   TailwindCSS \n`);
console.log(`   ----------- \n`);
console.log(`   ✅ purgeEnabled=${purgeEnabled}\n`);

module.exports = {
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./modules/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./public/index.html"
    ],
    options: {
      safelist: ["h-8", "h-11"],
    },
  },
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    fontSize: {
      tiny: "0.625rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      4: "4px",
      2: "2px",
    },
    extend: {
      colors,
      boxShadow: {
        green: "0 12px 12px 0 var(--color-secondary)",
      },
      height: {
        "h-16": "16rem",
        "h-18": "18rem",
        "h-20": "20rem",
      },
      borderRadius: {
        5: "5px",
        8: "8px",
        40: "40px",
      },
      borderColor: {
        "color-800": "var(--color-primary-800)",
      },
      outline: {
        "no-chrome": "none",
      },
      transitionTimingFunction: {
        "in-out-hard": "cubic-bezier(.77, 0, .175, 1)",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    textColor: ({ after }) => after(["disabled"]),
    scrollbar: ["rounded", "dark"],
    extend: {
      borderWidth: ["last"],
      display: ["group-hover"],
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
