import PhotoSwipeLightbox from 'photoswipe/lightbox'

const lightbox = new PhotoSwipeLightbox({
	gallery: '.picture-gallery',
	children: 'figure',
	pswpModule: () => import('photoswipe')
})

lightbox.addFilter('uiElement', (element, data) => {
	switch (data.name) {
		case 'arrowNext':
			element.setAttribute("aria-label", "Suivant")
			element.removeAttribute("title")
			break
		case 'arrowPrevious':
			element.setAttribute("aria-label", "Précédent")
			element.removeAttribute("title")
			break
		case 'zoom':
			element.setAttribute("aria-label", "Zoomer")
			element.removeAttribute("title")
			break
		case 'close':
			element.setAttribute("aria-label", "Fermer")
			element.removeAttribute("title")
			break
		default:
			break
	}

	return element
})

lightbox.init();



/* TODO : a11y transformer lien en button ou image-lien*/