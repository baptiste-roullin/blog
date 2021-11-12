---
title: "Intégrer dans un blog Eleventy des listes d'articles tirées de Zotero"
date: 2021-08-06
tags:
  - "tout ce qui bouge"
  - "eleventy"
description: "Comment importer une collection d'articles depuis Zotero et l'afficher dans Eleventy."
templateEngineOverride: md
hero:
  type: split
  image: is_it_worth_the_time.png
  alt: Tableau avec en colonne 'à quelle fréquence je réalise cette tâche' et en abscisses 'combien de temps je gagne en l'automatisant'

---

Zotero est un logiciel de gestion documentaire, plutôt pensé pour le monde académique mais qui peut s'adapter à pas mal de types de documents et d'usages.

J'essaye d'y enregistrer et classer des papiers et articles de blog sur des sujets qui m'intéressent.

Zotero a une interface en ligne et si un profil est public, tout le monde peut consulter les listes établies par ce profil. Mais comment faire si je veux intégrer à un post que j'écris une liste spécifique (par exemple une combinaison de catégories et de tags), en appui d'un propos quelconque ? Il y a quelques plugins, [notamment pour Wordpress](https://www.zotero.org/support/plugins#website_integration), mais je suis sous Eleventy.

C'est là qu'intervient [l'API](https://www.zotero.org/support/dev/web_api/v3/basics
) de Zotero et [ce client](https://github.com/tnajdek/zotero-api-client) en Javascript qui facilite le dialogue avec celle-ci.

J'ai écrit un script, à invoquer simplement dans le corps d'un post avec un "shortcode" (un raccourci qui exécute un script), de la sorte :


```liquid
{% zotero "collection", "tag 1", "tag 2", "tag n"  %}
```

… Et hop il me génère une liste d'articles avec le titre, l'URL source, le résumé et si disponible un PDF de l'article complet. [Un exemple ici](https://toutcequibouge.net/blog/2021/08/bibliographie-sur-le-consentement-et-la-vie-privee/).

Potentiellement on pourrait remonter pas mal d'autres attributs,  les formater comme dans une bibliographie universitaire… mais dieu merci je ne suis qu'un humble blogueur indépendant. :p


## Détails techniques

Si ça peut vous inspirer, [le code est ici](https://github.com/baptiste-roullin/blog/blob/dev/src/utils/zotero.js).

- Utiliser un shortcode Nunjuncks dans un fichier de texte Markdown nécessite de spécifier `markdownTemplateEngine: njk` dans la config globale Eleventy.
- Ce shortcode appelle zotero.js, qui récupère de l'API les données et les transmet sous forme de tableau d'objets à zotero.njk, le bout de template qui se charge de génèrer le HTML.
- Le shortcode est [asynchrone](https://www.11ty.dev/docs/languages/nunjucks/#asynchronous-nunjucks-filters) pour permettre les requêtes à l'API externe.
- On fait 3 salves de requêtes
  1. Comme l'API ne permet pas de requêter le contenu d'une collection par son nom, il faut d'abord requêter toutes les collections et trouver l'ID de la bonne collection.
  2. On requête ensuite les articles eux-même. Potentiellement ça nécessite un lot de requêtes, si le nombre d'articles dépasse les limites de l'API.
  2. Enfin on récupère les pièces jointes de chaque article pour en tirer l'URL directe d'un PDF. Zotero a l'air assez doué pour dénicher ce lien.



