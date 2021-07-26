---
title: "Le Principe de robustesse"
date: 2014-05-16
tags:
  - "réflexions"
  - "systemes complexes"


---

Dans le domaine des protocoles de communication, le Principe de robustesse veut qu'un nœud d'un réseau (par exemple un serveur sur Internet) soit tolérant quand il décide d'accepter ou non un message plus ou moins bien formé, et qu'il soit plus rigoureux sur la qualité des messages qu'il envoie. Le principe voit son origine dans les débats autour de l'importance qu'il faut donner à une norme de communication : la stratégie optimale pour la robustesse du réseau, ce serait de suivre la norme de près en output mais beaucoup moins en input.

Par la suite (RFC 1122, § 1.2.2), il été a interprété de manière plus large comme un principe de prévoyance :

> Software should be written to deal with every conceivable error.

C'est-à-dire : rendez votre programme robuste en le concevant de telle sorte à qu'il fonctionne avec les plus inputs les plus variés.

La rhétorique dispose d'un couple de règles très similaire : les principes d'honnêteté intellectuelle et de charité. Le premier revient à dire qu'il faut faciliter le travail de compréhension de l'interlocuteur, le second qu'il faut interpréter ses propos de la manière la plus avantageuse possible. (Note : c'est une vision à minima. L'honnêteté intellectuelle ne se limite pas à un souci de clarté. De manière plus drastique, ces principes rappellent qu'il faut veiller à avoir un langage et des valeurs de discussion communs.)

Il y a un troisième domaine où ce principe peut s'appliquer : les IHM. La manipulation d'un programme peut être vue comme un dialogue : l'utilisateur demande quelque chose et le système répond qu'il a bien effectué (ou non) la tâche, tout ceci via le language de l'interface. La métaphore a notamment été développée par Hutchins dès 1987 (article [en lien ici](http://www.dtic.mil/dtic/tr/fulltext/u2/a182248.pdf) – PDF pourrave mais réflexion passionnante), qui en note aussi les limites : elle suppose qu'il y a une médiation de type symbolique entre l'homme et la machine, avec toute la complexité et l’ambiguïté que cela implique.

Pourtant, cette métaphore de la conversion s'applique encore à bien des cas, par exemple la complétion d'un formulaire : j'entre une date et le programme me répond si elle a bien été comprise. Une bonne interface est tolérante dans les formats possibles qu'elle admet en entrée et rigoureuse (cohérente) à chaque fois qu'elle doit afficher une date en sortie.

[Le principe de robustesse sur Wikipedia](http://en.wikipedia.org/wiki/Robustness_principle)
