/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}" // In case files are in root
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#000000',
                    card: '#1e293b',
                    text: '#f8fafc'
                }
            }
        }
    },
    plugins: [],
}
