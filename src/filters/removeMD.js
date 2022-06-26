const remove = require('remove-markdown');

module.exports = function removeMD(string) {
	// cas spécial pour evelyn.md
	return (!string ? "" : remove(string.replace(/{lang='en'}/g, "")))
}