import PhotoSwipeLightbox from 'photoswipe/lightbox'
const targets = document.querySelectorAll(".picture-gallery")
const targetsArray = [...targets]
targetsArray.forEach(target => {



	const img = target.querySelectorAll("img")
	const dataList = [...img].map(el => {
		return {
			src: el?.getAttribute("src"),
			width: el?.getAttribute("width"),
			height: el?.getAttribute("height"),
			alt: el?.getAttribute("alt")
		}
	}
	)

	const lightbox = new PhotoSwipeLightbox({
		dataSource: dataList,
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

	lightbox.init()

	target.addEventListener("click", function (e) {
		lightbox.loadAndOpen(0)
	})
})
