import { slugify } from '../filters/slugify.js'

export function heading(level, className, label) {
	if (typeof label === "object") {
		label = label.val
	}
	const slug = slugify(label)
	return `<h${level} class='${className}' id='${slug}'>
	<a class='header-anchor' href='#${slug}'>
		<span aria-hidden='true'>§︎</span>
		<span class='sr-only'>Ancre pour le titre : ${label}</span>
	</a>
	${label}
</h${level}>`
}