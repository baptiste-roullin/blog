module.exports = function truchet(args, style = 'inline') {
	return `<canvas
		class='truchet-canvas
		${style}'
		data-args='${JSON.stringify(args)}'
	>
	</canvas>`
}
