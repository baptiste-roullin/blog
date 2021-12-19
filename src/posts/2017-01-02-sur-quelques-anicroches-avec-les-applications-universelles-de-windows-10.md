---
title: "Sur quelques anicroches avec les applications universelles de Windows 10"
date: 2017-01-02
tags:
  - "critique"
  - "windows"

---

![illus écosystème apps](/assets/images/groove-music.jpg)

La double erreur de Windows 8, c'était de vouloir forcer un paradigme tactile sur un OS classique et en plus de le faire cohabiter avec une interface de type desktop. Cela entrainait des [trucs aberrants](http://www.thewindowsclub.com/windows-store-apps-windows-taskbar) comme les applications "Metro" ouvertes et pourtant absentes de la barre des tâches du bureau.

Avec Windows 10, la stratégie de Microsoft parait plus maligne et peut se résumer ainsi : mes données perso synchronisées partout, sur des applis trans-plateforme (téléphone, ordi, Xbox...) mais dotées d'une UI s'adaptant au contexte (taille de l'écran, souris ou tactile...).

Parenthèse : ils poursuivent ainsi un travail assez novateur en matière de responsive design -- [j'en a parlé ici](http://toutcequibouge.net/2014/06/le-responsive-design-ailleurs-que-sur-le-web/).

Prenez OneNote : non seulement les boutons du ruban deviennent plus compacts quand on réduit la largeur de l'écran, mais c'est même l’organisation de l'app qui change, puisque la liste des notes est reléguée dans une vue dédiée et un bouton retour apparait pour y accéder.

<video width="590" height="140">
<source src="assets/docs/onenote-responsive2.mp4"      type="video/mp4">
</video>

Le problème, c'est que le travail d'adaptation a été minime pour beaucoup des nouvelles applications natives. Par exemple, dans une fenêtre étroite Groove Music marche très bien -- normal, elle est très proche de sa contrepartie sur Windows 10 Mobile. Mais redimensionner la fenêtre ne tire pas du tout partie de la taille d'écran. Le contenu est découpé en plein de vues étriquées : pour se faire une idée globale de ce que j'ai d'un artiste en local, je dois ouvrir sa fiche, puis cliquer sur un album ou sur "Vue Morceaux". N'importe quel lecteur de musique digne de ce nom montre deux niveaux à la fois : des artistes et leurs albums respectifs, ou les albums d'un artiste avec ses chansons. iTunes montre même les trois niveaux : artistes, albums et chansons.

![iTunes Artist View](/assets/images/artists-view-100017932-orig.png)

Plus généralement, j'ai relevé trois problèmes presque systématiques dans ces nouvelles applications.

## Premier problème : ☰

L'utilisation du bouton "hamburger" sur mobile est discutable mais compréhensible. Sur desktop ça l'est moins, surtout quand c'est de manière non-conventionnelle. Dans les "grosses" applications, il sert d'interrupteur pour masquer/afficher les libellés du menu. Dans les applications légères, il fait apparaitre ces libellés temporairement (comme un "flyover" ou "popover"). Comme on le voit dans cette animation, ce n'est pas d'une utilité renversante eu égard à sa position prééminente.


<video width="600" height="600">
<source src="assets/docs/menu-démarrer2.mp4"      type="video/mp4">
</video>

Oui, c'est bien le Menu démarrer, même lui y a droit. Un menu de navigation avec son propre bouton de navigation, merci Microsoft. L’icône habituellement la plus structurante d'une app est transformée en simple post-it, puisque cliquer dessus sert juste à rappeler la signification des icônes. Si celle-ci posait vraiment problème il y avait d'autres solutions, comme afficher tous les titres de menu lors d'un survol prolongé. Courrier est le seul cas où ce hamburger est justifié puisqu'il présente de vraies différences de contenu entre modes compact et complet.

## Deuxième problème : …

La barre de commandes comprend une icône en points de suspension. C’est encore un décalque du mobile, qui transgresse au passage des conventions desktop, sans gain évident. Elle ouvre des commandes supplémentaires et fait apparaitre le nom de toutes les cônes.

![2016-10-25_00h34_01.png](/assets/images/2016-10-25_00h34_01.png)

Elle présente quatre problèmes :

1. Ces libellés remplacent l'infobulle au survol, alors que c’est une convention ancienne et répandue.
2. Ces libellés ne sont pas omniprésents : certaines applications ont les points de suspension mais affichent le libellé en permanence à côté (Photos, Alarme), ou utilisent une infobulle (Edge).
3. Il n'y a parfois qu'une seule entrée dans le menu (Cf. les apps Téléphone et Messages)
4. Il n'y a parfois aucun menu et cliquer dessus affiche juste les libellés. Le plus ridicule est qu'il n'y a parfois qu'une seule icone et donc qu'un seul libellé à afficher.

![2016-10-24_20h08_13.png](/assets/images/2016-10-24_20h08_13.png)

<video width="1112" height="176">
<source src="assets/docs/ellipse2.mp4"      type="video/mp4">
</video>


Si c'était un bonus, le comportement ne serait pas une mauvaise idée puisqu’il enseigne _en passant_ aux utilisateurs la signification des pictogrammes. Mais remplacer une convention archi-classique par un comportement plus lourd n'est pas très une bonne idée.

Problème annexe : cette barre de commandes est le plus souvent en haut, mais pas toujours. Exemple : l'Enregistreur vocal.

## Troisième problème : ⇐

Terminons par le bouton retour : il apparait à gauche du titre, à la place de la traditionnelle icône de l'application. Pourquoi pas, ça s’inscrit dans la tendance de remplir la barre de titre ou de la fusionner avec d’autres. Mais c'est gênant en pratique et en théorie.

C'est gênant en pratique car l'implémentation est mal fichue. L'historique de navigation est à la fois lacunaire (dans les paramètres système le Retour passe d'une vue avancée à l'accueil en sautant une vue intermédiaire) et pollué par des étapes inutiles. Par exemple le changement de rubrique est enregistré. Si vous ouvrez vingt fois les rubriques A puis B puis A B... de la barre de navigation verticale puis cliquez vingt fois sur le bouton retour, vous rouvrirez vingt fois ces rubriques. Autre exemple : lors d'une recherche dans la Boutique, chaque changement de filtre ajoute une étape à l'historique alors que dans ce contexte le retour devrait seulement être hiérarchique.

À noter que ces deux exemples violent [les directives de conception](https://msdn.microsoft.com/fr-fr/windows/uwp/layout/navigation-history-and-backwards-navigation) de Microsoft. Pas bien.

Plus fondamentalement, ce bouton retour est gênant dans son principe. Dans un environnement contraint (le mobile) ou hétérogène (navigateur, avec des sites tous différents), avoir une fonction centralisée pour balayer le moindre état passé de l'UI a un sens, car ça donne une ligne de survie à l’utilisateur. À tout instant je peux revenir exactement où j'étais, même en ayant oublié comment j'y suis arrivé. Tout ce que j'ai à connaître, c'est le bouton retour. Alors qu'un OS de bureau fournit à l'écran plus de capacités de navigation et peut donc se passer d'une telle panacée.

Contrairement aux problèmes précédents, cette fonction est moins une erreur basique qu'une réponse inadaptée à une question compliquée. J’aurais simplement préféré que Microsoft ajoute ce bouton au cas par cas, quand c'était vraiment nécessaire : Word et Courrier n'en ont pas, Groove Music n'aurait pas dû en avoir, mais le Store en a un et c'est justifié vu la profondeur de son arborescence. Voici comment Apple ajoute un bouton retour global à certaines applications (Photos, Mac App Store).

![](/assets/images/photos_01_mac.png)
