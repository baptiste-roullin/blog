---
title: "Les méthodes de déplacement du curseur sur un clavier tactile"
date: 2015-03-01
tags:
  - "mobile"

---

La saisie de texte est devenue raisonnablement bonne sur les principaux OS mobiles. Tous ont des systèmes de saisie prédictive (pour anticiper le mot suivant le plus susceptible d'être tapé) et des méthodes de saisie au « tracé » (sans appuyer sur chaque lettre, genre Swype ou SwiftKey).

Ça se corse pour ce qui est de manipuler le texte : sélection, déplacement, copie, etc. Pour ces fonctions avancées, une opération essentielle est de placer le curseur. Sur mobile, sans souris ni touches directionnelles, c'est compliqué. Je vois en gros trois méthodes pour ça (liste non-exhaustive) :

La **manipulation directe**, en déplaçant le doigt le long du texte. Les implémentations varient. Sur Android, un premier tap déplace le curseur et fait apparaitre une poignée pour le déplacer de manière continue. Sur Windows Phone 8.1, cette poignée est visible en permanence. Dans les versions précédentes de Windows Phone, il fallait maintenir le tap pour pouvoir placer précisément le curseur. Par ailleurs, Le système était calibré pour demander de plus grands gestes et ainsi favoriser les déplacements de quelques lettres.

La manipulation **indirecte**. Notamment, pas mal d'éditeurs de texte pour tablette ont une barre de touches supplémentaires avec des boutons « droite » et « gauche » ou « placer au début du mot » et « à la fin du mot ». ![iA-Writer clavier](/img/iA-Writer-e1425234291570.jpg " iA-Writer")

Enfin, les méthodes que faute de mieux j’appellerais « **alternatives**. Je pense au tout nouveau clavier de Windows Phone 10, qu'on voit très brièvement dans [cette vidéo](https://www.youtube.com/watch?feature=player_detailpage&v=mzTG0VbxVfw#t=57). En appuyant sur le rond en bas à gauche, on fait apparaitre des touches directionnelles.

![Clavier Windows Phone 10](/img/wp_ss_20150212_00291-e1425235668479.png " Windows Phone 10")

Il faut aussi citer [le prototype](https://www.youtube.com/watch?v=RGQTaHGQ04Q) de Daniel Hooper, dans lequel glisser latéralement avec un doigt, n’importe où sur le clavier, déplace le curseur (ou avec deux pour sélectionner le texte). Je trouve ça assez brillant, même si c’est difficilement cumulable avec des systèmes de type Swipe. Hélas, des limitations d’API empêchent l’ajout d’un tel clavier à iOS sous forme d’extension.

MISE À JOUR : je découvre qu'Editorial, un très bon éditeur de texte pour iOS, a combiné méthode de Hooper et barre de touches, puisqu'il permet de déplacer le curseur en glissant son doigt sur la barre.
