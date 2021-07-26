---
title: "Un menu radial inspiré des jeux de tir"
date: 2013-04-16
tags:
  - "jeu vidéo"

---

_Résumé : Plein de mots arides sur les modes en IHM, puis une modeste proposition d'interaction pour écran tactile._

## Rappels sur les modes

En IHM, un mode est un paramètre qui permet de produire différents résultats avec le même input, selon que ce mode soit activé ou non. C'est en fait très simple : par exemple enclencher la touche Caps Lock fait basculer les autres touches en mode « lettre capitale ».

On considère classiquement que c'est une technique utile mais à manier avec précaution. C'est pratique pour augmenter l'éventail des possibilités. Les touches Shift et Caps Lock permettent de doubler le nombre de caractères que l'on peut entrer, alors que les premières machines à écrire avaient un clavier dédoublé ou devaient se contenter d'une seule casse. Le problème est que cela risque d'égarer l'utilisateur. Vous vous souvenez sans doute de l'inénarrable mode « refrappe » : on pouvait l'activer avec la touche Insert et ce n'était signalé que par un minuscule RFP en bas de la fenêtre de Microsoft Word. Il était facile d'entrer dans ce mode sans le vouloir mais nettement plus difficile d'en sortir, quand on ne connaissait pas le truc.

## Jeux vidéo et quasi-modes

Si on veut avoir le beurre et l'argent du beurre, Jeff Raskin recommande l'utilisation de ce qu'il appelle des [quasi-modes](http://en.wikipedia.org/wiki/Mode_%28computer_interface%29#Quasimodes), c'est-à-dire des modes qui demandent une intervention constante de la part de l’utilisateur. Citons le cas du pédalier d’un piano ou la touche Shift d’un clavier : elle n’a pas d’effet si elle n'est pas pressée. Cela demande plus de coordination motrice, mais en contrepartie les deux actions (ici, shift + lettres) sont liées et concomitantes. L'utilisateur a ainsi plus de contrôle sur le système et cela diminue les risques de rester dans un mode sans s'en rendre compte.

![Dishonored](/assets/images/Dishonored.jpg)

Dishonored (ZeniMax / Arkane Studios, 2012)

Certains jeux vidéo croisent cette idée avec celle des menus radiaux (cf. la capture d'écran supra). Si on veut par exemple changer d'arme, on maintient une touche (souvent la molette de la souris) pour faire apparaitre un cercle d’items. Diriger la souris dans la direction d’un item permet de le sélectionner. C’est une très bonne idée qui fait intervenir plusieurs concepts :

- La mémoire musculaire (ou apprentissage moteur). Au début, il faut apprendre à situer et reconnaitre le pictogramme de l'item souhaité, mais avec l’habitude tout ce qu’il y a savoir, c’est un mouvement de la main selon un certain angle.
- La loi de Fitts, selon laquelle le temps mis par l'utilisateur pour atteindre une cible dépend de sa taille et de son éloignement (je schématise). Ici la distance est infime (il faut à peine bouger la souris) et la taille angulaire est grande (plus ou moins, selon le nombre d'items).
- Le quasi-mode. Ici, le fait de devoir maintenir la touche est une force plutôt qu'un pis-aller, car ce genre de menu sert d'accès rapide. Il est utilisé souvent et brièvement. Ce ne serait pas adapté pour l'inventaire d'un jeu de rôle, dans lequel on s'attarde plus.

Le design d'interfaces pourrait s'inspirer de cette idée. Cela fait longtemps que les menus radiaux sont utilisés ici et là, mais ce n'est pas toujours convaincant. Dernièrement, on peut citer l'excellente application [OneNote](https://www.youtube.com/watch?v=ZkEa4piu8LY) sur la Surface de Microsoft, ou bien les widgets s'inspirant de Path – lesquels qui brillent surtout par leur animation.

Je trouve l'idée particulièrement adaptée aux écrans tactiles, donc j'ai en tête un modèle d'interaction de ce genre : presser deux doigts pour faire apparaitre un menu, puis les faire glisser vers l'item désiré. Décoller les doigts de l'écran suffit à sélectionner ce dernier. L'interaction conjugue la facilité des gestes tactiles et l'immédiateté du feedback visuel. Le résultat est fluide puisque les doigts ne quittent pas l'écran. Dans l'animation ci-après (oui c'est juste un Gif pourri), le menu apparait vers le haut pour ne pas être caché par la main. L'exemple est assez limité (partager un article vers divers services), mais au-delà ce genre d'interaction me semble prometteur.

<figure>
<img id="freezegif" src="/assets/images/2x_Press_Hold.gif">
</figure>


Cela pourrait être utilisé soit comme menu contextuel, soit comme menu global (ie qui permettrait d'accéder aux même actions quelque soit l'endroit où j'appuie). Le premier cas serait utile avec beaucoup de cibles potentielles distinctes (par exemple une page pleine de liens), tandis que le second serait plus avantageux avec des actions répétitives (par exemple accéder à une palette d'outils dans une application de dessin). Je suis preneur d'avis et de critiques. L'utilisabilité aussi bien que l'utilité de cette proposition sont certainement critiquables et j'ai pu passer à coté de travaux semblables.

