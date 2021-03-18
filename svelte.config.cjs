/** @type {import('@sveltejs/kit').Config} */

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
};
