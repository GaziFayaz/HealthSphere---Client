/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		colors: {
			...colors,
			theme: "#08C78E",
			theme2: "#CAF2E1",
			textPrimary: "#E0E0E0",
			defaultBg: "#121212"
		},
		fontFamily: {
			roboto: ["Roboto", "sans-serif"],
			slab: ["Roboto Slab", "serif"],
		},
	},
	daisyui: {
		themes: ["dark"],
	},
	plugins: [require("daisyui")],
};
