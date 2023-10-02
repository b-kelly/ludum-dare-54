/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundColor: {
				'canvas-bg': '#FAEDE6'
			},
			fontFamily: {
				headings: 'Righteous, sans-serif',
				contents: 'Quicksand, sans-serif'
			}
		}
	},

	plugins: []
};

module.exports = config;
