/** @type {import('tailwindcss').Config} */



import plugin from 'tailwindcss/plugin'

const textShadow = plugin(function ({ addUtilities, e, theme, addVariant }) {
	const textShadow = theme('textShadow', {})

	//const textShadowVariants = addVariant('textShadow', []) //TODO : vérifier si vraiment inutile


	const utilities = Object.fromEntries(
		Object.entries(textShadow).map((array) => {
			const [key, value] = array // key = modifier. value = css content.
			const className = (key === 'default' ? 'text-shadow' : `${e(`text-shadow-${key}`)}`)
			return [
				`.${className}`,
				{
					'text-shadow': value,
				},
			]
		})
	)

},
	{
		theme: {
			textShadow: {
				default: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
				sm: '1px 1px 3px rgb(36 37 47 / 25%)',
				md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
				lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
				xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
				none: 'none',
			},
		},
		variants: {
			textShadow: ['responsive', 'hover', 'focus'],
		}
	})


import colors from 'tailwindcss/colors'

import typography from '@tailwindcss/typography'
import nesting from 'tailwindcss/nesting'
import forms from '@tailwindcss/forms'
import textBalance from 'tailwindcss-text-balance'

//import util from 'markdown-it-blockquote-cite/dist/util'

export default {
	darkMode: 'class',
	corePlugins: {
	},
	safelist: ['sr-only'],
	content: [
		'./src/**/*.html',
		'./src/**/*.njk',
		'./src/**/*.md',
		'./src/filters/*.{ts,js}',
		'./src/shortcodes/*.{ts,js}',
	],
	theme: {
		fontFamily: {
			sans: [
				'Brandon',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
			],
		},
		colors: {
			/* passer aux couleurs tailwind, potentiellement en les tweakant */
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			indigo: colors.indigo,
			red: colors.red,
			'blue': {
				DEFAULT: 'hsl(202, 78%, 16%)',
				lighter: 'hsl(217,32%,32%)',
				light: 'hsl(202, 70%, 20%)'
			},
			/*			'red': 'hsl(5, 77%, 37%)',*/
			"brown": {
				DEFAULT: 'hsl(30.8, 95%, 17.3%)',
				'light': 'hsl(31, 67%, 34%)',
			},
			'orange': 'hsl(36, 100%, 50%)',
			'cream': '#fff4ed'
		},

		extend: {

			maxWidth: {
				'8xl': '90rem',
				'9xl': '100rem',
				'1/3': '33%',
				'1/4': '25%',
			},
			borderRadius: {
				'4xl': '3rem'
			},
			minHeight: {
				'1/4h': '25vh',
				'1/2h': '50vh',
				'3/4h': '75vh',
				'full': '100vh',
			},
			minWidth: {
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
			},
			spacing: {
				'per': '4%',
			},
			fontSize: {
				'xl-bis': '1.65rem',
				'lg-bis': "1.4rem"

			},
			// TODO https://github.com/tailwindlabs/tailwindcss-typography/releases/tag/v0.5.0
			textShadow: {
				"lg-blue": "3px 3px 6px rgb(0 0 0 / 46%), 0 0 5px rgb(15 3 86 / 42%)"
			},
			boxShadow: {
				"flat": "0 4px 5px 0px rgba(100,0,0,0.25)",
				"lg-blue":
					"0 1.3px 1.9px rgba(0, 0, 0, 0.1),  0 3.3px 4.9px rgba(0, 0, 0, 0.133),  0 6.7px 9.9px rgba(0, 0, 0, 0.167),  0 13.9px 20.4px rgba(0, 0, 0, 0.207),  0 38px 56px rgba(0, 0, 0, 0.2);"
			},
			typography: (theme) => ({
				'xl': {
					css: {
						'line-height': '1.7',
						'ul > li:before':
						{
							top: '.8em !important'
						}
					}
				},
				'lg': {
					css: {
						'line-height': '1.6',
						'ul > li:before':
						{
							top: '.8em !important'
						},

						h1: {
							color: 'inherit',
							fontSize: '2.2em',
							lineHeight: '1.1'
						}
					}
				},
				DEFAULT: {

					css: {
						color: theme('colors.gray.900'),
						'ul': {
							marginTop: '1.2em',
							marginBottom: '1.2em',
						},
						'ol': {
							marginTop: '1.2em',
							marginbottom: '1.2em',
						},
						figcaption: {
							textAlign: "center"
						},
						a: {
							fontWeight: 'normal',
							transition: 'all .15s ease-in',
							'&:hover': {
								color: theme('colors.brown-light'),
							},
						},
						blockquote: {
							fontWeight: 'normal',
						},
						code: {
							fontSize: '.8em',
							border: 'none',
							padding: '.3rem',
							fontWeight: 'normal',
							'&:before': { content: "none !important" },
							'&:after': { content: "none !important" },
							borderRadius: '3px',
							backgroundColor: 'rgba(229, 231, 235, .5)',
							fontFamily: 'unset'
						},
						h1: {
							color: 'inherit',
							fontSize: '2em',
							lineHeight: '1.1'
						},
						h2: {
							color: theme('colors.gray.700')
						},
						h3: {
							color: theme('colors.gray.700')
						},
						h4: {
							color: theme('colors.gray.700')
						}
					},
				},

			}),
			opacity: (theme) => ({
				5: '.05',
				10: '.1',
				15: '.15',
				20: '.2',
			}),
			height: (theme) => ({
				'1/2': '50vh',
				'3/4': '75vh',
				'9/10': '90vh',
				'1/1': '100vh',
				/*				'1/3': 'calc(100vh / 3)',*/
				'2/3': '66vh',
				/*				'1/4': 'calc(100vh / 4)',
								'1/5': 'calc(100vh / 5)',*/
				'17/20': '85%',
				96: '24rem',
				128: '32rem',
			}),
		},


	},
	plugins: [
		typography,
		nesting,
		textShadow,
		forms,
		textBalance
	]
	,
}
