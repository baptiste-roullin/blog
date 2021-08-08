export default function spin() {

	document.querySelector('#site-title')!.addEventListener('mouseover', function (e) {
		const target = e.target! as HTMLElement
		if (!(target.querySelector('#site-title-text span'))) {

			target.querySelector('#site-title-text')!.innerHTML = 'Tout ce qui b<span>o</span>uge'
			const o = target.querySelector('a span')! as HTMLElement
			o.offsetWidth;

			o.classList.add('spin')
		}

	})



}