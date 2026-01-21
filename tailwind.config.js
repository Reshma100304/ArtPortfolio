/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#d97706', // amber-600
                    light: '#fbbf24',   // amber-400
                },
            },
            animation: {
                'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
            },
            keyframes: {
                'bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '0.7' },
                    '50%': { opacity: '1' },
                }
            },
        },
    },
    plugins: [],
}
