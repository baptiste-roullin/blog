---
title: "Leçons ergonomiques et techniques d'un projet perso"
date: 2016-05-23
tags:
  - "projets"
---

Il y a quelques mois j'ai publié un outil pour calculer une addition en terme de tickets resto ([le post de l'époque est ici](https://toutcequibouge.net/2016/01/un-bidule-optimise-pour-la-main-mais-code-avec-les-pieds/)). Je sais, rien ne m'arrête. Voici une mise à jour, avec notamment des visuels plus travaillés, ainsi qu'un clavier sur mesure et toujours présent à l'écran.

Vous pouver [l'ouvrir ici](https://misc.toutcequibouge.net/TR/), de préférence depuis votre ordiphone préféré.

![](/assets/images/TR.png)

<iframe class="TR" style="border: none;border-radius:5px;display:none; margin:auto; background-color:black;" src="https://misc.toutcequibouge.net/TR/" width="400" height="600"></iframe>

## Pourquoi un thème sombre ?

Parce que c'est reposant pour les yeux, surtout quand l'arrière-plan est très présent, comme ici, et que mon téléphone et son OS (Moto G et Android vanillé) sont déjà sombres.

## Pourquoi un clavier sur mesure ?

Se limiter à ce que fournit l'OS oblige à utiliser :

- sur iOS, un clavier pensé pour la saisie de numéros de téléphone, donc pas top
- Sur Windows Phone et Android, un clavier plus adapté, sans caractères inutiles et avec un séparateur décimal. Malgré cela je n'aime pas trop leur disposition (voir plus bas).

De plus, le clavier natif apparait à l'appui sur un champ. C'est bien dans une page complexe, mais ici il est plus pertinent d'avoir une mise en page sans scroll, avec les champs fixes et le clavier toujours présent.

Enfin, pour utiliser le clavier numérique natif, il faut que l'élément `<input>` soit de type `number`. Ca pose certaines contraintes, car [l'API](https://developer.mozilla.org/fr/docs/Web/API/HTMLInputElement) a été pensée pour un contrôle de validité dynamique mais après coup : c'est seulement quand l'utilisateur sort du champ que le champ signale l'erreur, par exemple s'il a saisi des lettres au lieu de chiffre. Ca rend difficile le contrôle a priori que je voulais, puisqu'on n'a aucun accès programmatique au texte invalide d'un champ (`value` devient vide). De plus, une valeur du genre "10," est considérée comme invalide, alors qu'il faudrait qu'elle corresponde à un état "en cours de saisie", comme c'est le cas dans les bonnes bibliothèques de gestion des masques de saisie.

Ajoutons qu'en français le séparateur décimal correct est la virgule mais certains navigateurs (Firefox Mobile) ne le localisent pas correctement.

## C'est pas une mauvaise pratique de réinventer des comportements natifs ?

Totalement. C'était justement instructif pour moi de voir le nombre de choses qu'il faut réimplémenter comme on peut. Le cheminement a ressemblé à ça :

1. Je ne voulais pas du clavier, alors qu'il apparait par défaut, un comportement théoriquement non modifiable.
2. Du coup, on triche en faisant perdre le focus à un champ dès qu'il le gagne.
3. Du coup, il faut en garder en mémoire quel champ on a sélectionné. Un focus custom, quoi. Il faut également recréer un curseur et le placer au bon endroit.
4. Ah merde, il faut calculer à la main la position du curseur.
5. Et bien sûr ça oblige de bidouiller pour obtenir la largeur d'un caractère (l'unité `ch` aurait été parfaite mais Chrome ne la supporte pas). Donc l'outil ne marche qu'avec des polices à chasse fixe (_monospace_).

Je vous passe les subtiles différences de comportement entre navigateurs, notamment dans la gestion des évènements `focus` et `click`. Bref, le tout marche mais n'est pas ultra robuste ni franchement réactif et le code est sans doute encore moins propre et modulaire que la dernière fois.

## Pourquoi cette disposition de clavier ?

Vu qu'on est dans la saisie de monnaie je me suis rapproché de la convention des calculettes, avec le 9 en haut à droite. En plus, la progression des chiffres du bas vers le haut suit le mouvement de la main ou du doigt propre au mobile.
