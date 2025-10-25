import md from '../markdown.ts'

export default function markdownifyBlock(value) {
	if (!value) {
		console.log("markdownifyBlock: empty string")
		return ''
	}
	return `<div class="prose-tcqb">${md.render(value)}</div>`
}