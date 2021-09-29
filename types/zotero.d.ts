
export interface MultiReadResponse {
	raw: RawItem[];
	response: Response
	getData: () => []

}

export interface RawItem {
	key: string;
	version: number;
	library: Object;
	links: Object;
	meta: {};
	data: { [key: string]: string | Object };
}
//MultiReadResponse {
//	raw: [
//		{
//			key: 'GP4GPCF7',
//			version: 460,
//			library: [Object],
//			links: [Object],
//			meta: [Object],
//			data: [Object]
//		},
//		{
//			key: '2P7LN5RU',
//			version: 460,
//			library: [Object],
//			links: [Object],
//			meta: [Object],
//			data: [Object]
//		},
//		{
//			key: 'BEW3DTJI',
//			version: 460,
//			library: [Object],
//			links: [Object],
//			meta: [Object],
//			data: [Object]
//		}
//	],
//		options: {
//		apiAuthorityPart: 'api.zotero.org',
//			cache: 'default',
//				contentType: 'application/json',
//					credentials: 'omit',
//						format: 'json',
//							method: 'get',
//								mode: 'cors',
//									pretend: false,
//										redirect: 'follow',
//											resource: { library: 'u5883126', collections: 'G67KLPGB', items: null },
//		retry: 0,
//			retryDelay: null,
//				uploadRegisterOnly: null,
//					global: <ref * 1 > Object[global] {
//			global: [Circular * 1],
//				clearInterval: [Function: clearInterval],
//					clearTimeout: [Function: clearTimeout],
//						setInterval: [Function: setInterval],
//							setTimeout: [Function],
//								queueMicrotask: [Function: queueMicrotask],
//									performance: [Getter / Setter],
//										clearImmediate: [Function: clearImmediate],
//											setImmediate: [Function],
//												fetch: [Function],
//													Response: [class Response],
//														Headers: [class Headers],
//															Request: [class Request],
//																a: [Circular * 2]
//		},
//		clearInterval: [Function: clearInterval],
//			clearTimeout: [Function: clearTimeout],
//				setInterval: [Function: setInterval],
//					setTimeout: [Function: setTimeout] {
//			[Symbol(nodejs.util.promisify.custom)]: [Getter]
//		},
//		queueMicrotask: [Function: queueMicrotask],
//			performance: Performance {
//			nodeTiming: PerformanceNodeTiming {
//				name: 'node',
//					entryType: 'node',
//						startTime: 0,
//							duration: 43029.51237002015,
//								nodeStart: 2.889618009328842,
//									v8Start: 3.9107900261878967,
//										bootstrapComplete: 28.222963005304337,
//											environment: 14.644167006015778,
//												loopStart: 58.608648002147675,
//													loopExit: -1,
//														idleTime: 42753.052453
//			},
//			timeOrigin: 1628279319048.207
//		},
//		clearImmediate: [Function: clearImmediate],
//			setImmediate: [Function: setImmediate] {
//			[Symbol(nodejs.util.promisify.custom)]: [Getter]
//		},
//		fetch: [Function: bound fetch] { polyfill: true },
//		Response: [class Response],
//			Headers: [class Headers],
//				Request: [class Request],
//					a: MultiReadResponse {
//			raw: [],
//				options: [Object],
//					response: [Response]
//		},
//		executors: [[AsyncFunction: request]],
//			zoteroApiKey: 'HySaYE6Uy02BuJABZIhqbRCl',
//				limit: 3,
//					retryCount: 0
//	},
//	response: Response {
//		size: 0,
//			timeout: 0,
//				[Symbol(Body internals)]: { body: [Gunzip], disturbed: true, error: null },
//		[Symbol(Response internals)]: {
//			url: 'https://api.zotero.org/users/5883126/collections/G67KLPGB/items?format=json&limit=3',
//				status: 200,
//					statusText: 'OK',
//						headers: [Headers],
//							counter: 0
//		}
//	}
//}
