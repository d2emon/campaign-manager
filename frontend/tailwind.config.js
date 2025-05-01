module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",  // Где искать классы Tailwind
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",  // Синий (как в Bootstrap)
                dark: "#1e293b",     // Тёмный фон
                parchment: "#f5f5dc", // Пергаментный цвет для RPG-стиля
            },
        },
    },
    plugins: [],
}