/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		colors: {
			...colors,
			theme: "#1ABC9C",
			theme2: "#A5D6D3",
			textPrimary: "#E0E0E0",
			defaultBg: "#121212"
		},
		fontFamily: {
			roboto: ["Roboto", "sans-serif"],
			slab: ["Roboto Slab", "serif"],
		},
	},
	daisyui: {
		themes: ["black"],
	},
	plugins: [require("daisyui")],
};
