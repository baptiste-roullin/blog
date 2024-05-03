---
title: "Axure 7 : panorama des nouveautés"
date: 2014-01-07
tags:
  - "prototypage"

---

Pour ceux qui ne sont pas sortis de l'industrie du livrable au kilo[^1] et qui ont toujours besoin d'un outil de maquettage IHM polyvalent, la sortie d'Axure 7 est une bonne nouvelle, d'autant plus que la mise à jour est gratuite pour les possesseurs d'une licence. Même si certaines nouveautés peuvent laisser perplexes (ombres portées internes et externes, un mode pseudo-responsive, etc.), la liste des fonctionnalités et des améliorations est impressionnante. La [page de présentation](http://www.axure.com/news/new-in-7) est très détaillée, mais voici une liste de ce qui est intéressant pour moi au quotidien.

Je vous préviens, l'article est plein d'anglicismes et de features (argh ça commence) qui vous paraitront sans doute dérisoires.

- Meilleure gestion du texte : ajout de widgets header, libellé, paragraphe (avec lorem ipsum intégré !). Le wrapping du texte peut se désactiver au double clic ou via une option (ce qui permet au widget de se redimensionner comme un grand suivant la longueur du texte).
- Chaque écran possède maintenant un historique d'action, changer d'écrans n'annule pas la possibilité d'annuler une action. J'en pleurerais.
- Possibilité d'ajouter des dossiers dans l'arborescence. J'en pleure.
- Interactions : beaucoup plus d'évènements gérés, scripting étendu.
- Des [interactions de plus haut niveau](http://www.axure.com/forum/tips-tricks-examples/7951-hide-show-options.html) sont incluses (pour faciliter la gestion du z-index, la création de popins, d'accordéons ou de menus au survol).
- Lien rapide entre pages, pour éviter l'usine à gaz qu'est le gestionnaire d'interactions.
- Les widgets peuvent être cachés ou déplacés, comme un panneau dynamique. Le gestionnaire de panneau dynamique inclut les widgets.
- Les dynamic panels peuvent s'ajuster automatiquement à la taille du contenu.
- Moins de limites artificielles dans la personnalisation des widgets : possibilité de transformer un widget en un autre type de widget, de changer la hauteur d'un droplist (ie. un menu "select"). Les menus de navigationt sont moins galère à redimensionner.
- Un nouveau mode de prévisualisation rapide des maquettes, en plus du classique, qui fonctionne un peu comme [LiveReload](http://livereload.com/). La première génération est très rapide et il suffit de rafraichir le navigateur pour que les changements soient pris en compte. Chaque chargement de page est plus long, mais plus besoin de générer en permanence dans Axure.
- Possibilité de chercher dans l'arborescence d'une maquette HTML et de surligner les éléments interactifs.
- Gestion des polices d'icônes, ce qui permet d'avoir des icônes colorisables et redimensionnables sans perte de qualité.
- Réorganisation des menus contextuels et des panneaux style et propriété.
- Un pattern de "[répétition](http://www.axure.com/learn/repeater)", pour créer une liste ou une grille d'éléments basée sur un jeu de données. Le tout peut être interactif (filtre, tri, ajout et suppression d'éléments). La fonction est probablement overkill et son utilisation totalement alambiquée. Toutefois, une utilisation basique et intéressante est de pouvoir mettre à jour facilement une mise en page complexe et répétitive. Par exemple on peut générer une grille de produits avec à chaque fois un titre, une description, une image, etc. en spécifiant une seule celulle.


[^1]: Cf. l'article _[“_Getting out of the deliverables business_“](http://uxdesign.smashingmagazine.com/2011/03/07/lean-ux-getting-out-of-the-deliverables-business/)_ et celui sur « [Axure et la mort de l'UX](http://blocnotes.iergo.fr/concevoir/les-outils/axure-ou-la-mort-de-lux/) ».