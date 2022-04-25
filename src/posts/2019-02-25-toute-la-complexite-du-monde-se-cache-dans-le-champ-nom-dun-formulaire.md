---
title: "Toute la complexité du monde se cache dans le champ Nom d'un formulaire"
date: 2019-02-25
tags:
  - "inclusion"
  - "réflexions"
  - "systemes complexes"
featured: true
hero:
  type: split  # options: carousel, graphic, video, split (text & image)
  image: "janewu.png"
---

![](/assets/images/janewu.png)

Une personne n'a pas forcément un seul prénom suivi d'un seul nom de famille. Elle peut avoir un seul nom, ou trois prénoms et quatre noms de famille, en changer au cours de sa vie, son nom peut être très long ou très court... il y a [tellement de variantes](https://shinesolutions.com/2018/01/08/falsehoods-programmers-believe-about-names-with-examples) à travers les sociétés humaines que l'exception doit être considérée comme la norme. Cette complexité existe aussi pour les [numéros de téléphone](https://github.com/googlei18n/libphonenumber/blob/master/FALSEHOODS.md), les [adresses](https://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses) et [codes postaux](http://www.sirius-upvm.net/doc/usuels/codes_postaux.html), et pour tant d'autres mécanismes qu'il existe toute une littérature à ce sujet, avec un titre devenu coutumier : "Les erreurs que font les développeurs avec \[bidule\]".

S'il existe [une longue liste](https://github.com/kdeldycke/awesome-falsehood/blob/master/README.md) de ces dispositifs, c'est qu'ils sont trop souvent mal pris en compte en informatique. Cela peut avoir des conséquences très gênantes, par exemple si votre [nom de famille](https://www.wired.com/2015/11/null/) est aussi un mot réservé qui signifie le "rien" en programmation et que vous faites tout bugger.

C'est un problème classique d'écart entre le territoire et la carte. Un concepteur modélise la réalité comme il peut, en faisant des raccourcis : un être humain est identifié par un prénom et un nom, dans cet ordre et sans rien d'autre. Il doit bien exister deux trois exceptions mais on verra plus tard, se dit-il.

Les noms sont déjà complexes, alors imaginez une notion comme la famille. Par exemple le service Google Play Family impose des règles qui forment une [définition implicite](https://twitter.com/edent/status/846270908138426369).

![](/assets/images/C76O4a6W0AENhCT.jpg-large.jpg)

Admettons que ce sont surtout des limites commerciales pensées pour que les gens n'abusent pas du système en ajoutant trois cent personnes du monde entier à leur "famille". Mais quand même. Qui est Google pour dire qu'une famille ne peut être composée de nombreuses personnes vivant dans plusieurs pays ? Ensuite, ça influe forcément sur la vie des gens : le service devient intriqué avec leur quotidien et définit quels films peut regarder un enfant, avec qui et sur quel appareil. Tout ça dans un contexte d'objets toujours plus présents et connectés, où la famille peut avoir un appareil Google dans chaque pièce et plus d'appareils que de membre.

## Nom, prénom et design tragique

Bref, concevoir un système peut avoir des conséquences graves et inattendues, c'est un thème dont la profession prend conscience, avec différents approches ([design tragique](https://www.tragicdesign.com/), [design systémique](https://en.m.wikipedia.org/wiki/Systemic_design?wprov=sfla1)...) et spécialités ([impact sur les minorités](https://www.udeducation.org/product/diversity-and-design), [biais et automatisation forcenée](https://medium.com/s/story/the-seductive-diversion-of-solving-bias-in-artificial-intelligence-890df5e5ef53) en intelligence artificielle...).

Mais ce que j'aime avec mes exemples, c'est qu'ils paraissent anodins. Il ne s'agit pas de [l'UI qui a causé l'envoi d'une fausse alerte d'attaque de missiles à tout Hawaï](https://twitter.com/DesignUXUI/status/953305994804674561) ou de cockpits d'avions mal conçus. La majorité des gens aujourd'hui saisissent leur nom en deux secondes et leur adresse par auto-complétion. Pourtant les noms sont une construction sociale à l'intersection de nombreux enjeux :

- [Filiation](https://fr.wikipedia.org/wiki/Filiation) et anthropologie de la famille
- [Genre et inclusion](https://uxdesign.cc/designing-forms-for-gender-diversity-and-inclusion-d8194cf1f51)
- Différence entre [réglementation et usages](https://www.nouvelobs.com/rue89/rue89-nos-vies-connectees/20111016.RUE4957/galere-quotidienne-garder-son-nom-de-naissance-quand-on-est-mariee.html). Tiens tiens, encore une question de genre.
- Norme Unicode, elle-même sujette à des controverses géo-politico linguistiques, expliquées [ici](https://en.wikipedia.org/wiki/Han_unification) et [là.](https://modelviewculture.com/pieces/i-can-text-you-a-pile-of-poo-but-i-cant-write-my-name)
- Sécurité de l'information et de notre identité numérique
- [Liberté d'expression](https://www.eff.org/issues/anonymity)
- Et j'en passe.

Enfin et plus largement, les noms de personnes sont en eux-même un phénomène social complexe, avec un champ d'étude dédié en sciences sociales : l'anthroponymie, dont on pourra lire une [synthèse fascinante ici](https://www.persee.fr/doc/lgge_0458-726x_1982_num_16_66_1127). Elle nous apprend qu'ils ne servent pas qu'à identifier une personne, loin de là, mais aussi à classer et hiérarchiser, à inscrire la personne dans une certaine organisation sociale et symbolique, ainsi qu'à s'adresser à elle d'une certaine manière, dans un certain contexte.

Bref, pour peu qu'on creuse un peu, toute la complexité de ce qu'on appelle un [système socio-technique](https://jnd.org/norman_stappers_2016_designx_design_and_complex_sociotechnical_systems) peut surgir d'un modeste champ de formulaire.
