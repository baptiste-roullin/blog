//@ts-nocheck
window.truchet = require('../../truchet.ts');


document.addEventListener('DOMContentLoaded', async function () {
	[...document.querySelectorAll('canvas')].forEach(async (el) => {
		const params = JSON.parse(el.dataset?.args || '')
		if (!params || typeof params !== 'object') {
			console.log(new Error("truchet : le shortcode doit comprendre une liste de paramètres sous forme d'objet"))
		}

		await window.truchet(
			el,
			document.createElement('canvas'),
			params, null);

	})
}
	, false);


[...document.querySelectorAll('.truchet-canvas')].forEach(el => {
	let rotate = 0;
	el.addEventListener('click', function (e) {
		rotate += 90;
		const target = e.target! as HTMLElement
		target.style.transform = `rotate(${rotate}deg)`
	}
		, false)
});
