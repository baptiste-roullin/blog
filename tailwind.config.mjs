/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.html',
		'./src/**/*.njk',
		'./src/**/*.md',
		'./src/filters/*.{ts,js}',
		'./src/shortcodes/*.{ts,js}',
	],
	theme: {
		extend: {
			/* TODO: Gérer différemment ?? */
			spacing: {
				'per': '4%',
			},
			typography: ({ theme }) => ({
				'sm': {
					css: {
						h4: {
							marginBottom: '0px'
						}
					}
				},
				'md': {
					css: {
						h4: {
							marginBottom: '0px'
						}
					}
				},
				'xl': {
					css: {
						p: {
							"margin-top": "1.1em",
							"margin-bottom": "1.1em"
						},
						'line-height': '1.6',
						'ul > li:before':
						{
							top: '.8em !important'
						},
						h1: {
							lineHeight: '1.2',
						},
						h3: {
							marginTop: "1.4em",
							color: theme('colors.gray.700')
						},
						h4: {
							marginBottom: '0px'
						}
					}
				},
				'lg': {
					css: {
						p: {
							"margin-top": "1.1em",
							"margin-bottom": "1.1em"
						},
						'line-height': '1.5',
						'ul > li:before':
						{
							top: '.8em !important'
						},

						h1: {
							color: 'inherit',
							fontSize: '2.2em',
							lineHeight: '1.1'
						},
						h2: {
							marginTop: "1.3em",
							marginBottom: "0.5em"
						},
						h3: {
							marginTop: "1.4em",
						},
						h4: {
							marginBottom: '0px'
						}
					}
				},
				DEFAULT: {

					css: {
						'code::before': {
							content: 'none', // don’t generate the pseudo-element
							//                content: '""', // this is an alternative: generate pseudo element using an empty string
						},
						'code::after': {
							content: 'none'
						},

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
							quotes: 'none',
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
							marginTop: "1.5em",

						},
						h3: {
							marginTop: "1.4em",
							color: theme('colors.gray.700')
						},
						h4: {
							color: theme('colors.gray.700'),
							marginBottom: '0px'
						}
					},
				},

			}),

		},
	},
	plugins: [
		typography,
		forms,

	]
	,
}
