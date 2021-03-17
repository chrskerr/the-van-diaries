// Consult https://vitejs.dev/config/ to learn about these options
import { resolve } from "path";

import { plugin } from "vite-plugin-markdown";

/** @type {import('vite').UserConfig} */
export default {
	resolve: {
		alias: {
			$components: resolve( "src/components" ),
		},
	},
	plugins: [
		plugin(),
	],
};
