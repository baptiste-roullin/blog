---
title: "Axure : Créer un menu et un fil d'ariane sans dupliquer aucun contenu"
date: 2015-12-15
tags:
  - "prototypage"

---

## Menu

Dans un prototype, on veut souvent qu'un menu soit présent dans toutes les vues auquel il permet d'accéder, et qu'un item du menu soit visuellement distinct des autres pour montrer qu'elle correspond à la vue en cours. (Par vue j'entends une page ou une section au sein d'une page.)

Solution bourrine : dupliquer le menu autant de fois qu'il y a de vues. oui, mais si on danse si quelque chose change ? Par exemple si je dois intercaler un nouvel item ou changer un lien, il faudra le répéter partout. Comme d'habitude, évitons de nous [répéter](https://en.wikipedia.org/wiki/Don't_repeat_yourself).

Meilleure solution : utiliser un master. Comme ça, toute modification ultérieure du menu sera répercutée dans chaque vue. Axure offre même une fonction pour insérer à votre place un master dans les pages et à l'emplacement de votre choix (clic droit sur un master dans le panneau dédié, puis « Add to pages ». Sauf cas particulier (par exemple si vous voulez changer la hauteur du menu), vous n'avez plus à toucher à chaque écran. Oui mais, comment signifier qu'une vue est sélectionnée ?

Solution ultime : un mélange de ce qu'Axure appelle les styles d'interaction et de l'évènement onPageLoad.

## Premier ingrédient : les styles d'interaction

Les styles d'interactions sont des variations visuelles qui s'activent lorsqu'un widget est dans un état donné. Il y a le clic, le survol, l'inactivité et la sélection.[^Attention : Axure, aimant la simplicité, distingue ces styles de la liste d'évènements, laquelle comporte des termes très proches (mouseOver vs onMouseHover vs Selected).] C'est cette dernière qui nous intéresse. Il faut spécifier :

- Le style lui-même. Ici, ça peut être que le libellé passe en gras. Une fois ajouté, il apparait dans le panneau « Widget properties ».
- L'action qui le déclenche.

![Axure tuto 1](/img/Sans-titre.png)
![Axure tuto 2](/img/Sans-titre-2.png)

## Second ingrédient : onPageLoad

Axure permet d'exécuter des actions au chargement d'une page, dans l'onglet « Page interactions » du panneau « Page properties ». Ici, cela permet d'activer un item du menu différent à chaque page, même s'il est dans un master.

![sans titre 5](/img/sans-titre-5.png)

Un [tutoriel sur Axure.com](https://www.axure.com/learn/basic/interactions/navigation-menu-tutorial) avec un fichier source pour essayer.

## Et au sein d'une page ?

Notez que le truc marche entre pages, mais aussi au sein d'une page. Dans ce cas, le menu n'est plus un master mais une simple suite de widgets, et chaque vue est un état d'un panneau dynamique. Au clic sur l'item 1 du menu, on le passe en « Sélectionné »et on passe le panneau à l'état 1.

Un [tutoriel plus complet](http://www.axure.com/learn/dynamic-panels/basic/tab-control-tutorial).

## Fil d'Ariane

Un fil d'Ariane, c'est encore un objet constant à travers les pages mais dont un aspect change. Pour que la page sélectionnée soit en gras, il suffit de suivre les explications plus haut. Mais comment faire pour le nom de la page qui change à chaque fois. La solution, c'est d'utiliser un master pour le fil d'ariane et d'ajouter à chaque chargement de page une action « Set text », avec la valeur \[\[PageName\]\]. Cette variable prédéfinie par Axure correspond au titre de la page tel que défini dans votre arborescence, donc si elle s'appelle « 04-b », le fil d'Ariane comportera « 04-b ».

![Axure tuto 4](/img/sans-titre-4.png)
