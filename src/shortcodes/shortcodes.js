
import { truchetItem, truchetList } from '../features/truchet/truchet_shortcode'
import { slugifyFilter as slugify } from '../filters/slugify'

export const shortcodes = {
  truchetItem: truchetItem,
  truchetList: truchetList,
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
