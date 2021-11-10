export default function nav() {

	function toggleNav() {

		const offCanvas = document.querySelector('#menu-offcanvas')!
		const buttonState = document.querySelectorAll('#menu-bar button svg')
		const buttonIcon = document.querySelector('#menu-bar button')!
		buttonState[0].classList.toggle('hidden')
		buttonState[1].classList.toggle('hidden')
		buttonIcon.toggleAttribute('aria-expanded')


		const updatedClassList = document.querySelector('#menu-offcanvas')!.classList
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
				top: offCanvas.clientHeight,
			});
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		const menuBar = document.querySelector('#menu-bar') as HTMLElement
		const button = document.querySelector('#menu-bar button #trigger-zone')!

		window.scrollTo({
			top: menuBar.offsetTop,
		});

		button.addEventListener("click", function (e) {
			return toggleNav(e.target)
		}
		)

	})





}