/** @returns {string} */
export default function truchetItem(config, style = 'block m-auto w-full') {
    return `<canvas
		aria-hidden="true"
		class='${style}'
		data-args='${JSON.stringify(config)}'
	>
	</canvas>`
}

