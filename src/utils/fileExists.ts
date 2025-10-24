import fsp from 'node:fs/promises'

export default async function (path) {
	try {
		await fsp.access(path)
		return true
	} catch {
		return false
	}
}