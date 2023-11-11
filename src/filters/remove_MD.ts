import debug from 'debug'
const warning = debug('threader:warning')
import remove from 'remove-markdown'

export default function removeMD(string) {
	if (!string) {
		warning(string + "removeMD: slug string is empty")
		return ""
	}
	return remove(
		// cas spécial, par exemple pour evelyn.md
		string.replace(/\[(.*)\]\{.*\}/g, "$1")
			.replace(/&NewLine;/g, "")
			.replace(/::: info-block\n.*\n:::\n/, '')
	)

}