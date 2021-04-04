const { plugin } = require( "vite-plugin-markdown" );
const { resolve } = require( "path" );

module.exports = {
	compilerOptions: { 
		hydratable: true,
	},
	kit: {
		adapter: require( "@sveltejs/adapter-static" )(),
		target: "#svelte",
		files: {
			lib: "node_modules",
		},
		vite: {
			resolve: {
				alias: {
					$components: resolve( "src/components" ),
				},
			},
			plugins: [
				plugin(),
			],
		},
	},
};
