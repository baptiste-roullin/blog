---
title: "J'ai fait un truc"
date: 2020-12-18
tags:
  - "travaux"

description: Une mosaïque des livres, jeux, films... que je "pratique", filtrables par année et catégorie. Un variateur permet de changer la taille des vignettes, pour avoir une vue panoramique ou au contraire très détaillée.

hero:
  type: split  # options: carousel, graphic, video, split (text & image)
  image: tb.jpg


---


[C'est ici](http://table-basse.toutcequibouge.net/){.cta}

Soyez patient pour le premier chargement, car l'hébergeur (Heroku version gratuite) éteint le serveur après 30 min d'inactivité.


## C'est quoi ?

Une mosaïque des livres, jeux, films... que je "pratique", filtrables par année et catégorie. Un variateur permet de changer la taille des vignettes, pour avoir une vue panoramique ou au contraire très détaillée.

## Mais pourquoi ?

Dématérialisation oblige, ma bibliothèque ou ce qui traine sur ma table basse (d'où le nom du bidule) ne sont plus guère représentatifs de mes pratiques culturelles. Je cherchais un joli palliatif.

Les données viennent de mon profil [Sens Critique](https://www.senscritique.com/Saint-Loup/) et sont mises à jour nuitamment. Malgré tous ses défauts, je ne connais pas d'autre site permettant de consigner des œuvres de médias variés et potentiellement françaises.

Et soyons francs, c'était l'occasion de bidouiller. Quelques remarques :

### **Fluidité**

J'ai essayé d'avoir une grille avec le minimum de valeurs prédéfinies. Les gouttières, la taille des images et le nombre de colonnes dépendent de la taille de la fenêtre et de la valeur du zoom. C'est sans doute _overkill_ et donne un CSS plein de valeurs magiques, m'enfin.

Détails :

- L'intensité de l'effet au survol est inversement proportionnelle à la taille de l'image.
- Les différences de ratio des affiches sont réglées à coup de `object:cover-fit`, sauf pour celles en paysage où on ajoute un effet de "letterbox" floutée. (J'ai d'ailleurs découvert que pas mal de jeux vidéo indés récents reviennent récemment au format paysage)
- Pour qu'au survol les images ne sortent pas du cadre, on change la `transform-origin` de celles positionnées en bordure de fenêtre.

### **Typescript**

En tant qu'autodidacte habitué aux langages dynamiques et interprétés,iu j'ai trouvé ça génial. On résume Typescript à un surcroit de lourdeur très acceptable vu le gain de sûreté, pourtant j'ai trouvé son usage souvent plus fluide que Javascript, pas moins.

Un langage de programmation permet un dialogue avec la machine, c'est… un langage. La boucle d'interaction peut être très courte (comme avec une [ligne de commande](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)) ou très longue (insérer des cartes perforées et attendre la nuit pour voir le résultat). Avec Typescript, l'ordinateur est plus bavard, me parle en direct et m'a beaucoup facilité la prise en main de grosses bibliothèques.

### **Puppeteer**

Les joies du scraping : il y a _une_ info importante que, dans _un_ contexte, on ne peut pas récupérer sur Sens Critique sans authentification. Du coup j'utilise Puppeteer, qui lance et contrôle automatiquement un navigateur entier. Bonjour, artillerie lourde et sur-ingénierie. En prod cette dépendance prend à elle les 2/3 du stockage.

C'est fascinant de lancer Puppeteer en mode graphique et de l'observer ouvrir une fenêtre, scroller et cliquer tout seul.

### **CDN**

Un _content delivery newtork_, ai-je appris, n'est pas juste un serveur dédié et optimisé pour les images et vidéos. Les CDN modernes fournissent plein de services liés, parfois accessible simplement en ajoutant un paramètre à l'URL : génération à la demande de variantes d'une image (dimensions, format de fichier…), analyse intelligente (OCR, crop en se concentrant sur le contenu "intéressant", détection des visages…), et cetera.

## Bref

Je vous passe plein de péripéties et de nouveautés (Heroku, Postgres...). J'ai fait des mauvais choix techniques, pas anticipé plein de trucs, dû changé d'orientation... Bref un vrai projet. (ノ°Д°）ノ︵ ┻━┻

Pour paraphraser Musset :

> J'ai souffert souvent, je me suis trompé quelquefois, mais j'ai codé.

[Les sources sont ici](https://github.com/baptiste-roullin/table-basse).
