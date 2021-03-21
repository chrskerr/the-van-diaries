
const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
	plugins: [
		require( "@fullhuman/postcss-purgecss" )({
			content: [ "./**/*.html", "./**/*.svelte" ],
			safelist:{ 
				standard: [ /leaflet/, /^s-/, /^svelte-/ ],
			},
		}),
		require( "postcss-preset-env" )({ stage: 1 }),
		require( "autoprefixer" ),
		!dev && require( "cssnano" )({
			preset: "default",
		}),
	],
};