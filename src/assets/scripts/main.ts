/*const Alpine  = require('alpinejs')
window.Alpine = Alpine
Alpine.start()
*/



import nav from './nav'
import spin from './spin'

nav()
spin()


/*const axios = require('axios').default;
document.querySelector("#contact").addEventListener('submit', async function () {
	event.preventDefault();
	var data = new FormData(this);
	console.log(data.entries());

})

document.querySelector("#contact").addEventListener('formdata', (e) => {
	console.log('formdata fired');

	// Get the form data from the event object
	let data = e.formData;
	for (var value of data.values()) {
		console.log(value);
	}


});*/