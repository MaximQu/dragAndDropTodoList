/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#090d1f",
				secondary: "#d6dbdc",
			},
			container: {
				center: true,
				padding: "1rem",
				screens: {
					"3xs": "320px",
					"2xs": "375px",
					xs: "480px",
					sm: "575px",
					md: "768px",
					lg: "991px",
					xl: "1199px",
					"2xl": "1399px",
				},
			},
			screens: {
				"3xs": "320px",
				"2xs": "375px",
				xs: "480px",
				sm: "575px",
				md: "768px",
				lg: "991px",
				xl: "1199px",
				"2xl": "1399px",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
