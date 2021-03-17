/** @type {import('@sveltejs/kit').Config} */
const sveltePreprocess = require( "svelte-preprocess" );

module.exports = {
	compilerOptions: { 
		hydratable: true,
	},
	kit: {
		adapter: "@sveltejs/adapter-static",
		target: "#svelte",
		files: {
			lib: "node_modules",
		},
	},
	preprocess: sveltePreprocess({
		postcss: {
			plugins: [
				require( "autoprefixer" )(),
			],
		},
	}),
};
