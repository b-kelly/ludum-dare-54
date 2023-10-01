/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundImage: {
				'museum-paint': "url('/sprites/background-paint.png')",
				'museum-review': "url('/sprites/background-review.png')",
				'bug': "url('/sprites/bug.png')"
			},
			backgroundColor: {
				'easel-fore': '#AD7757',
				'canvas-bg': "#FAEDE6",
				'critics': "#3C5E8B",
			},
			colors: {
				'easel-back': '#7A4841'
			},
			fontFamily: {
				'headings': 'Righteous, sans-serif',
				'contents': 'Quicksand, sans-serif',
			}
		},
	},

	plugins: []
};

module.exports = config;
