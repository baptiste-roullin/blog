import fs from 'node:fs/promises'
import path from 'node:path'

import { dirname } from 'node:path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()
import yaml from "js-yaml"
import { EleventyRenderPlugin } from '@11ty/eleventy'


import { truchetItem, truchetList } from '../features/truchet/truchet_shortcode.js'
import slugify from '../filters/slugify.js'
import zotero from '../features/zotero/zotero.js'
import meta from '../_data/meta.js'

import markdownify from '../filters/markdownify.js'


const __dirname = dirname(fileURLToPath(import.meta.url))
const RenderManager = EleventyRenderPlugin.RenderManager

export default {
  zotero: (!meta.zotero ? async () => "[ZOTÉRO DÉSACTIVÉ]" : zotero),

  truchetItem: truchetItem,

  truchetList: truchetList,

  projectSingle: async function (projectName) {
    const contents = await fs.readFile(path.join(__dirname, '../_data/projects.yaml'), { encoding: 'utf8' })
    const projects = await yaml.load(contents)
    const project = projects.filter(project => project.name === projectName)[0]

    const renderManager = new RenderManager()
    renderManager.config(function (eleventyConfig) {
      eleventyConfig.addFilter("markdownify", markdownify)
    })
    const content = await fs.readFile(path.join(__dirname, "../_templates/components/project.njk"), { encoding: 'utf-8' })
    const render = await renderManager.compile(content, "njk")

    return `<div class='project-single md:max-w-2/3 m-auto'>${await render({ project: project })}</div>`
  },
  heading: function (level, className, label) {
    if (typeof label === "object") {
      label = label.val
    }
    const slug = slugify(label)
    return `<h${level} class='${className}' id='${slug}'>
              <a class='header-anchor' href='#${slug}'>
                <span aria-hidden='true'>§︎</span>
                <span class='sr-only'>Ancre pour le titre : ${label}</span>
              </a>
	          	${label}
          	</h${level}>`
  },
  ctaLink: function (label, url, size, className) {
    if (size) {
      className = className + " "
    }
    return `<div class="not-prose cta-link-wrapper">
      <a
              href="${url}"
              class="${className} cta-link text-brown">
              ${label} <span aria-hidden="true">⤳</span>
              </a>
    </div>  `
  },

  /**
   * ===== SVGs =====
 * This shortcode is used in layouts and can be used in .md content.
 *
 * Set the default color above in the 'svgColorDefault" variable.
 *
 * The SVGs MUST exist in the /src/assets/svg/ directory and must me named
 * according to the existing examples.
 *
 * Attributes:
 *    name ;
 * required, must be same as SVG file name in /src/assets/svg/ (without ".svg")
 *    classes : optional but required if you want to control size, color, etc.
 *    desc : optional when used in .md content files
 *    location : optional when used in .md content files
 *
   * Usage by Editors in .md content files:
 *  {% svg "name", "any TailwindCSS classes" %}
 *
 * Example:
 *  {% svg "instagram", "h-12 w-12 text-blue-500" %}

 * Sensible fallback defaults are in place. ;-)
 * "desc" and "location" attribures are required for accessibility and Lighthouse validations
 * and are hardcoded in the layouts to provide unique values as required by Lighthouse.
 *
 * Used in Layouts:
 *  /src/_templates/components/footer.njk
 *  /src/_templates/components/socialshare.njk
 *  /src/_templates/components/nav.njk (for the logos)
   */
  svg: function (name, classes, desc, location) {
    const nameAttr = name ? name : 'piedpiper'
    const classesAttr = classes
      ? `${classes} fill-current`
      : `text-indigo-500 fill-current`
    const descAttr = desc ? desc : `${nameAttr} icon`
    const locationAttr = location ? location : 'content'
    return `<svg class="${classesAttr}" aria-describedby="symbol-${nameAttr}-desc" aria-labelledby="symbol-${nameAttr}-desc" role="group">
                <desc id="symbol-${nameAttr}-desc-${locationAttr}">${descAttr}</desc>
                <use xlink:href="#symbol-${nameAttr}"></use>
            </svg>`
  },


}
