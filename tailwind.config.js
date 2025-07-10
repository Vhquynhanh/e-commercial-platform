/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        primary: {
          100: "#E01F27",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        dark: {
          100: "#202020",
          110: "#77172E",
          120: "#692B17",
          130: "#7C4A03",
          137: "#757575",
          138: "#D4D4D4",
          139: "#383838",
          140: "#264D3B",
          150: "#0C625D",
          160: "#256377",
          170: "#284255",
          180: "#472E5B",
          190: "#6C394F",
          200: "#191919",
          210: "#4B443A",
          220: "#232427",
          230: "#FAAFA8",
          240: "#F39F76",
          250: "#000000",
          260: "#FFF8B8",
          270: "#E2F6D3",
          280: "#B4DDD3",
          290: "#D4E4ED",
          300: "#323232",
          310: "#AECCDC",
          320: "#D3BFDB",
          330: "#F6E2DD",
          340: "#E9E3D4",
          360: "#EFEFF1",
          400: "#FFFFFF",
          450: "#F5F5F8",
          500: "#5E5E5E",
          550: "#00A6FF",
          600: "#18090A",
          650: "#280000",
          700: "#850000",
          750: "#450000",
          800: "#23000A",
          850: "#61677A",
          900: "#0A0909",
          950: "#61677A"
        },
        light: {
          100: "#FFFFFF",
          110: "#FAAFA8",
          120: "#F39F76",
          124: "#CCE3FE",
          125: "#0071F9",
          126: "#CCEFD7",
          127: "#00B135",
          128: "#F9D2D4",
          129: "#E01F27",
          130: "#FFF8B8",
          131: "#E64C52",
          132: "#B8B6B6",
          137: "#999999",
          140: "#E2F6D3",
          150: "#B4DDD3",
          160: "#D4E4ED",
          170: "#AECCDC",
          180: "#D3BFDB",
          190: "#F6E2DD",
          200: "#666666",
          210: "#E9E3D4",
          220: "#EFEFF1",
          230: "#77172E",
          240: "#692B17",
          250: "#780000",
          260: "#7C4A03",
          270: "#264D3B",
          280: "#0C625D",
          290: "#256377",
          300: "#959595",
          310: "#284255",
          320: "#472E5B",
          330: "#6C394F",
          340: "#4B443A",
          350: "#FFE9ED",
          360: "#232427",
          400: "#3F00FF",
          450: "#E7E7E7",
          500: "#FFFFFF",
          550: "#61677A",
          600: "#666666",
          650: "#000000",
          700: "#F9EEEE",
          800: "#FFF4F4",
          900: "#F9A9A9",
          950: "#F5F5F5"
        },
        border: {
          100: "#808080"
        },
        line: {
          100: "#D9D9D9"
        },
        other: {
          "alert-info": "#0071F9",
          "alert-success": "#34C759",
          "alert-error": "#E01F27",
          "alert-warning": "#F1C218"
        }
      },
      screens: {
        xs: "420px"
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: 0
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: 0
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide")
  ]
};
