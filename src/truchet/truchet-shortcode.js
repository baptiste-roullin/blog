module.exports = {
	truchetItem: function (args, style = 'block m-auto') {
		return `<canvas
		class='	${style}'
		data-args='${JSON.stringify(args)}'
	>
	</canvas>`
	},

	truchetList: function (args) {
		let elements = ""
		const length = 300
		for (let index = 0; index < 25; index++) {
			elements +=
				"<li class='inline m-0 p-0 w-full'>" +
				module.exports.truchetItem(
					{ width: length, height: length, tile_size: length, hue_amplitude: 1, background_phase: 0, curves_per_tile: 5 },
					'w-full inline m-0 truchet-rotate') +
				'</li>'
		}
		return " <div class='UI m-0 p-0'><ul class='truchet'>" + elements + "</ul></div>"
	}
}