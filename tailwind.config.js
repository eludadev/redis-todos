const defaultTheme = require('tailwindcss/defaultTheme')
const defaultColors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: defaultColors.amber,
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
