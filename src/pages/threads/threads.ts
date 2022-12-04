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
		QT?:
		components["schemas"]["Tweet"] &
		components["schemas"]["Expansions"]
	}

interface Thread {
	tweets: Tweet[] | undefined,
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


	async function getQT(tweetID, tweet: Tweet) {
		const response = await client.tweets.findTweetById(
			tweetID,
			{
				"tweet.fields": ["created_at", "in_reply_to_user_id", "id", "referenced_tweets", "text"],
				"expansions": ["attachments.media_keys", "referenced_tweets.id"],
				"media.fields": ["alt_text", "media_key", "type", "url"]
			})

		if (response.errors) {
			error(new Error(JSON.stringify(response.errors[0])))
		}
		else if (response.data) {
			info("QT fetché", response.data.text)
			let QT: Tweet = Object.assign(response.data, response?.includes)

			tweet.QT = QT
		}
	}

	async function generateCard(urls, tweet): Promise<{}[]> {
		return await pMap(urls,
			async (url: string) => {
				const response = await fetch(url)
				if (!response.url.includes("https://twitter.com")) {
					const html = await response.text()
					const metadata = await metascraper({ url: url, html: html })
					return metadata
				}

			})

	}
	const response = await client.tweets.findTweetById(
		thread.tweetID,
		{
			"tweet.fields": ["created_at", "in_reply_to_user_id", "id", "referenced_tweets", "text"],
			"expansions": ["attachments.media_keys", "referenced_tweets.id"],
			"media.fields": ["alt_text", "media_key", "type", "url"]
		})

	if (response.errors) {
		error(new Error(JSON.stringify(response.errors[0])))
	}
	else if (response.data) {
		info("tweet fetché", response.data.text)
		let referenced_tweets = response.data?.referenced_tweets

		let tweet: Tweet = Object.assign(response.data, response?.includes)


		const urls = response.data.text.match(url_catcher)
		if (urls) {
			tweet.linksMetadata = await generateCard(urls, tweet) as Links[]

		}



		if (referenced_tweets) {
			thread.tweetID = referenced_tweets[referenced_tweets.length - 1].id
			for await (const referenced_tweet of referenced_tweets) {
				switch (referenced_tweet.type) {
					case "replied_to":
						await scheduler.wait(1000)
						return await getTweet(thread, tweets, client, cachedThread)
					case 'quoted':
						await getQT(referenced_tweet.id, tweet)
						break
					default:
						break
				}
			}

			tweets.push(tweet)

		} else {
			if (tweets.length === 1) {
				warning("This tweet doesn't answer to another tweet. Are you sure this is a thread ?")
			}

			info("found end of thread")
			thread.tweets = tweets
			await cachedThread.save(thread, "json")

			return thread
		}
	}
}

export default async function threads() {

	try {
		const client = new Client(meta.twitterBearer)
		const threads_list = yaml.load(fs.readFileSync('./src/pages/threads/threads_input_TEST.yaml', 'utf8')) as Thread[]

		if (meta.twitterThread === false) {
			return []
		}
		return await Promise.all(threads_list.map(
			async thread => {
				let cachedThread = new AssetCache(thread.tweetID, ".cache", { duration: "1s" })
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





// https://www.npmjs.com/package/metascraper
//https://github.com/sindresorhus/p-queue