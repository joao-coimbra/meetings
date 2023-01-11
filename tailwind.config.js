/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"base-color": "#1972b9",
				"secondary-color": "#50a7ee",
				"secondary-color-hover": "#6bb8f7",
				"terciary-color": "#ff5722",
			},
			animation: {
				bellbeating: "bellbeating 1s ease-in-out infinite",
			},
			keyframes: {
				bellbeating: {
					"0%, 40%": { transform: "rotate(0deg)" },
					"50%, 80%": { transform: "rotate(-3deg)" },
					"65%": { transform: "rotate(3deg)" },
				},
			},
		},
	},
	plugins: [require("prettier-plugin-tailwindcss")],
};
