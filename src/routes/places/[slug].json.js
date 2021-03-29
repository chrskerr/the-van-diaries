
import fs from "fs";
import fm from "front-matter";
import marked from "marked";

export async function get ( request ) {
	const { slug } = request.params;

	try {
		const fileRes = fs.readFileSync( `src/routes/places/content/${slug}.md`, { encoding: "utf-8" });
		const { body, attributes } = fm( fileRes );
		const html = marked( body );
		if ( !attributes.published ) throw new Error();
		return {
			body: {
				place: { html, ...attributes },
			},
		};
	}
	catch ( error ) {
		return {
			status: 301,
		};
	}
}
