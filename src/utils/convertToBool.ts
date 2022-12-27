export default function convertToBool(string: string | undefined): Boolean {
	const str = (string ? string.toLowerCase() : undefined)
	switch (str) {
		case "true":
			return true
		case "false":
		case "undefined":
		default:
			return false
	}
}
