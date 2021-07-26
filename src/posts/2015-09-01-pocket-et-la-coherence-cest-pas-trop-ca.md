---
title: "Pocket et la cohérence c'est pas trop ça"
date: 2015-09-01
tags:
  - "architecture de l'information"
  - "critique"

---

[Pocket](https://getpocket.com/) est un service de lecture différée plutôt chouette et disponible officiellement sur cinq plateformes. Hélas, les interfaces de ces différentes plateformes souffrent d'un certain manque d'homogénéité. C'est même carrément le bordel. J'ai fait un tableau de ces incohérences.

![Dans l'ordre, la barre de navigation des versions Web, Android, Windows et Mac](/assets/images/pocket.png " Dans l'ordre, la barre de navigation des versions Web, Android, Windows et Mac")

Notez bien que :

- Je me suis concentré sur l'accès aux fonctions concernées. Il y a d'autres incohérences : dans le reste de la procédure (ex : ajout d'items sur Mac, modification groupée sur iPad), dans le choix des pictogrammes (mode d'affichage sur Windows), dans le concept de base (principe de double panneau avec l'article à droite sur Mac)...
- Un « non » dans le tableau signifie que la fonction est purement absente.
- Le site web est responsive mais je n'ai inclus que la version « grand format ».
- J'ai regroupé Paramètres et Aide par commodité car ils sont toujours placés à côté.

Le tableau, je trouve, montre bien l'étendue des divergences :

- une moitié des fonctions est indisponible sur au moins une plateforme.
- Aucune fonction étudiée n'est parfaitement homogène (c'est-à-dire offrant un accès identique sur toutes les versions).
- Sur les cinq plateformes, on dénombre quatre accès différents pour trois fonctions

Certaines divergences sont facilement explicables :

- Pocket suit parfois les conventions propres à chaque plateforme. Par exemple, sur Android, les paramètres se trouvent habituellement dans le menu en haut à droite (celui accessible par les trois points) et ce menu n'a pas d'équivalent sur iOS.
- Certaines fonctions ont moins d'intérêt sur certaines plateformes, par exemple un affichage en grille sur un petit smartphone.
- Il y a toujours une certaine inertie dans le développement multi-plateformes et il n'est pas facile d'avoir une feuille de route unifiée dans le moindre détail.

Mais ça n'explique pas l'ampleur du problème. J'y vois surtout un manque de volonté des créateurs. Par exemple, la version Windows / Chrome OS utilise les même technologies que la version web (en gros c'est une web app lancée en local). Les deux devraient donc être relativement faciles à faire converger, pourtant la version Windows est l'une des plus divergentes.

Un facteur supplémentaire d'incohérence est temporel : des mises à jour modifient fréquemment les interfaces et ajoutent à la confusion. Je ne saurais dire si l'homogénéité est tendanciellement croissante.

Foin de blabla, voici le tableau.

| Fonction | iPad | Android | Web | Windows | Mac | \# de divergences |
| --- | --- | --- | --- | --- | --- | --- |
| Nav principale | Menu hamburger | Menu hamburger | À gauche | Menu déroulant central | Non | 3 + 1 non |
| Filtrer par labels | Menu hamburger | Menu hamburger | À gauche | 1e ligne, droite | En bas | 4 |
| Filtrer par type d'articles | Menu hamburger | Menu hamburger | À gauche | Gauche, 1e ligne | Première ligne | 4 |
| Paramètres et aide | Menu hamburger | Menu, droite | Menu, droite | Menu déroulant central | Barre de menus native | 4 |
| Premium | Menu hamburger | Menu hamburger | Menu, droite | Menu déroulant central | Non | 3 + 1 non |
| Messagerie | Menu hamburger | Menu hamburger | 1e ligne, droite | Non | Non | 2 + 1 non |
| Modification groupée | Menu, droite ou tap long sur item | Menu, droite | 2e ligne, droite | Non | Non | 2 + 1 non |
| Ajout d'items | Gauche, 1e ligne | Non | 1e ligne, droite | Gauche, 1e ligne | Barre de menus native | 3 |
| Recherche | 1e ligne, droite | 1e ligne, droite | 1e ligne, droite | 1e ligne, droite | En bas | 2 |
| Mode d'affichage | 1e ligne, droite | Non | 2e ligne, droite | Gauche, 1e ligne | Non | 2 + 2 non |
