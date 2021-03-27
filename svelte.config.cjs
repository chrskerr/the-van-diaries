const { plugin: viteMarkdown } = require( "vite-plugin-markdown" );
const { resolve } = require( "path" );
const sveltePreprocess = require( "svelte-preprocess" );
const css = require( "rollup-plugin-css-only" );

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
				viteMarkdown(),
				css({ output: "css/main.css" }),
			],
		},
	},
	preprocess: sveltePreprocess({
		postcss: true,
	}),
};
