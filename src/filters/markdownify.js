import md from '../markdown.js'
export default function markdownify(string) {

	if (!string) {
		throw new Error("input is null" + this.page.inputPath)
	}
	if (typeof string !== "string") {
		throw new Error("should be string" + this.page.inputPath)
	}

	return md.renderInline(string)
}
