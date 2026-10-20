import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        /* Channel form + <alpha-value> so opacity modifiers compile.
           (Tailwind can't add alpha to a value already wrapped in hsl().) */
        background: "hsl(var(--background-ch) / <alpha-value>)",
        foreground: "hsl(var(--foreground-ch) / <alpha-value>)",
        canvas: "hsl(var(--canvas-ch) / <alpha-value>)",
        "canvas-inset": "hsl(var(--canvas-inset-ch) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card-ch) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground-ch) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover-ch) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground-ch) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary-ch) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground-ch) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary-ch) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground-ch) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted-ch) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground-ch) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-ch) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground-ch) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive-ch) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground-ch) / <alpha-value>)",
        },
        border: "hsl(var(--border-ch) / <alpha-value>)",
        input: "hsl(var(--input-ch) / <alpha-value>)",
        ring: "hsl(var(--ring-ch) / <alpha-value>)",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-ch) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground-ch) / <alpha-value>)",
          primary: "hsl(var(--sidebar-primary-ch) / <alpha-value>)",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground-ch) / <alpha-value>)",
          accent: "hsl(var(--sidebar-accent-ch) / <alpha-value>)",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground-ch) / <alpha-value>)",
          border: "hsl(var(--sidebar-border-ch) / <alpha-value>)",
          ring: "hsl(var(--sidebar-ring-ch) / <alpha-value>)",
        },
        "ms-blue": "hsl(var(--ms-blue-ch) / <alpha-value>)",
        "ms-blue-hover": "hsl(var(--ms-blue-hover-ch) / <alpha-value>)",
        "ms-blue-light": "hsl(var(--ms-blue-light-ch) / <alpha-value>)",
        "ms-gray": "hsl(var(--ms-gray-ch) / <alpha-value>)",
        "ms-gray-secondary": "hsl(var(--ms-gray-secondary-ch) / <alpha-value>)",
        "ms-gray-light": "hsl(var(--ms-gray-light-ch) / <alpha-value>)",
        "ms-gray-border": "hsl(var(--ms-gray-border-ch) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        system: ["var(--font-sans)"],
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      spacing: {
        '280': '280px',
      },
      fontSize: {
        'xs': ['0.75rem', '1rem'],
        'sm': ['0.875rem', '1.25rem'],
        'base': ['1rem', '1.5rem'],
        'lg': ['1.125rem', '1.75rem'],
        'xl': ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
