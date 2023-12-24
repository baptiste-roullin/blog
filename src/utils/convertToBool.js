export default function (string) {
	const str = (string ? string.toLowerCase() : undefined)
	switch (str) {
		case "true":
		case "undefined":
		case undefined:
			return true
		case "false":
		default:
			return false
	}
}
