import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#011f26", // Deep oceanic midnight teal
        surface: "#002d37",    // Deep ocean base
        "surface-raised": "#003b47",
        "surface-card": "#004d5d", // Signature brand teal from logo
        ocean: {
          950: "#011419",
          900: "#011f26", // Darkest abyss
          800: "#002d37",
          700: "#003b47",
          600: "#004d5d", // Brand teal background
          500: "#086275",
          400: "#0f778d",
          300: "#22a2bb",
          200: "#60cde3",
          100: "#b5eaf4",
          50: "#eafafc",
        },
        coral: {
          50: "#fff5f5",
          100: "#ffe8e8",
          200: "#ffd0d1",
          300: "#ffa8aa",
          400: "#ff8284",
          500: "#ff696b", // Exact signature coral from "Vista"
          600: "#f04d50",
          700: "#cb3538",
          800: "#a72e30",
          900: "#8a2b2d",
        },
        gold: {
          50: "#FFFDF5",
          100: "#FDF8E7",
          200: "#FAF0CE",
          300: "#F5E4A7",
          400: "#EED279",
          500: "#D4AF37",
          600: "#B89225",
          700: "#8F6E18",
          800: "#695013",
          900: "#4A380E",
        },
        sand: {
          50: "#f6fbfa",
          100: "#edf7f9",
          200: "#dbedf1",
          300: "#c0dfe6",
          400: "#9ecad4",
          500: "#74aebc",
          600: "#5a92a0",
          700: "#497784",
          800: "#3d626c",
          900: "#243c43",
        },
        azure: {
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
        },
        emerald: {
          400: "#34D399",
          500: "#10B981",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        italiana: ["var(--font-italiana)", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(to bottom, #011f26 0%, #002d37 50%, #004d5d 100%)",
        "coral-shimmer": "linear-gradient(135deg, #ffa8aa 0%, #ff696b 50%, #cb3538 100%)",
        "brand-glow": "radial-gradient(circle, rgba(255,105,107,0.18) 0%, rgba(0,77,93,0) 70%)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
