---
title: "Une alternative au Lorem ipsum pour Axure"
date: 2015-02-05
tags:
  - "prototypage"

---

Dans une maquette, le texte peut servir à plein de choses :

- Tester des tournures et des dénominations
- Apprécier le style d'une police
- Vérifier des contraintes de formatage ou de longueur

Mais en premier lieu ça sert à dire "là il y a aura du texte". Une manière stylisée et minimale de signaler cette présence sans induire de connotation indésirable est d'utiliser un effet de "griffonnage" avec une [police spéciale](https://github.com/christiannaths/Redacted-Font).

[![screenshot](/assets/images/redacted.png " Cliquer pour voir une démo")](https://misc.toutcequibouge.net/Redacted/home.html)

La procédure à suivre pour intégrer une web font en local avec Axure est un peu tordue. La voici (version 7 requise) :

1/ Générer une première fois votre maquette.

2/ Ajouter le fichier de police ([lien direct ici](https://github.com/christiannaths/Redacted-Font/blob/old-sources/fonts/web/redacted-script-bold.woff?raw=true)) à la racine du dossier créé.

3/ Dans les paramètres de génération, aller dans l'onglet "web fonts", cocher "include webfonts", ajouter un item, nommer la police "Redacted" (par exemple), puis ajouter ceci dans la zone de texte :

`font-family: "Redacted"; src: url('redacted-script.woff') format('woff'); font-weight: normal; font-style: normal;`

4/ Dans "font mappings", ajouter un item, sélectionner une police rarement utilisée (exemple : Comic Sans MS), laquelle sera remplacée par la police souhaitée à la génération de la maquette. Pour font-family saisir "Redacted" (ou le nom de la police saisi dans l'onglet "web fonts").

5/ Dans votre maquette, les textes spécifiés en Comic Sans MS seront désormais générés en Redacted.

Petits défauts :

- A taille égale, la police apparait plus petite, il faut donc anticiper en choisissant une taille un peu plus trande.
- Pas de support des accents, donc attention en convertissant du vrai texte déjà saisi.
