
// @ts-nocheck
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js';

const lightbox = new PhotoSwipeLightbox({
	gallery: '.rich-picture',
	children: 'figure',
	pswpModule: PhotoSwipe
});

lightbox.addFilter('uiElement', (element, data) => {
	if (data.name === 'arrowNext') {
		element.setAttribute("aria-label") = "Suivant"
		element.removeAttribute("title")
	}
	if (data.name === 'arrowPrevious') {
		element.setAttribute("aria-label") = "Précédent"
		element.removeAttribute("title")
	}
	return element;
});


lightbox.init();



/* TODO : a11y transformer lien en button */