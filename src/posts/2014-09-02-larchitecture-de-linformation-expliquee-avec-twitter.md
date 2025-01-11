---
title: "L'architecture de l'information expliquée avec Twitter"
date: 2014-09-02
tags:
  - "architecture de l'information"
  - "conception"
  - "interface utilisateur"

---

Twitter est un terrain d'expérimentations intéressant pour les créateurs d'applications. Non parce que la plateforme permet des travaux révolutionnaires, mais au contraire parce qu'elle est limitée en complexité et encadrée par des règles assez strictes. Chacun fait de son mieux à partir des mêmes données, des mêmes concepts de base, des mêmes [interdictions](https://developer.twitter.com/fr/developer-terms/agreement-and-policy).

C'est aussi une bonne illustration d'une idée simple mais fondamentale en architecture de l'information : il n'y a pas qu'une manière d'organiser le contenu d'un service. Pour commencer, tout le monde n'est pas d'accord sur les concepts de base : rédiger, mentions, message privé, favoris, recherche, listes, abonnements, abonnés, activité, découverte, brouillon…

Seule une poignée de ces concepts est retenu pour figurer dans la navigation globale. Chaque application (y compris les versions officielles) fait des choix différents :

![twitter1](/img/twitter_1.png)

![Twittelator](/img/twitterlator.png " Twittelator pour iPad")

Les contraintes de place et les particularités de l'OS entrent aussi en jeu mais n'expliquent pas tout. Par exemple, la refonte de Twitter.com de 2011 a été pas mal [critiquée](http://daringfireball.net/2011/12/new_twitter) pour avoir relégué l'accès aux messages privés dans un sous-menu et créé un onglet "découverte". C'était une stratégie consciente pour privilégier les conversations publiques et les suggestions de contenu, pas seulement une question d'alléger l'interface.

![Twitter pour Mac](/img/twitter-mac.png) Autre exemple : tous les clients officiels choisissent d'enfouir les favoris dans un sous-menu du profil, à trois clics de profondeur. C'est aussi le cas sur Mac, alors que la navigation globale n'est pas vraiment bondée. Le choix se défend mais signale que pour eux, les favoris sont loin d'être une fonction essentielle.

Je n'ai pas encore parlé de la timeline. Tout s'articule autour de cette vue chronologie, mais là aussi on peut l'interpréter de diverses manières. La première version de Twitter mettait au même plan la chronologie publique et celle de l'utilisateur, vu qu'à l'époque le volume global de messages était faible. Quant à Tweetbot pour iPad, il permet de basculer entre la chronologie principale et les listes de l'utilisateur, si bien que, d'une certaine manière, celles-ci deviennent le concept premier. La chronologie n'est plus qu'une liste parmi d'autres.

![Twitter en 2006](/img/twitter_2006.jpeg " Twitter en 2006")

Citons également toute les expérimentations autour des conversations, qui contribuent à complexifier la timeline et à aller au-delà d'une simple présentation anté-chronologique.
