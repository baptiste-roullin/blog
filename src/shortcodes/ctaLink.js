export function ctaLink (label, url, size, className) {
if (size) {
className = className + " "
}
return `<div class="not-prose cta-link-wrapper">
	<a href="${url}" class="${className} cta-link text-brown">
		${label} <span aria-hidden="true">⤳</span>
	</a>
</div> `
}