// import type { Config } from "tailwindcss"

// const config: Config = {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}"
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "(var(--background))",
//         foreground: "(var(--foreground))",
//         card: {
//           DEFAULT: "(var(--card))",
//           foreground: "(var(--card-foreground))"
//         },
//         popover: {
//           DEFAULT: "(var(--popover))",
//           foreground: "(var(--popover-foreground))"
//         },
//         primary: {
//           DEFAULT: "(var(--primary))",
//           foreground: "(var(--primary-foreground))"
//         },
//         secondary: {
//           DEFAULT: "(var(--secondary))",
//           foreground: "(var(--secondary-foreground))"
//         },
//         muted: {
//           DEFAULT: "(var(--muted))",
//           foreground: "(var(--muted-foreground))"
//         },
//         accent: {
//           DEFAULT: "(var(--accent))",
//           foreground: "(var(--accent-foreground))"
//         },
//         destructive: {
//           DEFAULT: "(var(--destructive))",
//           foreground: "(var(--destructive-foreground))"
//         },
//         border: "(var(--border))",
//         input: "(var(--input))",
//         ring: "(var(--ring))",
//         chart: {
//           "1": "(var(--chart-1))",
//           "2": "(var(--chart-2))",
//           "3": "(var(--chart-3))",
//           "4": "(var(--chart-4))",
//           "5": "(var(--chart-5))"
//         }
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)"
//       }
//     }
//   },
//   plugins: [require("tailwindcss-animate")]
// }
// export default config

import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      outline: {
        dotted: ['1px dotted #000', '1px'], // This adds a dotted outline variant
      },
      cursor: {
        'wait': 'url(/wait.png), default',
      },
      boxShadow: {
        in: "var(--shadow-in)",
        out: "var(--shadow-out)",
        input: "var(--shadow-input)",
        active: "var(--shadow-active)",
        inactive: "var(--shadow-inactive)",
        button: "var(--shadow-button-active)"
      },
      colors: {
        background: "var(--background)",
        anchor: {
          DEFAULT: "var(--anchor)",
          visited: "var(--anchor-visited)"
        },
        border: {
          light: "var(--border-light)",
          lighter: "var(--border-lighter)",
          lightest: "var(--border-lightest)",
          dark: "var(--border-dark)",
          darkest: "var(--border-darkest)"
        },
        canvas: {
          DEFAULT: "var(--canvas)",
          text: "var(--canvas-text)"
        },
        header: {
          background: "var(--header-background)",
          text: "var(--header-text)",
          inactive: {
            background: "var(--header-not-active-background)",
            text: "var(--header-not-active-text)"
          }
        },
        material: {
          DEFAULT: "var(--material)",
          text: {
            DEFAULT: "var(--material-text)",
            invert: "var(--material-text-invert)",
            disabled: {
              DEFAULT: "var(--material-text-disabled)",
              shadow: "var(--material-text-disabled-shadow)"
            }
          }
        },
        progress: "var(--progress)",
        input: {
          background: {
            DEFAULT: "var(--input-background)",
            disabled: "var(--input-background-disabled)"
          }
        },
        shadow: {
          in: "var(--shadow-in)",
          out: "var(--shadow-out)",
          input: "var(--shadow-input)"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
export default config
