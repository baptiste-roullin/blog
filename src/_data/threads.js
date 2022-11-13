// @ts-nocheck

let threads_input = [
  {
    title: "speedrun",
    tweet_id: "1283068628372541444",
  },
  {
    title: "Dispositifs anti-covid",
    tweet_id: "1396823864701820941",
  }]

try {

  threads_input.forEach(async (thread) => {
    thread.tweets = await generateThread(thread.tweet_id)

  });



} catch (error) {
  console.log('error', error)
}

module.exports = threads_input


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

import { md } from '../config/markdown'
import meta from './meta'

//let tweet_id = '1576508215537201153'
//let tweet_id = '1289665741365497857'

var myHeaders = new Headers({
  "Authorization": `Bearer ${meta.twitterBearer}`,
  "Cookie": "guest_id=v1%3A165865221501677794"

})
const url_catcher = new RegExp(/(?:(?:https?):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig)

console.log(meta.twitterBearer);
async function generateThread(id) {



  const tweets = await fetchTwitter(id, [])
  console.log(tweets);
  return tweets
  /*return [{
    text: '<p>Genre finir Ocarina Time en 5 minutes en se téléportant à la scène finale. <a href="https://t.co/ioDsG5lpQd">https://t.co/ioDsG5lpQd</a></p>\n'
  },
  {
    text: '<p>Un truc assez fou dans les speedruns c’est l’exécution arbitraire de code (ACE). En gros, réaliser une série d’actions avec la manette pour manipuler la mémoire du jeu, y injecter des opérations et lui faire faire a peu près ce qu’on veut.<br>\n' +
      '<a href="https://t.co/mcSgb5MT3U">https://t.co/mcSgb5MT3U</a></p>\n'
  }]*/

}



async function fetchTwitter(tweet_id, thread) {
  try {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: "follow"
    };
    const request = await fetch(
      `https://api.twitter.com/2/tweets/${tweet_id}?
		expansions=referenced_tweets.id,attachments.media_keys
		&media.fields=media_key,url,alt_text
    &tweet.fields=created_at
		`,
      requestOptions)


    let data = await request.json()

    if (data.errors) {
      throw new Error(JSON.stringify(data.errors[0]))
    }

    if (data.status >= 400) {
      throw new Error(JSON.stringify(data))
    }

    let referenced_tweets = data.data?.referenced_tweets

    console.log(data + typeof referenced_tweets)
    let tweet = {}
    tweet.created_at = data?.data.created_at
    tweet.text = md.render(data?.data?.text || '')

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
  } catch (error) {
    console.log('error', error)
  }

}



// https://www.npmjs.com/package/metascraper
//https://github.com/sindresorhus/p-queue