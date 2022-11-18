// @ts-nocheck
import meta from './meta'
import { scheduler } from 'node:timers/promises';



let threads_input = [
  {
    title: "Dispositifs anti-covid",
    tweet_id: "1593334707093209099",
    //tweet_id: "1289665741365497857"
  },
  {
    title: "films de procès",
    tweet_id: "1317402466636488704"
    //tweet_id: "1245822522563715072"
  }
]


// @Todo : if lien externe générer card
// @Todo : if quote tweet : suivre lien et générer card
// @todo : card twitter dans <head>
// @todo : remonter la chaine uniquement si author=saint_loup
// @todo : design
// @todo : mettre en cache json résultats
// @todo : arrêter les requêtes si tweet_id = tweet déjà en cache.
// @todo : compteur de requêtes pour ne jamais dépasser le rate limit
// @todo : déplacer threads_input dans fichier yaml.
// @todo : retester de sortir thread.js du dossier_data.

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
    tweet.text = data?.data?.text || ''
    if (data?.includes?.media) {
      tweet.media = data?.includes.media.map(media => media.url)
    }
    thread.push(tweet)

    if (referenced_tweets) {
      tweet_id = referenced_tweets[referenced_tweets.length - 1].id
      //console.log(referenced_tweets.map(tweet => tweet.id) + "\n")
      await scheduler.wait(3000);
      return await fetchTwitter(tweet_id, thread, thread_input)

    } else {
      //thread.push(tweet)
      thread_input.tweets = thread.reverse()

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