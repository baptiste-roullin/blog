
import md from '../markdown.js'

export function gallery(data) {

	let content = md.render(data)
	if (content.match('^<ul>')) {
		console.log('Beware: gallery shortcode must be a flat succession of img without paragraph breaks')

	}
	let width = ''
	if (data.match(/\!\[/g).length > 1) {
		width = 'container-wide'
	}
	return `<div class=" picture-gallery ${width} " >${content}</div>`
}

