---
title: "Un plugin Sketch pour importer du contenu depuis le presse-papier"
date: 2019-12-11
tags:
  - "prototypage"
  - "sketch"
  - "projets"
---


::: info-block
{% ctaLink "Télécharger le fichier", "https://github.com/baptiste-roullin/data-from-clipboard/releases/latest/data-from-clipboard.sketchplugin.zip"  %}{% ctaLink "Voir le projet", "https://github.com/baptiste-roullin/data-from-clipboard"  %}
:::




Beaucoup de plugins Sketch pour l'import de contenu ([Craft](https://www.invisionapp.com/craft), [Data Populator](https://www.datapopulator.com/)…) sont pensés pour des sources de données non modifiables (banque d'images, noms de pays...), ou pour des données complexes à synchroniser avec des maquettes graphiques abouties. Suivant les plugins, ça implique de renommer des calques, d'avoir un fichier de données en TXT voire en JSON... bref des procédures un peu lourdes.

Mon cas d'usage est beaucoup plus simple : le plus souvent, je veux rapidement copier-coller une liste de textes depuis un tableau ou un mail, les coller dans une suite de calques. Et c'est tout.

Qu'à cela ne tienne, j'ai créé [un plugin pour Sketch](https://github.com/baptiste-roullin/data-from-clipboard).


Comment l'utiliser ?

Copiez une liste de texte, sélectionnez des calques ou des symboles, utilisez le menu "data" de Sketch et paf, chaque ligne de texte est collée dans un élément. Si le symbole comporte plusieurs surcharges (_overrides_), le plugin utilisera la première.

Même pour des cas plus complexes (par exemple peupler un tableau), je trouve plus simple de répéter cette méthode autant de fois qu'il y a de colonnes que, mettons, de s'embêter avec du JSON.

Comme d'habitude, rapports de bug et retours sont les bienvenus.
