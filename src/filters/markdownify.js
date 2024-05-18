import md from '../markdown.js'
export default function markdownify(markdownString) { return md.renderInline(markdownString) }