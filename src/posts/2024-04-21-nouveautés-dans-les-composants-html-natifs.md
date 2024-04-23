---
title: "Nouveautés dans les éléments HTML natifs"
description: "Popover, switch, search, combobox..."
date: 2024-04-21T18:38:55.735Z
draft: false
tags: [ "dev web", "interface utilisateur"]
hero:
  alt: null
  image: null
type: post
---


Si vous consultez la [liste des éléments](https://developer.mozilla.org/fr/docs/Web/HTML/Element), à moins d'être expert vous pouvez être à peu près sûr d'en découvrir un certain nombre. (Les plus fascinants pour moi ? [`<ruby>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/ruby) et [`kbd`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/kbd).)

Si on étend la liste à tous les éléments proposés pour ajout à la norme HTML, elle sera bien plus longue. Et cela soulève des débat passionnants : quel pattern mérite d'être un élément à part entière, ou juste un attribut d'un élément existant, ou juste un [Composant Web](https://developer.mozilla.org/fr/docs/Web/API/Web_Components) fourni par une bibliothèque ?

Plus fondamentalement la question : quel sont les mots de base du langage qu'est le web ? Est-ce qu'[un toaster](https://github.com/jackbsteinberg/) est suffisamment commun et standardisé pour mériter un élément ? et un [bloc de spoiler](https://discourse.wicg.io/t/standardized-spoiler-tag/5814/) ? Comme tout langage, il faut partir des usages réels ; le groupe de travail OpenUI a d'ailleurs fait un travail impressionnant [de recensement](https://open-ui.org/research/component-matrix/) en ce sens. Mais il faut aussi ajouter une dose de prescription : y a-t-il vraiment besoin d'ajouter une mauvaise idée telle qu'un [accordéon exclusif](https://open-ui.org/components/accordion.explainer/) sous prétexte qu'on peut trouver quelques occurrences ?  &lt;&#8288;spoiler&#8288;&gt; Pour moi, non &lt;&#8288;/&#8288;spoiler&#8288;&gt;.

Bref, voici un tour d'horizon, dans la lignée de mon [précédent article orienté CSS](https://toutcequibouge.net/blog/2024/04/panorama-de-techniques-css-parfois-meconnues-des-designers/).

## Éléments récemment ajoutés dans les navigateurs modernes

Sauf erreur de ma part il y en a deux.

### Recherche

Similaire à un élément `<nav>` mais pour un composant de recherche, l'élément `<search>` ajoute un point de repère à la page (*landmark*, utile notamment pour les technologies d'assistance), comme si on ajoutait `role=search` à un conteneur. À tester pour vérifier si c'est bien reconnu par les lecteurs d'écran, donc il faut mieux doublonner `<search role="search">` comme pour `main`.

::: info-block
{% ctaLink "Pour aller plus", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search"  %}
:::

### Popin

L'élément `dialog` permet d'afficher un panneau modal au sein d'une page, avec juste un peu de Javascript et de bons comportements par défaut (notamment la navigation au clavier). Exemple :

<dialog id="uniqueDialog" style="padding:2em;"><p>Bonjour ! je suis une boite de dialogue</p></dialog>
<button id="open" style="border: 1px solid grey;padding:.5em">Ouvrir la boite de dialogue</button>
<script>document.getElementById('open').onclick = () => uniqueDialog.showModal();
uniqueDialog.addEventListener("click", () => {
uniqueDialog.close();
});
</script>


Dispo depuis longtemps sur Chrome, mais très lent d'adoption car il posait plein de [problèmes d'accessibilité](https://www.scottohara.me/blog/2019/03/05/open-dialog.html), dont [la plupart ont été résolus](https://a11y-dialog.netlify.app/further-reading/dialog-element/).

::: info-block
{% ctaLink "Pour aller plus loin", "https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog"  %}
:::


### Accordéon

Allez je triche et j'ajoute le pas tout jeune mais méconnu élément `<details>`, pratique pour ajouter un accordéon basique si vous n'avez pas besoin de personnalisation. Exemple :

<details>
<summary style="cursor:pointer;">Membres des Beatles</summary>
<ul>
<li>John Lennon </li>
<li>Paul McCartney </li>
<li>George Harrison </li>
<li>Ringo Starr </li>
<li>Yoko Ono </li>
</ul>
</details>


::: info-block
{% ctaLink "Pour aller plus loin", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"  %}
:::


## Pas encore disponibles

### Interrupteur (switch, toggle)

Il semble y avoir deux propositions différentes : [l'une](https://github.com/whatwg/html/pull/9546) pour qu'un interrupteur soit un type particulier de case à cocher, [l'autre](https://open-ui.org/components/switch.explainer/) pour créer un nouvel élément plus complet et personnalisable. Le cas d'usage étant de représenter des paramètres à prise d'effet instantanée, à l'opposé des cases à cocher d'un formulaire déclaratif.


```html
<input type="checkbox" switch>

<!-- VERSUS -->

<switch>
  <track>
    <toggled></toggled>
    <untoggled></untoggled>
  </track>
  <thumb></thumb>
</switch>
```



### Menu déroulant stylable

Il y avait une proposition pour créer un nouvel élément, indépendant du `<select>` actuel qui serait conservé pour des raisons de rétro-comptabilité : [selectmenu ou selectlist](https://css-tricks.com/the-selectmenu-element/).

Finalement la proposition parait être d'ajouter un attribut au `<select>` et qui ouvrirait plein de possibilités de personnalisation.

!["démo montrant des listes déroulantes avec des styles différents et des photos ou pictogrammes élégamment intégrés dans chaque option."](/select.gif)

::: info-block
{% ctaLink "Documentation ici", "https://open-ui.org/components/selectlist/"  %}
:::

### Portail

Permet d'embarquer une version non-interactive d'une page dans une autre page, typiquement pour afficher une prévisualisation de la page au clic sur un lien.

<video alt="" src="/assets/images/portals.mp4" controls="true"></video>

À ne pas confondre avec [`<fencedframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fencedframe), qui est en gros la version moderne et sécurisée du bon vieux iframe.

::: info-block
{% ctaLink "Documentation ici", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/portal"  %}

{% ctaLink "Et source de la vidéo", "https://web.dev/articles/hands-on-portals"  %}
:::

### Autocomplétion

L’élément [datalist](https://developer.mozilla.org/fr/docs/Web/HTML/Element/datalisthttps:_developer.mozilla.org/fr/docs/Web/HTML/Element/datalist) étant très limité, laissez-moi vous présenter le futur potentiel élément `<combobox>`.

::: info-block
{% ctaLink "Documentation ici", "https://open-ui.org/components/combobox.explainer/"  %}
:::

### Modèle

Mentionnons aussi rapidement `<model>`, utilisé pour afficher des modèles 3D et standardiser certains comportements (interactivité, etc.). C'est la partie émergée d'une [initiative plus large](https://github.com/immersive-web) pour apporter la réalité virtuelle et augmentée sur le web.


::: info-block
{% ctaLink "Documentation ici", "https://immersive-web.github.io/model-element/"  %}
:::

## Bonus : popover


Techniquement ce n'est pas un élément mais un attribut et une API mais Firefox vient de rejoindre les navigateurs compatibles et ça s'annonce sacrément utile. La fonctionnalité permet d'ajout un panneau non-modal en gérant finement le positionnement ainsi qu'en facilitant la gestion de la fermeture, de la navigation au clavier et du z-index.


<video controls alt="Exemple avec plusieurs bulless'ouvrant au clic de manière radiale et élégante autour d'un bouton rond" src="/assets/images/popover.mp4"></video>

::: info-block
{% ctaLink "Documentation ici", "https://developer.chrome.com/blog/introducing-popover-api/"  %}
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