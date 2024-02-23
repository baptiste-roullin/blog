
import * as textMetrics from 'text-metrics'


function arrowPagination(e) {
	//const root = document.querySelector<HTMLElement>('.post-pagination ');
	const left = document.querySelector('#pagination-left a > p ')
	const right = document.querySelector('#pagination-right  a > p')

	//const width = window.getComputedStyle(left).width.slice(0, -2)

	if (left) {
		const widthLeft = textMetrics.init(left).width(left.textContent, { multiline: true })
		document.body.style.setProperty("--pagination-length-left", widthLeft + "px")
	}
	if (right) {
		const widthRight = textMetrics.init(right).width(right.textContent, { multiline: true })
		document.body.style.setProperty("--pagination-length-right", widthRight + "px")
	}
}

window.addEventListener("load", arrowPagination)

var resizeTimer
window.addEventListener("resize", function (e) {
	clearTimeout(resizeTimer)
	resizeTimer = setTimeout(function () {
		arrowPagination(e)
	}, 100)

})
