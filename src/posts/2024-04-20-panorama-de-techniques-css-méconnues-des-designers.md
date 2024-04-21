---
title: Panorama de techniques CSS méconnues des designers
description: ""
date: 2024-04-20T14:55:58.457Z
draft: "true"
tags: []
hero:
  alt: null
  image: null
type: post
---


On dirait que pas mal de techniques CSS ne sont pas assez connues de nombreux designers. Voici donc un compilation que j'alimenterai au cours du temps.

Je me suis limité à :
- Des techniques relativement simples, parce que l'implantation demande quelques lignes de CSS soit ou que c'est une amélioration locale et additive.
- Uniquement du CSS, donc pas de SVG, pas de [polices variables](https://variablefonts.io/about-variable-fonts/), pas de [variantes OpenType](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/OpenType_fonts_guide), pas de [polices colorées](https://design.tutsplus.com/articles/the-beginners-guide-to-color-fonts--cms-29861)
- Des effets visuels (pas de [requêtes par conteneur](https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/))
- Des techniques bien supportées par les navigateurs modernes  (_evergreen), ou en cours rapide de généralisation.
- Et supportée par les appareils courants (donc pas de [gamuts étendus](https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide#what-is-a-color-gamut)).


# Techniques possibles depuis des années

## Soulignement
`text-decoration-skip-ink` pour qu’une barre de soulignement évite les <u>jambages</u> du texte.
Par défaut (**normalement)**.

[Référence sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration-skip-ink)

## Images responsive

```HTML
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

{% richpicture %}

!['Obama faisant un discours. On voit la scène autour de lui'](/assets/images/resp2.png )

!['Obama faisant un discours. Photo centrée sur lui.'](/assets/images/resp3.png )
{% endrichpicture %}

Ou encore, ici la photo est croppée différemment sur les petits écrans.

!['GIF montrant une page de ecommerce à différentes tailes de fenêtre. Sur grand écran, une photo de personne est au centre. Sur écran moyen, la photo est calée à gauche et la personne est coupée à la taille.'](/assets/images/resp1.gif )

[Référence sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration-skip-ink)


::: info-block
{% ctaLink "Référence sur MDN", "https://developer.mozilla.org/fr/docs/Web/CSS/text-decoration-skip-ink"  %}
:::

## Scroll-snap

Enfin une manière de guider le mouvement de scroll, sans le prendre en otage et casser les habitudes et comportements natifs.
A la fin d’un mouvement de scroll, ajuste la position d’un item dans une liste scrollable.
Deux valeurs possibles :
- `mandatory` : probablement trop agressif
- `proximity` : préférable, le "magnétisme" se produira uniquement si la bordure de l'item est proche de la bordure du conteneur.

Voici une démo :

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="qpJYaK" data-preview="true" data-user="tutsplus" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


::: info-block
{% ctaLink "Référence sur MDN", "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap"  %}
:::



## Traitement des images

Il existe plein d'effets de post-processing

```CSS
img {
  filter:
    grayscale(1)
    brightness(80%)
    contrast(150%)
    blur(2px);
  mix-blend-mode: screen;
	background: radial-gradient(circle at center, $line-color, \#fff);
  background-size: $dot-size $dot-size;
}
```
[https://codepen.io/spaceninja/pen/oNEOXRZ](https://codepen.io/spaceninja/pen/oNEOXRZ)

https://bennettfeely.com/image-effects/


::: info-block
{% ctaLink "Référence pour blend-mode", "https://developer.mozilla.org/fr/docs/Web/CSS/blend-mode"  %}
{% ctaLink "Et pour filter", "https://developer.mozilla.org/fr/docs/Web/CSS/filter-function"  %}
:::

## Clip-path
```css
clip-path:
	polygon(0 0, 100% 0, 100% 100%, calc(50% + var(--g) / 4) 100%,
  0 calc(50% - var(--g) / 4));
```

[https://codepen.io/t_afif/pen/abGvYVX](https://codepen.io/t_afif/pen/abGvYVX)
Voir aussi : `background-clip`, `mask`



## Unités
### ch
[https://codepen.io/BlogFire/pen/vYyRKGg](https://codepen.io/BlogFire/pen/vYyRKGg)
### Viewport units
[https://codepen.io/hsavran/pen/PJBgNj](https://codepen.io/hsavran/pen/PJBgNj)




# Techniques disponibles depuis peu
## Text-balance
[https://codepen.io/web-dot-dev/pen/KKxjpQm](https://codepen.io/web-dot-dev/pen/KKxjpQm)
[Documentation](https://developer.chrome.com/docs/css-ui/css-text-wrap-balance?hl=fr)




## Éviter les veuves
[https://codepen.io/web-dot-dev/pen/yLGmzLJ](https://codepen.io/web-dot-dev/pen/yLGmzLJ)
[Documentation](https://developer.chrome.com/blog/css-text-wrap-pretty).



## Césure des mots
[Démo](https://codepen.io/Saint_loup/pen/vYPJPEQ)
Auto-promo : f[[Workshop css.md]] 🍿



# Techniques possibles un jour
Scroll-transitions
- [Exemples](https://scroll-driven-animations.style/)
[Masonry](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout)
[Styler les dropdowns](https://www.smashingmagazine.com/2023/06/advanced-form-control-styling-selectmenu-anchoring-api/)
- [Codepen](https://codepen.io/smashingmag/pen/XWxxPgN)
Switchs
- [https://www.w3.org/WAI/ARIA/apg/patterns/switch/](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
- [https://github.com/whatwg/html/pull/9546](https://github.com/whatwg/html/pull/9546)




# Trucs omniprésents sur le web mais toujours pas possibles nativement
- Styler complètement un formulaire
- Champ avec autocomplete : l’élément [datalist](https://developer.mozilla.org/fr/docs/Web/HTML/Element/datalisthttps:_developer.mozilla.org/fr/docs/Web/HTML/Element/datalist) est limité.
- Popin : l’élément [<dialog>](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog) est limité.

  #
- 1#
- Pour aller plus loin

screens-transition ([démo](https://http203-playlist.netlify.app/))
[accent-colors](https://accent-color.glitch.me/)
[Espaces de couleur](https://lea.verou.me/blog/2020/04/lch-colors-in-css-what-why-and-how/?utm_source=pocket_saves)
[Popover](https://developer.chrome.com/blog/whats-new-css-ui-2023#popover)
@media, @supports
variable fonts
[SVG color fonts](https://design.tutsplus.com/articles/the-beginners-guide-to-color-fonts--cms-29861)



Pour aller plus loin