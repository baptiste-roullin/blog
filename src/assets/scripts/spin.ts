export default function spin() {

	document.querySelector('#site-title-text')!.addEventListener('mouseover', function (e) {
		const target = e.target! as HTMLElement
		if (target.tagName !== "SPAN") {
			target.innerHTML = 'Tout ce qui b<span>o</span>uge'
			const o = target.querySelector(' span')! as HTMLElement
			o.offsetWidth;
			o.classList.add('spin')
		}
	})
}