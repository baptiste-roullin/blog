---
title: "Le responsive design ailleurs que sur le web"
date: 2014-06-12
tags:
  - "conception"
  - "responsive"
  - "interface utilisateur"
---

Les applications natives mobiles, sur [Android](https://developer.android.com/training/multiscreen/index.html) (et [Apple](http://alistapart.com/blog/post/apple-and-responsive-design) depuis peu) ont accès à des fonctions responsive, mais sur desktop la pratique est moins fréquente. Non seulement les interfaces ont rarement des agencements différents selon la taille de la fenêtre, mais en plus elles ne sont pas toujours fluides, c'est-à-dire que tailles et marges des éléments ne sont pas redimensionnées. Certains logiciels bloquent également la largeur minimale de la fenêtre, parfois drastiquement. C'est dommage, car ce serait l'occasion de mieux prendre en compte les petits écrans (cf. par exemple les distributions de Linux visant spécifiquement les notetbooks) et toutes les manières d'utiliser un OS fenêtré.

Il y a évidemment des contre-exemples : en mode album, iTunes ajuste le nombre de colonnes et la taille des jaquettes. Depuis des années, Microsoft adapte intelligemment son fameux « ribbon », avec un grand nombre de points de rupture au fur et à mesure qu'on réduit la fenêtre.

![ribbon microsoft word en responsive design ](/img/2016-10-30_16h32_25.png)

Dans mon expérience, ce n’est pourtant pas fréquent. Il y a évidemment de bonnes raisons pour ces limitations. D'une, dans la plupart des cas on a affaire à un viewport dont le contenu est par définition fixe (exemple : une page Word). On peut alors seulement jouer sur l’UI (comme dans l’exemple d’Office). De deux, on retombe sur le grand problème du « device-agnostic responsive design » (concevoir pour une largeur donnée, sans préjuger de l'appareil utilisé) : il est difficile de prédire les préférences des gens. Si je redimensionne la fenêtre, serais-je content d'avoir un agencement adapté et sans scroll horizontal, ou au contraire énervé qu'on m'impose quelque chose ? Suivant les cas et les raisons du redimensionnement, la réponse varie.

La solution la plus utilisée dans les logiciels de productivité un peu complexes, c'est de laisser l'utilisateur personnaliser les différentes palettes, barres et panneaux d’interface comme il l'entend. Par exemple, Photoshop permet de créer différents « espaces de travail », c'est-à-dire différents agencements que l'utilisateur pourra activer comme il lui sied.

Jusqu'ici j'ai surtout parlé du cas assez restreint où l'utilisateur redimensionne sa fenêtre. Le problème du responsive se pose de manière peut-être plus aiguë si l'on veut créer des services dans l'écosystème Windows. Microsoft promet une [plateforme unifiée](http://readwrite.com/2014/04/03/microsoft-universal-windows-app-store-developers-unified-code-base) où le développement à travers les OS sera unique, ou en tout cas facilité. Que Microsoft tienne sa promesse et que ce soit une bonne idée ou non, il reste que Windows, ([feu ?](http://arstechnica.com/information-technology/2013/12/why-microsoft-needs-three-or-more-operating-systems/)) Windows RT et Windows Phone sont de plus en plus bâtis sur les mêmes fondations, aussi bien dans le design que dans la technique. Cela pose la question de la convergence des différentes applications : à quel point doivent-elles être semblables, faut-il un processus de conception unique, etc.
