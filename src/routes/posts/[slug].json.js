
import fs from "fs";
import fm from "front-matter";
import marked from "marked";

export async function get( request ) {
	const { slug } = request.params;

	try {
		const fileRes = fs.readFileSync( `src/routes/posts/content/${slug}.md`, { encoding: "utf-8" });
		const { body, attributes } = fm( fileRes );
		const html = marked( body );
		return {
			body: {
				post: { html, ...attributes },
			},
		};
	}
	catch ( error ) {
		console.log( error );
		return {
			status: 301,
		};
	}
}