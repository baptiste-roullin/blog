
// @ts-nocheck
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.js';


//TODO : tweak interface et ajouter attribut src
const lightbox = new PhotoSwipeLightbox({
	gallery: '.rich-picture',
	children: 'figure',
	pswpModule: PhotoSwipe
});
lightbox.init();

var initPhotoSwipeFromDOM = function (gallerySelector) {



	// parse slide data (url, title, size ...) from DOM elements
	// (children of gallerySelector)
	var parseThumbnailElements = function (el) {
		var thumbElements = el.querySelectorAll('figure'),
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl

		for (var i = 0; i < numNodes; i++) {

			figureEl = thumbElements[i]; // <figure> element

			// include only element nodes
			if (figureEl.nodeType !== 1) {
				continue;
			}

			linkEl = figureEl.children[0]; // <a> element
			var img = linkEl.children[0];

			// create slide object
			const item = {
				src: linkEl.getAttribute('href'),
				orig_src: linkEl.getAttribute('href'),
				width: img.width,
				height: img.height,
				el: figureEl, // save link to element for getThumbBoundsFn
				title: '',
				msrc: ''


			};

			if (figureEl.children.length > 1) {
				item.title = figureEl.children[1].innerHTML;
			}

			if (linkEl.children.length > 0) {
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.children[0].getAttribute('src');
			}


			items.push(item);
		}

		return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn) {
		return el && (fn(el) ? el : closest(el.parentNode, fn));
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function (e) {
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var eTarget = e.target || e.srcElement;

		// find root element of slide
		var clickedListItem = closest(eTarget, function (el) {
			return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
		});

		if (!clickedListItem) {
			return;
		}

		// find index of clicked item by looping through all child nodes
		// alternatively, you may define index via data- attribute
		var clickedGallery = clickedListItem.parentNode, // we need to make our way back to the top of the ul > li > figure chain
			childNodes = clickedListItem.parentNode.querySelectorAll('figure'),
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

		for (var i = 0; i < numChildNodes; i++) {
			if (childNodes[i].nodeType !== 1) {
				continue;
			}

			if (childNodes[i] === clickedListItem) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}



		if (index >= 0) {
			// open PhotoSwipe if valid index found
			//@ts-ignore
			openPhotoSwipe(index, clickedGallery);
		}
		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function () {
		var hash = window.location.hash.substring(1),
			params = {};

		if (hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if (!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');
			if (pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}

		if (params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		return params;
	};

	var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
		var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery,
			options,
			items;
		items = parseThumbnailElements(galleryElement);

		options = {
			closeOnScroll: false,
			closeEl: true,
			captionEl: true,
			fullscreenEl: false,
			zoomEl: false,
			initialZoomLevel: 'fit',
			secondaryZoomLevel: 'fill',
			shareEl: false,
			counterEl: true,
			arrowEl: true,
			preloaderEl: true,
			clickToCloseNonZoomable: true,
			tapToClose: false,
			// define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			/*		getThumbBoundsFn: function (index) {
						// See Options -> getThumbBoundsFn section of documentation for more info
						var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
							pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
							rect = thumbnail.getBoundingClientRect();
						console.log(thumbnail)
						return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
					}*/

			hideAnimationDuration: 0, showAnimationDuration: 0

		};

		// PhotoSwipe opened from URL
		if (fromURL) {
			if (options.galleryPIDs) {
				// parse real index when custom PIDs are used
				// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
				for (var j = 0; j < items.length; j++) {
					if (items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else {
				// in URL indexes start from 1
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		}

		// exit if index not found
		if (isNaN(options.index)) {
			return;
		}

		if (disableAnimation) {
			options.showAnimationDuration = 0;
		}

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

		// responsive images
		// create variable that will store real size of viewport
		//var realViewportWidth,
		//	imageSize = "small",
		//	firstResize = true,
		//	imageSrcWillChange;

		// beforeResize event fires each time size of gallery viewport updates
		/*	gallery.listen('beforeResize', function () {
				// gallery.viewportSize.x - width of PhotoSwipe viewport
				// gallery.viewportSize.y - height of PhotoSwipe viewport
				// window.devicePixelRatio - ratio between physical pixels and device independent pixels (Number)
				//                          1 (regular display), 2 (@2x, retina) ...


				// calculate real pixels when size changes
				// realViewportWidth = gallery.viewportSize.x * window.devicePixelRatio;
				realViewportWidth = gallery.viewportSize.x;

				// Code below is needed if you want image to switch dynamically on window.resize

				// Find out if current images need to be changed
				if (realViewportWidth <= 720) {
					if (imageSize != "small") {
						imageSize = "small"
						imageSrcWillChange = true;
					}
				} else if (realViewportWidth > 720 && realViewportWidth <= 1040) {
					if (imageSize != "medium") {
						imageSize = "medium"
						imageSrcWillChange = true;
					}
				} else {
					if (imageSize != "large") {
						imageSize = "large"
						imageSrcWillChange = true;
					}
				}

				// Invalidate items only when source is changed and when it's not the first update
				if (imageSrcWillChange && !firstResize) {
					// invalidateCurrItems sets a flag on slides that are in DOM,
					// which will force update of content (image) on window.resize.
					gallery.invalidateCurrItems();
				}

				if (firstResize) {
					firstResize = false;
				}

				imageSrcWillChange = false;

			});*/


		// gettingData event fires each time PhotoSwipe retrieves imagse source & size
		gallery.listen('gettingData', function (index, item) {
			// Set image source & size based on real viewport width
			item.src = `${item.orig_src}?nf_resize=fit&w=${window.innerWidth}`;
			item.w = item.width;
			item.h = item.height;

			// It doesn't really matter what will you do here,
			// as long as item.src, item.w and item.h have valid values.
			//
			// Just avoid http requests in this listener, as it fires quite often

		});

		gallery.init();
	};



	// loop through all gallery elements and bind events
	var galleryElements = document.querySelectorAll(gallerySelector);



	for (let i = 0, l = galleryElements.length; i < l; i++) {

		galleryElements[i].setAttribute('data-pswp-uid', i + 1);

		// Viser uniquement img > a, pas la légende.
		const figures = galleryElements[i].children
		for (let i = 0, l = figures.length; i < l; i++) {
			const target = figures[i].children[0]
			target.onclick = onThumbnailsClick;
		}

	}

	// find all figcaptions within a gallery, and hide them visually
	var imageElements = document.querySelectorAll('.rich-picture figure figcaption');
	for (var i = 0, l = imageElements.length; i < l; i++) {
		imageElements[i].classList.add('visually-hidden');
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if (hashData.pid && hashData.gid) {
		openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
	}
};

//initPhotoSwipeFromDOM('.rich-picture');