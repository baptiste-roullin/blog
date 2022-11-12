// @ts-nocheck

/*const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-description')(),
	require('metascraper-image')(),
	require('metascraper-logo')(),
	require('metascraper-clearbit')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')()
])*/

import { md } from '../../config/markdown'
import meta from '../../_data/meta'
const threads = require('../../_data/threads_inputs.json')
console.log(threads);

//let tweet_id = '1576508215537201153'
//let tweet_id = '1289665741365497857'

var myHeaders = new Headers({
	"Authorization": `Bearer ${meta.twitterBearer}`,
})
const url_catcher = new RegExp(/(?:(?:https?):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig)

module.exports = async function () {
	try {
		const promises = threads.map((thread) => {
			console.log(thread);

			fetchTwitter(thread.tweet_id, [])

		});
		console.log(promises);
		return await Promise.all(promises)

		//return await fetchTwitter(threads[0].tweet_id, [])

	} catch (error) {
		console.log('error', error)
	}
}

async function fetchTwitter(tweet_id, thread) {

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: "follow"
	};
	const request = await fetch(
		`https://api.twitter.com/2/tweets/${tweet_id}?
		expansions=referenced_tweets.id,attachments.media_keys
		&media.fields=media_key,url,alt_text
		`,
		requestOptions)


	let data = await request.json()

	if (data.errors || data.status >= 400) {
		throw new Error(JSON.stringify(data.errors[0]))
	}


	let referenced_tweets = data.data?.referenced_tweets

	console.log(data + typeof referenced_tweets)
	let tweet = {}

	tweet['tweet'] = md.render(data?.data?.text || '')
	if (data?.includes?.media) {
		tweet['media'] = data?.includes.media.map(media => media.url)
	}
	thread.push(tweet)

	if (referenced_tweets) {
		tweet_id = referenced_tweets[referenced_tweets.length - 1].id
		//console.log(referenced_tweets.map(tweet => tweet.id) + "\n")

		fetchTwitter(tweet_id, thread)
		/*	if (referenced_tweets.length > 0) {

			}*/

	} else {
		thread.push(tweet)

		console.log(thread);

		return thread
	}
}







// https://www.npmjs.com/package/metascraper
//https://github.com/sindresorhus/p-queue