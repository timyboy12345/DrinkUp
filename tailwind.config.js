module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'google': ['Source Serif Pro', "serif"],
            },
            animation: {
                'spin-slow': 'bounceIn 0.15s linear 1',
                'fade-in': 'fadeIn 0.2s linear 1',
            },
            keyframes: {
                bounceIn: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '33%': { transform: 'translateY(2px)' },
                    '66%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '100%' },
                }
            }
        },
    },
    plugins: [],
}
