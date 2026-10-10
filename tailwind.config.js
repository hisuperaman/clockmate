/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["poppins"],
				"poppins-black": ["poppins-black"],
				"poppins-bold": ["poppins-bold"],
				"poppins-extra-bold": ["poppins-extra-bold"],
				"poppins-extra-light": ["poppins-extra-light"],
				"poppins-light": ["poppins-light"],
				"poppins-medium": ["poppins-medium"],
				"poppins-semibold": ["poppins-semibold"],
				"poppins-thin": ["poppins-thin"],
			},
		},
	},
	plugins: [],
};
