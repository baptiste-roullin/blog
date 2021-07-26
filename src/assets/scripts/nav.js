module.exports = function () {


	document.addEventListener('DOMContentLoaded', () => {
		window.scrollTo({
			top: document.querySelector('#menu-bar').offsetTop,
		});
	})


	const button = document.querySelector('#menu-bar button #trigger-zone')
	button.addEventListener("click", function () {

		const offCanvas = document.querySelector('#menu-offcanvas')
		const buttonState = document.querySelectorAll('#menu-bar button svg')
		const button = document.querySelector('#menu-bar button')
		buttonState[0].classList.toggle('hidden')
		buttonState[1].classList.toggle('hidden')
		button.toggleAttribute('aria-expanded')


		const updatedClassList = document.querySelector('#menu-offcanvas').classList
		if (![...updatedClassList].includes('anim-nav-opened')) {
			offCanvas.classList.add('anim-nav-opened')
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
		else {
			offCanvas.classList.remove('anim-nav-opened')
			window.scrollBy({
				behavior: 'smooth',
				top: document.querySelector('#menu-bar').offsetTop,
			});
		}


	})

}