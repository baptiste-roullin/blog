---
title: Un minuteur en PWA pour vos ateliers
date: 2020-04-10
tags:
  - travaux
hero:
  type: split  # options: carousel, graphic, video, split (text & image)
  image: "screenshot.png"
  alt: "screenshot de l'interface du minuteur"


---

J'ai fait un minuteur, il est joli, il est cool, il est disponible ici :

[c'est ici](https://misc.toutcequibouge.net/Timer/){.cta}



[![](/assets/images/screenshot.png)](https://misc.toutcequibouge.net/Timer/)

**Quoi qu'est-ce que c'est ?**

C'est un minuteur. il décompte le temps. Enfin, pas _tout_ le temps. Il compte le temps pendant un certain temps, que justement vous définissez, c'est le but. Il ne décompte pas le temps jusqu'à la fin des temps. Enfin, vous pouvez essayer de le régler à une valeur très très haute et attendre très très longtemps jusqu'à la mort thermique de l'univers, mais vous risquez d'attendre pour rien, ou de vous tromper dans votre estimation et de rater la fin à deux minutes près. Ce serait ballot.

Mais il est parfait pour minuter du collage de post-it.

- Il est pensé pour être bien visible, par exemple projeté en réunion ou en formation, pas sur téléphone ou dans un coin de votre écran.
- Les touches espace et entrée permettent de lancer et d’arrêter le minuteur.
- Si vous les acceptez, des notifications natives apparaitront à 50, 25, 10 et 0% du temps.
- D'après mes tests, il fonctionne même sans réseau.
- Via Chrome, il peut être installé en cliquant sur l’icône "plus" dans la barre d'adresse et apparaitra comme n'importe quelle application locale.

![](/assets/images/install.png)

**Pourquoi ?**

- Ce n'est pas sans utilité.
- C'était l'occasion de s'initier à Vue.js.
- Comme il y a plusieurs manières de modifier le temps, c'est un bon exercice de conception technique pour la gestion des états.
- Il y aussi des choix de conception à faire sur des actions d'apparence anodines. Par exemple : faut-il autoriser l'ajout de minutes en cours de route, sans même faire pause ? Pour moi oui, c'est un cas d'usage en pleine formation. OK, mais alors l'action de remise à zéro doit-elle réinitialiser à la durée d'origine, ou à cette durée assortie des minutes ajoutées ? Plein de petites questions comme ça.

**Détails techniques**

App en Vue.js, avec vue-cli et le [module cli-plugin-pwa](https://www.npmjs.com/package/@vue/cli-plugin-pwa) qui se charge d'une bonne partie de la transformation en PWA.

Si vous voulez rire, [le code est ici](https://github.com/baptiste-roullin/timer).

PWA : _[progressive web application](https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps)_. Un ensemble de technologies permettant d'enrichir une page web de fonctions réservées traditionnellement à des applications natives et locales. Notifications, fonctions hors-ligne, accès aux périphériques, etc,
