/**
	 *
	 * @param {array} array
	 * @returns {array}
	 */
export default function shuffle(array) {

	try {
		if (!(Array.isArray(array))) {
			throw new Error("should be array")
		}

		const newArray = [...array]
		var currentIndex = newArray.length
		var temporaryValue, randomIndex

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1

			// And swap it with the current element.
			temporaryValue = newArray[currentIndex]
			newArray[currentIndex] = newArray[randomIndex]
			newArray[randomIndex] = temporaryValue
		}

		return newArray


	} catch (error) {
		console.log(error)
		console.log(this.inputPath)
	}
}