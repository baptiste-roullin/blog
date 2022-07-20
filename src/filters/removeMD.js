const remove = require('remove-markdown');

module.exports = function removeMD(string) {
	return (!string ? "" : remove(
		// cas spécial, par exemple pour evelyn.md
		string.replace(/\[(.*)\]\{.*\}/g, "$1"))
	)
}