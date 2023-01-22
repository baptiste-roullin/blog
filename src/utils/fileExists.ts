import { stat } from 'fs/promises'

export default async function (path) {
	return !!(await stat(path).catch(e => false))
}
