/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"base-color": "#1972b9",
				"secondary-color": "#50a7ee",
				"secondary-color-hover": "#6bb8f7",
				"terciary-color": "#ff5722",
			},
		},
	},
	plugins: [],
};
