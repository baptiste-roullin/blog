module.exports = {
	truchetItem: function (config, style = 'block m-auto w-full') {
		return `<canvas
		class='${style}'
		data-args='${JSON.stringify(config)}'
	>
	</canvas>`
	},

	truchetList: function (config) {
		let elements = ""
		const length = 300
		for (let index = 0; index < 25; index++) {
			elements +=
				module.exports.truchetItem(
					{ width: length, height: length, tile_size: length, hue_amplitude: 1, background_phase: 1, background: '#fff', curves_per_tile: 5 },
					'w-full inline p-0 m-0 truchet-rotate')
		}
		return " <div class='UI my-6 p-0 truchet'>" + elements + "</div>"
	}
}