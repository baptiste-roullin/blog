const meta = require('./meta')

import threads from '../pages/threads/threader'
module.exports = (meta.twitterThread === "false" ? ["feature disabled"] : threads)


//todo : indenter QT
//TODO : arrêter les requêtes si tweet_id = tweet déjà en cache (pas juste le tout premier tweet)
//TODO : remonter la chaine uniquement si author=saint_loup
//TODO : compteur de requêtes pour ne jamais dépasser le rate limit
//TODO : card twitter dans <head>
//TODO : Ré-héberger images
//TODO : check si cache est inutilisable.