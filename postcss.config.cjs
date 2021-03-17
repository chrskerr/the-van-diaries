const purgecss = require( "@fullhuman/postcss-purgecss" );

module.exports = {
	plugins: [
		purgecss({
			content: [ "./src/**/*.html", "./src/**/*.svelte" ],
			css: [ "./**/*.css " ],
			safelist:{ 
				standard: [ /leaflet/, /^s-/, /^svelte-/ ],
			},
		}),
	],
};
