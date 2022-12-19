// @ts-ignore
import { scheduler } from 'node:timers/promises'

const debug = require('debug')
const error = debug('threader:error')
const warning = debug('threader:warning')
const info = debug('threader:info')

// fichier pourrait être placé dans le dossier pages/threads, si on n'utilisait pas le plugin de pagination.
// le plugin ne résoud pas les promesses venant de fichier *.11tydata.js

import { Client } from "twitter-api-sdk"
import { components } from 'twitter-api-sdk/dist/types'
const { AssetCache } = require("@11ty/eleventy-fetch")

interface Links {
	"author": string | undefined,
	"date": Date | undefined,
	"description": string | undefined,
	"image": string | undefined,
	"logo": string | undefined,
	"publisher": string | undefined,
	"title": string | undefined,
	"url": string | undefined,

}

type TweetData = components["schemas"]["Tweet"]
type Tweet =
	TweetData &
	components["schemas"]["Expansions"] &
	{ linksMetadata?: Links[] } &
	{
		QTList?: Array<
			components["schemas"]["Tweet"] &
			components["schemas"]["Expansions"]>
	}

interface Thread {
	tweets: Tweet[],
	title: string,
	tweetID: string,
	startingID: string | undefined,
	idList: Set<string>
}

const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-description')(),
	require('metascraper-image')(),
	require('metascraper-logo')(),
	require('metascraper-clearbit')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')()
])

const url_catcher = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/ig)

export default async function threader(author_id: string, forceCacheReset: boolean, delay: number, token: string | undefined, threads_list: Thread[]): Promise<Thread[] | undefined> {
	const { default: pMap } = await import('p-map')

	async function getTweet(thread: Thread, tweets: Tweet[], client: Client, cachedThread) {

		// alternative moins complète : requêter le tweet qui cite avec :
		//"expansions": ["referenced_tweets.id"],

		async function getQT(tweetID): Promise<Tweet | undefined> {
			const response = await client.tweets.findTweetById(
				tweetID,
				{
					"tweet.fields": ["author_id", "created_at", "in_reply_to_user_id", "id", "referenced_tweets", "text"],
					"expansions": ["attachments.media_keys", "referenced_tweets.id", "author_id"],
					"media.fields": ["alt_text", "media_key", "type", "url"]
				})

			if (response.errors) {
				error(new Error(JSON.stringify(response.errors[0])))
			}
			else if (response.data) {
				//info("QT fetché", response.data.text)
				return Object.assign(response.data, response?.includes)
			}
		}

		async function generateCard(urls, tweet): Promise<{}[] | undefined> {
			const { default: pMap } = await import('p-map')
			try {
				return await pMap(urls,
					async (url: string) => {
						const response = await fetch(url)
						if (!response.ok) {
							return
						}
						if (!response.headers.get('content-type')!.includes("text/html")) {
							return { url: url, title: "Lien vers la ressource" }
						}
						const html = await response.text()
						//info(response.url, response.headers)
						const metadata = await metascraper({ url: url, html: html })
						if (!metadata.url.includes("https://twitter.com")) {
							return metadata
						}
					})
			} catch (error) {
				console.log(error)
			}
		}
		const response = await client.tweets.findTweetById(
			thread.tweetID,
			{
				"tweet.fields": ["created_at", "in_reply_to_user_id", "id", "referenced_tweets", "text"],
				"expansions": ["attachments.media_keys", "author_id"],
				"media.fields": ["alt_text", "media_key", "type", "url"]
			})

		if (response.errors) {
			error(new Error(JSON.stringify(response.errors[0])))
			info(thread.title)
			return thread
		}
		else if (response.data) {
			info("tweet fetché", response.data.text)
			let tweet: Tweet = Object.assign(response.data, response?.includes)
			if (tweet.author_id !== author_id) {
				return thread
			}
			const urls = response.data.text.match(url_catcher)

			if (urls !== null) {
				const links = await generateCard(urls, tweet) as Links[]
				if (links) {
					tweet.linksMetadata = []
					tweet.linksMetadata = links
					if (tweet.linksMetadata.length < 1) {
						delete tweet.linksMetadata
					}
				}
			}
			let referenced_tweets = response.data?.referenced_tweets
			tweet.QTList = []
			if (referenced_tweets) {
				tweet.text = tweet.text.replace(url_catcher, "")
				tweet.text = (tweet.text === "" ? "Pas de texte dans ce tweet" : tweet.text)
				tweets.push(tweet)
				for await (const referenced_tweet of referenced_tweets) {
					thread.tweetID = referenced_tweet.id
					switch (referenced_tweet.type) {
						case "replied_to":
							await scheduler.wait(delay)
							info("the thread continues")
							return await getTweet(thread, tweets, client, cachedThread)
						case 'quoted':
							const QT = await getQT(thread.tweetID)
							if (QT) {
								tweet.QTList!.push(QT!)
							}
							break
						default:
							break
					}
				}
			} else {
				if (tweets.length === 1) {
					warning("This tweet doesn't answer to another tweet. Are you sure this is a thread?")
				}
				tweet.text = tweet.text.replace(url_catcher, "")
				tweet.text = (tweet.text === "" ? "Message vide." : tweet.text)
				tweets.push(tweet)
				console.log("found end of thread")
				thread.tweets = tweets
				await cachedThread.save(thread, "json")

				return thread
			}
		}
	}

	try {
		if (!token) {
			throw new Error("You need a bearer token")
		}
		const client = new Client(token)

		const threads = await pMap(threads_list, async thread => {
			let cachedThread = new AssetCache(String(thread.tweetID), ".cache", { duration: "1s", type: "json" })
			if (typeof thread.tweetID !== "string") {
				warning("tweetID must be a string")
				return
			}
			let tweets = []
			thread.startingID = thread.tweetID

			if (cachedThread.cachedObject) {
				info("found cache")
				const oldThread: Thread = await cachedThread.getCachedValue()
				if (thread.startingID === oldThread.startingID) {
					console.log("found tweet already saved")
					thread.tweets = oldThread.tweets!
					return thread
				}
				else {
					return getTweet(thread, tweets, client, cachedThread)
				}
			}
			else {
				return getTweet(thread, tweets, client, cachedThread)
			}
		})
		return threads


	} catch (error) {
		console.log('error', error)
	}
}