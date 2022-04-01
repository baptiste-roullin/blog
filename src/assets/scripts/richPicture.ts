
// @ts-nocheck
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js';

const lightbox = new PhotoSwipeLightbox({
	gallery: '.rich-picture',
	children: 'figure',
	pswpModule: PhotoSwipe
});
lightbox.init();



/* TODO : a11y transformer lien en button */