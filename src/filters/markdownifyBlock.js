import md from '../markdown.js'

export default function markdownifyBlock(value) {
	if (!value) {
		console.log("markdownifyBlock: empty string")
		return ''
	}
	return `<div class="prose-tcqb">${md.render(value)}</div>`
}