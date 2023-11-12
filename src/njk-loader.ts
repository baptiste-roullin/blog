/*

import * as path from 'path'
import { HmrContext, IndexHtmlTransformContext, IndexHtmlTransformResult, Plugin } from "vite"

import nunjucks, { ConfigureOptions, Environment, Extension, Template } from "nunjucks"

export type templateVariables = Record<string, object>

export interface nunjucksPluginOptions {
	templatesDir?: string,
	variables?: templateVariables,
	nunjucksConfigure?: ConfigureOptions,
	nunjucksEnvironment?: nunjucksEnvironmentOptions | Environment
}

export type nunjucksFilterCallback = (...params) => void
export interface nunjucksFilter {
	async: boolean,
	filter: nunjucksFilterCallback
}

export interface nunjucksEnvironmentOptions {
	filters?: { [key: string]: nunjucksFilterCallback | nunjucksFilter },
	extensions?: { [key: string]: Extension }
}

export const globalVariablesKey = '*'

export default async (options: nunjucksPluginOptions = {}): Promise<string> => {

	const env = options.nunjucksEnvironment instanceof Environment
		? options.nunjucksEnvironment
		: createNunjucksEnvironment(options.nunjucksEnvironment || {})

	return await handleTransformHtml()

	function createNunjucksEnvironment({ extensions, filters }: nunjucksEnvironmentOptions): Environment {
		options = { ...options }
		const env = nunjucks.configure({
			noCache: true,
			...(options.nunjucksConfigure || {})
		})
		Object.keys(extensions || {}).forEach(name => env.addExtension(name, extensions[name]))
		Object.keys(filters || {}).forEach(name => {
			const filter = filters[name];
			(typeof filter === 'object' && filter.hasOwnProperty('filter'))
				? env.addFilter(name, filter.filter, filter.async)
				: env.addFilter(name, filter as nunjucksFilterCallback)
		})
		return env
	}

	function handleTransformHtml(html: string, path): Promise<string> {
		const key = path.basename(path)
		const globalVariables = options.variables?.[globalVariablesKey] || {}
		const templateVariables = options.variables?.[key] || {}
		return new Promise((resolve, reject) => {
			env.renderString(html, { ...globalVariables, ...templateVariables }, function (err, res) {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			})
		})
	}

	function handleHotUpdate(context: HmrContext): void | [] {
		const filename = path.resolve(context.file)
		if (!filename.startsWith("src/_templates/components")) return
		console.info(`Template file ${path.basename(filename)} has been changed. Sending full-reload.`)
		context.server.ws.send({ type: 'full-reload' })
		return []
	}
}
*/