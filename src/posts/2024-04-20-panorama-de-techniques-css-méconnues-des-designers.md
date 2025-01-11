---
title: Panorama de techniques CSS parfois méconnues des designers
description: "Maçonnerie, équilibrage des titres, magnétisme au scroll…"
date: 2024-04-20T14:55:58.457Z
draft: false
tags:
- dev web
- graphisme
- typographie
- interface utilisateur
hero:
  alt: null
  image: null
type: post
---

On dirait que pas mal de techniques CSS ne sont pas assez connues de nombreux designers. Voici donc un compilation que j'alimenterai au cours du temps.

Je me suis limité à :
- Des techniques relativement simples, parce que l'implantation demande quelques lignes de CSS ou que c'est une amélioration locale et additive.
- Uniquement du CSS, donc pas de SVG, pas de [polices variables](https://variablefonts.io/about-variable-fonts/), pas de [variantes OpenType](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/OpenType_fonts_guide), pas de [polices colorées](https://design.tutsplus.com/articles/the-beginners-guide-to-color-fonts--cms-29861)
- Des effets visuels (pas de [requêtes par conteneur](https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/))
- Des techniques bien supportées par les navigateurs modernes  (_evergreen), ou en cours de généralisation.
- Et supportée par les appareils courants (donc pas de [gamuts étendus](https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide#what-is-a-color-gamut)).


## Techniques possibles depuis un moment

### Soulignement
`text-decoration-skip-ink` pour qu’une barre de soulignement évite les jambages du texte.
Par défaut (**normalement)**.

[Référence sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration-skip-ink)

### Images responsive

Avec l'attribut `srcset` ou l'élément `<source>`, on peut afficher des images différentes selon la largeur de la fenêtre.

```html
<img
  srcset="elva-fairy-480w.jpg 480w,
					elva-fairy-800w.jpg 800w"
	sizes="(max-width: 600px) 480px,
				 800px"
	src="elva-fairy-800w.jpg"
	 />
```

Cas d’usage :
- Qualité variable des images : haute résolution sur grand écran et petite sur téléphone.
- Ce que certains appellent "direction artistique". Disons un choix iconographique pour adapter l'image au contexte.

Dans l'exemple suivant, on zoome plus sur la personne en format vignette pour éviter qu'elle se retrouve minuscule .

{% gallery %}

!['Obama faisant un discours. On voit la scène autour de lui'](/img/resp2.png )

!['Obama faisant un discours. Photo centrée sur lui.'](/img/resp3.png )
{% endgallery %}

Ou encore, ici la photo est croppée différemment sur les petits écrans.

!['GIF montrant une page de ecommerce à différentes tailes de fenêtre. Sur grand écran, une photo de personne est au centre. Sur écran moyen, la photo est calée à gauche et la personne est coupée à la taille.'](/img/resp1.gif )


::: info-block
{% ctaLink "Référence sur MDN", "https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration-skip-ink"  %}
:::

### Magnétisme au scroll

`scroll-snap` : enfin une manière de guider le mouvement de scroll, sans le prendre en otage et casser les habitudes et comportements natifs. A la fin d’un mouvement de scroll, la position d’un item dans une liste scrollable est ajustée.

Deux valeurs possibles :
- `mandatory` : probablement trop agressif
- `proximity` : préférable, le "magnétisme" se produira uniquement si la bordure de l'item est proche de la bordure du conteneur.

Voici une démo :

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="qpJYaK" data-preview="true" data-user="tutsplus" style=" height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 2em; padding: 1em;">
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


::: info-block
{% ctaLink "Référence sur MDN", "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap"  %}
:::


### Traitement des images

On peut faire [énormément de choses](https://bennettfeely.com/image-effects/) en terme de post-processing d'images. La terminologie est assez proche de celle de Photoshop : les filtres permettent de modifier une image et les modes de fusion spécifient l'interaction entre plusieurs couches. Avec `mix-blend-mode`, les couches sont plusieurs éléments HTML et avec `background-blend-mode` elles sont plusieurs `background` CSS dans un même élément.

On peut créer des effets très simples…

```css
img {
  filter:
    grayscale(1)
    brightness(80%)
    contrast(150%)
    blur(2px);
}
```

… Ou plus complexes
<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="oNEOXRZ" data-preview="true" data-user="spaceninja" style=" height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 2em; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/spaceninja/pen/oNEOXRZ">
  CSS Halftone Filter</a> by Scott Vandehey (<a href="https://codepen.io/spaceninja">@spaceninja</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

::: info-block
{% ctaLink "Référence pour blend-mode", "https://developer.mozilla.org/fr/docs/Web/CSS/blend-mode"  %}
{% ctaLink "Et pour filter", "https://developer.mozilla.org/fr/docs/Web/CSS/filter-function"  %}
:::

### Masques

`Clip-path`,`background-clip` et `mask` permettent de masquer des parties d'un élément en suivant un tracé (*clip*) ou une image (*mask*)

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="abGvYVX" data-preview="true" data-user="t_afif" style=" height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 2em; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/t_afif/pen/abGvYVX">
  CSS Only image gallery</a> by Temani Afif (<a href="https://codepen.io/t_afif">@t_afif</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


La syntaxe peut paraitre complexe, mais il existe des [outils en ligne](https://bennettfeely.com/clippy/) de génération de tracé.

```css
clip-path:
	polygon(0 0, 100% 0, 100% 100%, calc(50% + 10px / 4) 100%,
  0 calc(50% - 10px / 4));
```


::: info-block
{% ctaLink "Référence de clip-path sur MDN", "https://developer.mozilla.org/fr/docs/Web/CSS/clip-path"  %}

{% ctaLink "Et pour mask", "https://developer.mozilla.org/fr/docs/Web/CSS/mask"  %}
:::



## Techniques disponibles depuis peu

### Équilibrer un titre

```css
text-wrap: balance
```


<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="KKxjpQm" data-preview="true" data-user="web-dot-dev" style=" height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 2em; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/web-dot-dev/pen/KKxjpQm">
  Animated comparison of balanced and unbalanced headlines</a> by web.dev (<a href="https://codepen.io/web-dot-dev">@web-dot-dev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


### Éviter les veuves

```css
text-wrap: pretty
```

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="yLGmzLJ" data-preview="true" data-user="web-dot-dev" style=" height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 2em; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/web-dot-dev/pen/yLGmzLJ">
  text-wrap: pretty</a> by web.dev (<a href="https://codepen.io/web-dot-dev">@web-dot-dev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


### Césure des mots

[Mais attention](https://toutcequibouge.net/blog/2024/01/faut-il-justifier-le-texte-sur-internet-non-mais/)

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="vYPJPEQ" data-preview="true" data-user="Saint_loup" style=" height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 2em; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Saint_loup/pen/vYPJPEQ">
  hyphens césure</a> by Baptiste (<a href="https://codepen.io/Saint_loup">@Saint_loup</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


## Techniques possibles un jour

### *Vraiment* centrer le texte dans un bouton

`text-box-trim` permet  de centrer le texte et les pictos dans un conteneur quelconque en supprimant l'espacement vertical généré et spécifique à chaque police de caractères. Ca arrivera pas tout de suite, mais on peut espérer. A ne pas confondondre avec `margin-trim`.

![](/img/text-trim.webp)

::: info-block
{% ctaLink "Documentation", "https://github.com/jantimon/text-box-trim-examples"  %}
{% ctaLink "Bibliothèque pour émuler le comportement", "https://seek-oss.github.io/capsize/"  %}
:::

### Transitions au scroll

Démo fonctionnelle sous Chrome, ou avec Firefox si flag activé ([cf détails](https://developer.mozilla.org/fr/docs/Web/CSS/animation-timeline#compatibilit%C3%A9_des_navigateurs) sur l'état du support) :

<iframe height="500" style="width: 100%;"  title="iframe d'une démo de la césure de la transition" src="https://scroll-driven-animations.style/demos/cover-to-fixed-header/css/" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>

::: info-block
{% ctaLink "Exemples", "[url](https://scroll-driven-animations.style/) "  %}

{% ctaLink "Documentation", "[url](https://developer.chrome.com/docs/css-ui/scroll-driven-animations?hl=fr)"  %}
:::

À ne pas confondre avec les [transitions entre écrans](https://http203-playlist.netlify.app/). Et celles-ci requierent forcément du Javascript.

### Effet de tuilage ou de maçonnerie

!["Page avec une grille de photo. Chaque photo est décalée verticalement des photos à gauche et droite."](/img/grid-masonry.png)

Voir aussi cet [article récent](https://www.webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/#the-debate) par des devs de Safari, avec un intéressant débat sur "mais au fond, qu'est-ce qu'une grille de mise en page".

::: info-block
{% ctaLink "Voir sur MDN", "[url](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout)"  %}
:::


<style>
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em
}
code.hljs {
  padding: 3px 5px
}
/*!
  Theme: a11y-dark
  Author: @ericwbailey
  Maintainer: @ericwbailey

  Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css
*/
.hljs {
  background: #2b2b2b;
  color: #f8f8f2
}
/* Comment */
.hljs-comment,
.hljs-quote {
  color: #d4d0ab
}
/* Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
  color: #ffa07a
}
/* Orange */
.hljs-number,
.hljs-built_in,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
  color: #f5ab35
}
/* Yellow */
.hljs-attribute {
  color: #ffd700
}
/* Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
  color: #abe338
}
/* Blue */
.hljs-title,
.hljs-section {
  color: #00e0e0
}
/* Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #dcc6e0
}
.hljs-emphasis {
  font-style: italic
}
.hljs-strong {
  font-weight: bold
}
@media screen and (-ms-high-contrast: active) {
  .hljs-addition,
  .hljs-attribute,
  .hljs-built_in,
  .hljs-bullet,
  .hljs-comment,
  .hljs-link,
  .hljs-literal,
  .hljs-meta,
  .hljs-number,
  .hljs-params,
  .hljs-string,
  .hljs-symbol,
  .hljs-type,
  .hljs-quote {
    color: highlight
  }
  .hljs-keyword,
  .hljs-selector-tag {
    font-weight: bold
  }
}
  </style>