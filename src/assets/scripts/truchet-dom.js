window.truchet = require('../../truchet.js');


document.addEventListener('DOMContentLoaded', async function () {
	[...document.querySelectorAll('canvas')].forEach(async (el) => {
		await truchet(el, document.createElement('canvas'),
			JSON.parse(el.dataset.args), null);

	})
}
	, false);


[...document.querySelectorAll('.truchet-canvas')].forEach(el => {
	let rotate = 0;
	el.addEventListener('click', function () {
		rotate += 90;
		this.style = `transform:rotate(${rotate}deg)`
	}
		, false)
});
