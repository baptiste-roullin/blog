module.exports = function () {

	document.querySelector('#site-title').addEventListener('mouseover', function () {
		if (!(this.querySelector('#site-title-text span'))) {

			this.querySelector('#site-title-text').innerHTML = 'Tout ce qui b<span>o</span>uge'
			const o = this.querySelector('a span')
			o.offsetWidth;

			o.classList.add('spin')
		}

	})



}