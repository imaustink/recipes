/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app.html",
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
