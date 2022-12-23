---
title: "Archiver des fils Twitter : panorama des possibilités"
date: 2022-12-20
tags:
  - "tout ce qui bouge"
  - "projets"
---

Pour archiver des fils de votre compte, l'export fourni par Twitter ne suffit pas. Chaque tweet est isolé, sans les messages auquel il répond. Plus fondamentalement, la notion de "thread" n'existe pas dans l'API.

Il faut se tourner vers des outils externes.

Pour exporter un **fil récent**, on peut [utiliser cet outil en ligne](https://threadreaderapp.com/), très simple puisqu'il suffit d'entrer l'URL d'un tweet. Mais ne marche pas avec de vieux messages.

Avec **un export officiel**,  on peut utiliser cet [outil un peu compliqué](https://github.com/tweetback/tweetback/) ou [celui-ci, plus simple](https://tinysubversions.com/twitter-archive/make-your-own/). Ils créent un mini-site web avec tous ses tweets, issus de fils ou non.

Il y a cette [expérimentation en ligne](https://social.perma.cc/#why-faq) qui simule un navigateur scrollant Twitter pour **générer un PDF**, à des fins de notarisation et de preuve d'authenticité.

Et à ma connaissance, c'est tout. A cause des limites de l'API, il n'existe pas d'outils respectant les critères suivant :

1. Pas besoin de télécharger l'export officiel si le fil évolue ;
2. Marche avec des vieux threads ou des threads couvrant une longue période ;
3. Marche à partir du premier tweet d'un fil, pas uniquement le dernier ;

Du coup j'ai codé [un truc](https://github.com/baptiste-roullin/blog/blob/dev/src/heroPages/threads/threader.ts). Bon c'est moins complet que les autres et ça respecte pas le troisième critère (impossible avec l'API), mais en gros vous lui donnez un token d'accès à l'API et une liste de threads (un titre et l'ID d'un tweet de départ) et ça recrache un fichier JSON avec en gros :

- Le contenu des tweets eux-même
- Le contenu des tweets cités, même d'autres auteurs, souvent indispensable à la compréhension d'un fil.
- Un aperçu des liens avec titre, image, etc.

Le script est pensé pour tourner régulièrement et alimenter mon blog. Si aucun nouveau tweet n'est détecté, il s'arrête et réutilise les anciennes données en cache.

Par ailleurs, mon blog génère automatiquement une page [listant tous les fils](/threads) et une page pour chacun d'entre eux.
