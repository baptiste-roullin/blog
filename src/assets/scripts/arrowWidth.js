const textMetrics = require('text-metrics');


function arrowWidth(e) {
	const root = document.querySelector('.post-pagination ');
	const links = root.querySelectorAll("a")
	//const width = window.getComputedStyle(links[0]).width.slice(0, -2)

	const widthLeft = textMetrics.init(links[0]).width(links[0].textContent, { multiline: true })
	const widthRight = textMetrics.init(links[1]).width(links[1].textContent, { multiline: true })

	if (links.length > 1) {
		root.style.setProperty("--pagination-length-left", widthLeft + "px")
		root.style.setProperty("--pagination-length-right", widthRight + "px")
	}
	else {
		root.style.setProperty("--pagination-length-right", widthRight + "px")
	}
}


window.addEventListener("load", arrowWidth)


var resizeTimer;
window.addEventListener("resize", function (e) {
	console.log(e);
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		arrowWidth()
	}, 250);

})
