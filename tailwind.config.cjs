/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundColor: {
				'canvas-bg': '#FAEDE6',
				'grass': '#25562E',
			},
			fontFamily: {
				headings: 'Righteous, sans-serif',
				contents: 'Quicksand, sans-serif'
			},
			backgroundImage: {
				'bubble': 'url("/sprites/bubble.png"), url("/sprites/bug.png")',
			}
		}
	},

	plugins: []
};

module.exports = config;
