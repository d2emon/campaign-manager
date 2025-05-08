/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",  // Где искать классы Tailwind
        "./node_modules/@mantine/core/**/*.{js,ts,jsx,tsx}", // Где искать классы Mantine
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3B82F6',
                    50: '#EBF2FF',
                    100: '#D7E6FF',
                    200: '#B0CDFF',
                    300: '#89B4FF',
                    400: '#629BFF',
                    500: '#3B82F6',
                    600: '#0B61FF',
                    700: '#0047D3',
                    800: '#00349C',
                    900: '#002165',
                },
                dark: "#1e293b",     // Тёмный фон
                parchment: "#f5f5dc", // Пергаментный цвет для RPG-стиля
            },
        },
    },
    plugins: [],
}