import md from '../markdown.js'
export function markdownify(string) {

	try {
		if (!string) {
			throw new Error()
		}
		if (typeof string !== "string") {
			throw new Error("should be string")
		}

		return md.renderInline(string)
	} catch (error) {
		console.log(error)
		console.log(this.inputPath)
	}
}