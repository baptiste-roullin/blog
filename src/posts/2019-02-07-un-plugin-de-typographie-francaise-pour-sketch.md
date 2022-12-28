---
title: "Un plugin de typographie française pour Sketch"
date: 2019-02-07
tags:
  - "prototypage"
  - "projets"

hero:
  image: "Icon_ombre2.png"

---

Résumé : j'ai créé un [plugin Sketch](https://github.com/baptiste-roullin/typographie-frenchy#readme) pour respecter automatiquement les règles typo, espaces insécables et bien plus.

<!-- excerpt -->


{% ctaLink "Typographie Frenchy", "https://github.com/baptiste-roullin/typographie-frenchy#readme", "big", "not-prose"  %}

Tout a commencé par une interface comme celle-ci :

![screenshot de boite de dialogue](/assets/images/dialog-1-e1549493962289.png)

... Dans le titre, un magnifique point d'exclamation seul sur sa ligne, problème récurrent dans une application mobile sur laquelle je travaillais. Je me suis demandé comment résoudre ce problème, sans demander aux développeurs de mémoriser chaque règle et d'insérer systématiquement des caractères spéciaux à la main. Ces caractères, ce sont les espaces insécables, qui collent la ponctuation au signe précédent. Sur le web ça implique de taper des choses sympathiques comme `&nbsp;` ou d'utiliser d'obscurs raccourcis clavier.

Une meilleure alternative est d'automatiser le problème, soit en début de chaine (comme le fait Word), soit en fin de chaine (comme [ce plugin](https://wordpress.org/plugins/wp-typography/) pour Wordpress ou comme le fait nativement SPIP). Vu qu'il faudrait attendre longtemps que chaque système ait son plugin de typo, j'ai choisi d'explorer la première piste en créant un plugin pour Sketch. Ca ne règle pas le problème du contenu saisi directement dans l'interface de contribution des différents CMS, mais, de même qu'un développeur peut copier-coller un code RGB depuis Zeplin ou Invision, l'idée est que des gens pourraient copier et coller du texte d'interface, par exemple celui d'une barre de menu. On est d'accord que c'est optimiste : si demain ce texte change, il y a peu de chance qu'il soit ressaisi d'abord dans Sketch.

Mais c'est une voie intéressante. Après tout, Invision, Figma ou Framer génèrent des maquettes de plus en plus compatibles avec du HTML/CSS. Cette proximité entre conception et réalisation pourrait aussi s'appliquer au texte.

Dans un tout autre angle, voir aussi [Kopie](https://web.archive.org/web/20190228013754/https://kopie.io/), outil de rédaction collaborative synchronisée avec Sketch.

Ajoutons que le plugin apporte aussi quelques embellissements directement dans les maquettes, indépendamment de ces questions de workflow :

- De `"` à «
- De double tiret (`--`) à tiret demi-quadratin (–)
- Certaines fractions (½, ⅓, ¼ )
- Suffixes ordinaux : de `2e` à 2ᵉ
- Points de suspension…
- De N° à №

Bref. Plugin de typographie automatique. C'était fun à faire. Retours bienvenus.
