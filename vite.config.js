// Consult https://vitejs.dev/config/ to learn about these options
import { join, resolve } from "path";
import { readFileSync } from "fs";
import { cwd } from "process";

import { plugin, Mode } from "vite-plugin-markdown";

/** @type {import('vite').UserConfig} */
export default {
	resolve: {
		alias: {
			$components: resolve( "src/components" ),
		},
	},
	plugins: [
		plugin({ mode: [ Mode.HTML ]}),
	],
};
