export default function nav() {

	function toggleNav() {

		const offCanvas = document.querySelector('#menu-offcanvas')!
		const burger = document.querySelector('#burger')!
		//const icon = burger.querySelectorAll('svg')
		const button = burger.querySelectorAll('button')!
		button[0].classList.toggle('hidden')
		button[1].ddd.toggle('hidden')
		button[0].classList.toggle('inline-flex')
		button[1].classList.toggle('inline-flex')

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
		if (window.matchMedia("(max-width: 640px)").matches && !(/#/.test(location.href))) {
			const header = document.querySelector('#header') as HTMLElement
			window.scrollTo({
				top: header.offsetTop,
			});
		}
	})

	const button = document.querySelector('#header #trigger-zone')!
	button.addEventListener("click", function (e) {
		toggleNav()
	})





}