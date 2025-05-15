/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Using Tailwind's built-in colors that closely match the target palette:
            // Component colors:
            // 3A506B -> slate-600
            // 1C2541 -> slate-900
            // 5BC0BE -> teal-400
            // Text colors:
            // 0B132B -> slate-950
            // FFFFFF -> white
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.scrollbar-hide': {
                    /* IE and Edge */
                    '-ms-overflow-style': 'none',
                    /* Firefox */
                    'scrollbar-width': 'none',
                    /* Safari and Chrome */
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                },
            }
            addUtilities(newUtilities)
        }
    ],
}