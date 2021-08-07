module.exports = {
	truchetItem: function (args, style = 'inline') {
		return `<canvas
		class='truchet-rotate
		${style}'
		data-args='${JSON.stringify(args)}'
	>
	</canvas>`
	},

	truchetList: function (args) {
		let elements = ""
		const length = 300
		for (let index = 0; index < 16; index++) {
			elements += "<li class='inline m-0 p-0'>" + module.exports.truchetItem({ width: length, height: length, tile_size: length, hue_amplitude: 1, seed: "efzfàà", curves_per_tile: 5 }) + '</li>'
		}
		return " <div class='UI m-0 p-0' ><ul class='truchet'>" + elements + "</ul></div>"
	}
}