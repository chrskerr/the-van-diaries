
import fs from "fs";
import fm from "front-matter";
import marked from "marked";
import _ from "lodash";

export async function get ( req ) {
	const files = fs.readdirSync( "src/routes/places/content" );
	const isMap = req.query.get( "src" ) === "map";

	if ( files && _.size( files ) > 0 ) {
		return {
			body: {
				places: _.compact( _.map( files, file => {
					if ( !_.endsWith( file, ".md" )) return false;
					const fileRes = fs.readFileSync( `src/routes/places/content/${file}`, { encoding: "utf-8" });
					const { body, attributes } = fm( fileRes );
					const html = marked( body );
					if ( !attributes.published || ( attributes.mapOnly && !isMap )) return false;
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
