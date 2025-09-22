/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // light mode
        'neut-prim': '#feffff',
        'neut-seco': '#f3f4f6',
        // dark mode
        'd-neut-prim': '#1f2a38',
        'd-neut-seco': '#0e1827',
        'd-neut-ther': '#303c4c',
        // static colors
        'prim': '#00b663',
        'notf': '#008de5',
        'notf-seco': '#0369a1',
        'error': '#dc2626',
        'warn': '#f59e0b',
      // panel modes -------------------------
        // light mode
        'neut-prim-panel': '#ffffff',
        'neut-seco-panel': '#f0f0f0',
        'neut-ther-panel': '#f7f7f7',
        // dark mode
        'd-neut-prim-panel': '#252525',
        'd-neut-seco-panel': '#191919',
        'd-neut-ther-panel': '#363636',
      }
    },
  },
  plugins: [],
}

