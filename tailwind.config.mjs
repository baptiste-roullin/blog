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
			typography: ({ theme }) => ({

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


					}
				},
				DEFAULT: {

					css: {
						color: theme('colors.gray.900'),
						'code::before': {
							content: 'none', // don’t generate the pseudo-element
							//                content: '""', // this is an alternative: generate pseudo element using an empty string
						},
						'code::after': {
							content: 'none'
						},

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
