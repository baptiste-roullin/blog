//@ts-nocheck
export default function spin() {

	document.querySelector('#site-title-text').addEventListener('mouseover', function (e) {
		const target = e.target
		if (target.tagName !== "SPAN") {
			target.innerHTML = 'Tout ce qui b<span>o</span>uge'
			const o = target.querySelector(' span')
			o.offsetWidth
			o.classList.add('spin')
		}
	})
}