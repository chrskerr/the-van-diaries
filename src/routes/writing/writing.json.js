
import fs from "fs";
import fm from "front-matter";
import marked from "marked";
import _ from "lodash";

export async function get () {
	const files = fs.readdirSync( "src/routes/writing/content" );

	if ( files && _.size( files ) > 0 ) {
		return {
			body: {
				writing: _.compact( _.map( files, file => {
					if ( !_.endsWith( file, ".md" )) return false;
					const fileRes = fs.readFileSync( `src/routes/writing/content/${file}`, { encoding: "utf-8" });
					const { body, attributes } = fm( fileRes );
					const html = marked( body );
					return { html, ...attributes, slug: _.replace( file, /.md$/, "" ) };
				})),
			},
		};
	} else {
		return {
			status: 404,
			body: {
				error: "Not found",
			},
		};
	}
}
