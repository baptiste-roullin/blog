---
title: "Nouveautés dans les éléments HTML natifs"
description: "Inventaire des éléments récemment ajoutés ou en cours d'étude"
date: 2024-04-21T18:38:55.735Z
draft: true
tags: [ "dev web", "design system"]
hero:
  alt: null
  image: null
type: post
---


Si vous consultez la [liste des éléments](https://developer.mozilla.org/fr/docs/Web/HTML/Element), à moins d'être expert vous pouvez être à peu près sûr d'en découvrir un certain nombre. (les plus intrigants pour moi ? [`<ruby>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/ruby) et [`kbd`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/kbd) )

Si on étend la liste à tous les éléments proposés pour ajout à la liste, la liste est bien plus longue. Et cela soulève des débat passionnants : quel patron mérite d'être un élément à part entière, ou juste un attribut d'un élément existant, ou juste un [Composant Web](https://developer.mozilla.org/fr/docs/Web/API/Web_Components) fourni par une bibliothèque ?

Plus fondamentalement la question : quel sont les mots de base du langage qu'est le web ? Est-ce qu'[un toaster](https://github.com/jackbsteinberg/) est suffisamment commun et standardisé pour mériter un élément ? et un [bloc de spoiler](https://discourse.wicg.io/t/standardized-spoiler-tag/5814/) ? Comme tout langage, il faut partir des usages réels et le groupe de travail OpenUI a fait un travail impressionnant [de recensement ](https://open-ui.org/research/component-matrix/) en ce sens. Mais il faut aussi ajouter une dose de prescription : faut-il ajouter une mauvaise idée telle qu'un [accordéon exclusif](https://open-ui.org/components/accordion.explainer/) sous prétexte qu'on peut trouver quelques occurrences ?  &lt;spoiler`&gt;`Pour moi, non`&lt;`/spoiler`&gt;`.

Bref, voici un tour d'horizon, dans la lignée de mon [précédent article sur le CSS](https://toutcequibouge.net/blog/2024/04/panorama-de-techniques-css-parfois-meconnues-des-designers/).

## Éléments récemment ajoutés dans les navigateurs modernes

Sauf erreur de ma part il y en a deux.

### Recherche

Similaire à un élément `<nav>` mais pour un composant de recherche : ajoute un point de repère (*landmark*) à la page, comme si on ajoutait `role=search` à un conteneur. À tester pour vérifier si c'est bien reconn par les lecteurs d'écran, donc il faut mieux doublonner `<search role="search">` comme pour `main`.

### Popin : l’élément dialog

[Un élément](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog) pour afficher un popin au sein d'une page, avec juste un peu de Javascript et de bons comportements par défaut (notamment la navigation à clavier)

<dialog id="foo"><p>Hello! I'm a modal dialog...</p></dialog>
<dialog id="foo"><p>Bonjour ! je suis une boite de dialogue</p></dialog>
<button id="open">Ouvrir la boite de dialogue</button>
<script>document.getElementById('open').onclick = () => foo.showModal();</script>


Dispo depuis longtemps sur Chrome, mais très lent d'adoption car il posait plein de [problèmes d'accessibilité](https://www.scottohara.me/blog/2019/03/05/open-dialog.html), dont [la plupart ont été résolus](https://a11y-dialog.netlify.app/further-reading/dialog-element/).

### Accordéon

Allez je triche et j'ajoute l'élément `<details>`, pratique pour ajouter un accordéon basique sans trop besoins de personnalisation

<details>
<summary>Membres des Beatles</summary>
<ul>
<li>John Lennon </li>
<li>Paul McCartney </li>
<li>George Harrison </li>
<li>Ringo Starr </li>
<li>Yoko Ono </li>
</ul>
</details>



## Pas encoe disponibles

### Interrupteur

Il semble y avoir deux propositions différentes : [l'une](https://github.com/whatwg/html/pull/9546) pour qu'un interrupteur soit un type particulier de case à cocher, [l'autre](https://open-ui.org/components/switch.explainer/) pour créer un nouvel élément plus complet et personnalisable.


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



### menu déroulant stylable

Il y avait une proposition pour créer un nouvel élément, indépendant du `<select>` actuel qui serait conservé pour des raisons de rétro-comptabilité : [selectmenu ou selectlist](https://css-tricks.com/the-selectmenu-element/).

Finalement la proposition parait être est d'ajouter [un attribut](https://open-ui.org/components/selectlist/) au `<select>` et qui ouvrirait plein de possibilités de personnalisation.

!["démon montrant des listes déroulantes avec des styles différents et des photos ou pictogrammes élégamment intégrés dans chaque option."](/select.gif)


### Portail
Permet d'embarquer une version non-interactive d'une page dans une autre page, typiquement pour afficher une prévisualisation de la page au clic sur un lien.

<video alt="" src="/assets/images/portals.mp4"></video>


Documentation [ici](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/portal)

[Source de la vidéo](https://web.dev/articles/hands-on-portals
)

À ne pas confondre avec [`<fencedframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fencedframe
), qui est en gros la version moderne et sécurisée du bon vieux iframe.



### Autocomplete

l’élément [datalist](https://developer.mozilla.org/fr/docs/Web/HTML/Element/datalisthttps:_developer.mozilla.org/fr/docs/Web/HTML/Element/datalist) étant très limité, laissez-moi vous présenter le futur potentiel élément [combobox](https://open-ui.org/components/combobox.explainer/).


### Modèle

Mentionnons aussi rapidement `<model>`, utilisé pour afficher des modèles 3D et standardiser certains comportements (interactivité, etc.). C'est la partie émergée d'une [initiative plus large](https://github.com/immersive-web) pour apporter la réalité virtuelle et augmentée sur le web.


## Bonus : popover


Techniquement c'est un attribut et une API mais Firefox vient de rejoindre les navigateurs compatibles et ça s'annonce sacrément utile. La fonctionnalité permet d'ajout un panneau non-modal en gérant finement le positionnement et en facilitant la gestion de la fermeture, de la navigation au clavier et du z-index.


<video alt="Exemple avec plusieurs bulless'ouvrant au clic de manière radiale et élégante autour d'un bouton rond" src="/assets/images/popover.mp4"></video>

[Documentation ici](https://developer.chrome.com/blog/introducing-popover-api/)

