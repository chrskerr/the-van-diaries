const { plugin } = require( "vite-plugin-markdown" );
const { resolve } = require( "path" );
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
		vite: {
			resolve: {
				alias: {
					$components: resolve( "src/components" ),
					$static: resolve( "static" ),
				},
			},
			plugins: [
				plugin(),
			],
		},
	},
	preprocess: sveltePreprocess({
		postcss: true,
	}),
};
