const meta = require('../../_data/meta')
// @ts-ignore
import { scheduler } from 'node:timers/promises'
const yaml = require('js-yaml')
const fs = require('fs')

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



async function getTweet(thread: Thread, tweets: Tweet[], client: Client, cachedThread) {
	const { default: pMap } = await import('p-map')


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

	async function generateCard(urls, tweet): Promise<{}[]> {
		return await pMap(urls,
			async (url: string) => {
				const response = await fetch(url)
				const html = await response.text()
				const metadata = await metascraper({ url: url, html: html })
				if (!metadata.url.includes("https://twitter.com")) {
					return metadata
				}

			})

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
		let referenced_tweets = response.data?.referenced_tweets

		let tweet: Tweet = Object.assign(response.data, response?.includes)
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

		if (referenced_tweets) {
			for await (const referenced_tweet of referenced_tweets) {
				thread.tweetID = referenced_tweet.id
				if (!tweet.QTList) {
					tweet.QTList = []
				}
				switch (referenced_tweet.type) {
					case "replied_to":
						tweet.text = tweet.text.replace(url_catcher, "")
						tweet.text = (tweet.text === "" ? "Message vide. Le tweet était probablement juste un \"quote tweet\"" : tweet.text)
						tweets.push(tweet)
						await scheduler.wait(3500)
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
				warning("This tweet doesn't answer to another tweet. Are you sure this is a thread ?")
			}

			info("found end of thread")
			thread.tweets = tweets
			//info(thread)

			await cachedThread.save(thread, "json")

			return thread
		}
	}
}

export default async function threader() {

	try {
		const client = new Client(meta.twitterBearer)
		const threads_list = yaml.load(fs.readFileSync('./src/pages/threads/threads_input.yaml', 'utf8')) as Thread[]


		return await Promise.all(threads_list.map(
			async thread => {
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
						info("found tweet already saved")
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
			}
		))

	} catch (error) {
		console.log('error', error)
	}
}


//https://github.com/sindresorhus/p-queue