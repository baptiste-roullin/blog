const remove = require('remove-markdown');

module.exports = function removeMD(string) {
	return (!string ? "" : remove(string))
}