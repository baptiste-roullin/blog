---
title: "Difficultés de navigation entre sites web et applications mobiles"
date: 2014-04-24
tags:
  - "mobile"

---

Dans un [article récent](http://daringfireball.net/2014/04/rethinking_what_we_mean_by_mobile_web), John Gruber nous invite à aller au-delà de la dichotomie entre app native et web app et à repenser ce que nous entendons par "web mobile" :

> Lancer Tweetbot sur mon iPhone, appuyer sur un lien qui ouvre une page web en restant dans l'app et, depuis cette page, ouvrir une vidéo dans l'application Youtube – tout ceci fait très « web » pour moi.

Ce qui m'intéresse ici, ce sont les problèmes de navigation que cela pose. Sur un téléphone Android standard et sans surcouche, supposez que je fais une recherche sur Internet à propos d'un article que j'ai lu, que j'ouvre un lien vers Wikipedia, puis une image. Un parcours tout à fait banal, à ceci près que la recherche s'est faite dans l'application Google Search, que les liens Wikipedia envoient automatiquement vers l'application dédiée et que l'article était ouvert depuis un lecteur de RSS. Tout ceci est du contenu web mais se retrouve éclaté entre de nombreuses applications. Parmi tous ces rôles traditionnellement assumés par le navigateur, il s'est seulement chargé d'ouvrir l'image. Ergonomiquement, le résultat est assez fâcheux.

- Quand je veux revenir en arrière, il faut que je me souvienne où est l'article : l'avais-je ouvert depuis un site web ou depuis une de ces nombreuses applications ouvrant le contenu d'un lien dans une webview ?
- Il faudrait évoquer également la question du passage d'une application à une autre. Par exemple une app peut ouvrir une carte d'elle-même ou renvoyer vers Google Maps. Facebook a d'ailleurs récemment proposé [un protocole](http://applinks.org/) les renvois entre applications.
- La plupart des applications ne sont pas des clones du site mobile équivalent, ce qui perturbe les attentes de l'utilisateur. Par exemple Google Search ne permet pas d'utiliser le mode de shopping ou de partage une recherche.

Comparez ça à la simplicité de certaines cartes mentales suggérées à l’utilisateur : « tout est dans le navigateur », « tout est sur le bureau », « toutes vos photos seront automatiquement synchronisés au même endroit », etc. Tant qu'elles ne s'écartent pas trop de la réalité, ces suggestion représentent un guide puissant.
