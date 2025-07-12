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
          100: "#DBEAFE", // tương đương blue-100
          200: "#bfdbfe", // blue-200
          300: "#93C5FD", // blue-300 (hover dark mode)
          400: "#60a5fa", // blue-400 (hover light mode)
          500: "#3b82f6", // blue-500 (text)
          600: "#2563EB", // blue-600 (logo)
          700: "#1D4ED8", // blue-700 (text active)
          800: "#1E40AF", // blue-800 (background active)
          900: "#1E3A8A" // blue-900 (dark background active)
        },
        dark: {
          100: "#1F2937", // gray-800 (dark background)
          600: "#4b5563", // gray-600
          700: "#374151", // gray-700
          900: "#111827" // dark base background (nếu cần)
        },
        light: {
          50: "#f9fafb", // gray-50
          100: "#FFFFFF", // white
          120: "#ffffffE6", // white with 90% opacity
          150: "#F3F4F6", // gray-100
          200: "#e5e7eb", // gray-200
          300: "#D1D5DB", // gray-300
          400: "#9ca3af", // gray-400
          500: "#6b7280" // gray-500
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
