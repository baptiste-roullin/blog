import { md } from '../config/markdown'
export default function (markdownString) { return md.renderInline(markdownString) }