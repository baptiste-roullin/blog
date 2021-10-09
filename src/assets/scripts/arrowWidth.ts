const textMetrics = require('text-metrics');


function arrowWidth(e) {
<<<<<<< HEAD
	const root = document.querySelector<HTMLElement>('.post-pagination ') ;
=======
	const root = document.querySelector<HTMLElement>('.post-pagination ');
>>>>>>> home
	const links = root.querySelectorAll("a")
	//const width = window.getComputedStyle(links[0]).width.slice(0, -2)

	if (links.length > 1) {
		const widthLeft = textMetrics.init(links[0]).width(links[0].textContent, { multiline: true })
		const widthRight = textMetrics.init(links[1]).width(links[1].textContent, { multiline: true })
		root.style.setProperty("--pagination-length-left", widthLeft + "px")
		root.style.setProperty("--pagination-length-right", widthRight + "px")
	}
	else {
		const widthRight = textMetrics.init(links[1]).width(links[1].textContent, { multiline: true })
		root.style.setProperty("--pagination-length-right", widthRight + "px")
	}
}


window.addEventListener("load", arrowWidth)


var resizeTimer;
window.addEventListener("resize", function (e) {
	console.log(e);
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		arrowWidth(e)
<<<<<<< HEAD
	}, 250);
=======
	}, 100);
>>>>>>> home

})
