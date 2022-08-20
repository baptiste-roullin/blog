const fs = require('fs').promises;

(async () => {

	try {
		const P = await fs.access('./dist/index.min.json');
		let a = "branchA"
	}
	catch (e) {
		let a = "branchB"

	}

	console.log(a)

})()
