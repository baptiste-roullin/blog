const remove = require('remove-markdown')

export default function removeMD(string) {
	if (!string) {
		console.log(string + "removeMD: slug string is empty")
		return ""
	}
	console.log(remove(string))
	return remove(
		// cas spécial, par exemple pour evelyn.md
		string.replace(/\[(.*)\]\{.*\}/g, "$1")
	)

}