import path from "path";
import fs from "fs";
import grayMatter from "gray-matter";

const md = require('markdown-it')().use(require('markdown-it-footnote')).use(require('markdown-it-attrs'));

const getPost = fileName =>
	fs.readFileSync(path.resolve("content", `${fileName}.md`), "utf-8");

export function get(req, res, next) {
	const { slug } = req.params;

	// get the markdown text
	const post = getPost(slug);

	// parse the md to get front matter
	// and the content without escaping characters
	const { data, content } = grayMatter(post);

	const html = md.render(content);

	if (html) {
		res.writeHead(200, {
			"Content-Type": "application/json"
		});

		res.end(JSON.stringify({ html, ...data }));
	} else {
		res.writeHead(404, {
			"Content-Type": "application/json"
		});

		res.end(
			JSON.stringify({
				message: `Not found`
			})
		);
	}
}