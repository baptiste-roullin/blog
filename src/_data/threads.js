const meta = require('./meta')

import threads from '../pages/threads/threader'
module.exports = (meta.twitterThread === "false" ? ["feature disabled"] : threads)



//TODO : arrêter les requêtes si tweet_id = tweet déjà en cache (pas juste le tout premier tweet)
//TODO : if lien externe générer card.
//TODO : if quote tweet : suivre lien et générer card. les données sont là, manque  le template.
//TODO : Acces à la liste quelque part dans la nav ou le site.
//TODO : remonter la chaine uniquement si author=saint_loup
//TODO : design
//TODO : compteur de requêtes pour ne jamais dépasser le rate limit
//TODO : fetchTwitter devrait retourner du json avec plein d'infos (id, etc.)
//TODO : card twitter dans <head>
//TODO : Héberger images