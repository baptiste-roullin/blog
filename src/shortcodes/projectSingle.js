/*import fs from 'node:fs/promises'
import path from 'node:path'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'
dotenv.config()
import yaml from "js-yaml"

import renderNunjucks from '../utils/renderNunjucks.js'
import markdownify from '../filters/markdownify.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function projectSingle(projectName) {
	const contents = await fs.readFile(path.join(__dirname, '../_data/projects.yaml'), { encoding: 'utf8' })
	const projects = await yaml.load(contents)
	const project = projects.filter(project => project.name === projectName)[0]
	const html = await renderNunjucks("_templates/components/project.njk", { "project": project }, [markdownify])
	return `<div class='project-single md:max-w-2/3 m-auto'>${html}</div>`
}*/