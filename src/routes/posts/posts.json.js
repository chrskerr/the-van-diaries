
import fs from "fs";
import fm from "front-matter";
import marked from "marked";

export async function get( request, context ) {
	const files = fs.readdirSync( "src/routes/posts/content" );

	if ( files && files.length > 0 ) {
		return {
			body: {
				posts: files.map( file => {
					const fileRes = fs.readFileSync( `src/routes/posts/content/${file}`, { encoding: "utf-8" });
					const { body, attributes } = fm( fileRes );
					const html = marked( body );
					return { html, ...attributes };
				}),
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
