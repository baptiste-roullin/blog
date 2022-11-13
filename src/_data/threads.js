// @ts-nocheck
import { md } from '../config/markdown'
import meta from './meta'
import { scheduler } from 'node:timers/promises';


let threads_input = [
  /*  {
      title: "speedrun",
      tweet_id: "1283068628372541444",
    },*/
  {
    title: "Dispositifs anti-covid",
    tweet_id: "1582431501144100865",
  },
  {
    title: "films de procès",
    //"tweet_id": "1245822522563715072"
    tweet_id: "1317402466636488704"
  }
]


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

const url_catcher = new RegExp(/(?:(?:https?):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig)

async function fetchTwitter(tweet_id, thread, thread_input) {
  try {
    var myHeaders = new Headers({
      "Authorization": `Bearer ${meta.twitterBearer}`,
    })
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: "follow",

    };
    console.log(tweet_id);

    const request = await fetch(
      `https://api.twitter.com/2/tweets/${tweet_id}?tweet.fields=created_at,in_reply_to_user_id,id,referenced_tweets,text&expansions=attachments.media_keys,referenced_tweets.id&media.fields=alt_text,media_key,type,url`
      ,
      requestOptions)


    let data = await request.json()

    if (data.errors) {
      throw new Error(JSON.stringify(data.errors[0]))
    }

    if (data.status >= 400) {
      throw new Error(JSON.stringify(data))
    }

    let referenced_tweets = data.data?.referenced_tweets

    let tweet = {}
    tweet.created_at = data?.data.created_at
    tweet.text = md.render(data?.data?.text || '')
    if (data?.includes?.media) {
      tweet.media = data?.includes.media.map(media => media.url)
    }
    thread.push(tweet)

    if (referenced_tweets) {
      tweet_id = referenced_tweets[referenced_tweets.length - 1].id
      //console.log(referenced_tweets.map(tweet => tweet.id) + "\n")
      await scheduler.wait(3000);

      return await fetchTwitter(tweet_id, thread, thread_input)
      /*	if (referenced_tweets.length > 0) {

        }*/

    } else {
      thread.push(tweet)
      thread_input.tweets = thread

      return thread_input
    }
  } catch (error) {
    console.log('error', error)
  }

}


module.exports = async function () {
  return Promise.all(threads_input.map(
    async thread_input => fetchTwitter(thread_input.tweet_id, [], thread_input))
  )

}

// https://www.npmjs.com/package/metascraper
//https://github.com/sindresorhus/p-queue