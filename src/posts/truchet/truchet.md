---
title: "Motifs de truchet"
date: 2021-05-16
tags:
  - "tout ce qui bouge"
  - "procédural"
draft: true
layout: post-canvas
richPicture: true
description: "Générer procéduralement une image de substitution quand un article n'a pas d'image principale, par le truchement des motifs de Truchet"
hero:
  type: split
  image: truchet.png
---



Quand un post comprend une jolie image, je la spécifie comme "mise en avant" et elle se retrouve en vignette dans la [page de liste](blog-screenshot-truchet.png). Que faire quand ce n'est pas le cas. Laisser un vide ou avoir toujours la même image par défaut ne serait pas très élégant. Comment avoir des images variées mais avec une unité de style ? La génération procédurale répond exactement à ce problème : elle permet de générer des formes avec une trame de base et des paramètres aléatoires.

Ce blog utilise des motifs dits de Truchet, du nom du savant éponyme : [Sébastien Truchet](https://fr.wikipedia.org/wiki/S%C3%A9bastien_Truchet), ingénieur hydraulique, mathématicien, typographe. Oui, rien que ça. Il est notamment à l'origine des eaux de Versaille, du premier point typographique et de Times News Roman, au moins partiellement et indirectement.

Revenons à nos pavés. Car le motif crée par l'emboitment des


{% truchetItem    { width:100,	height:100,	tile_size: 100,	seed: 'qszzsqq',  hue_amplitude:1 	 }, 'inline m-4' %}{% truchetItem   { width:100,	height:100,	tile_size: 100,	seed: 'qszzsqr',  hue_amplitude:1  }, 'inline m-4' %}



{% truchetList	 %}

## Pour aller plus loin





https://observablehq.com/@xenomachina/truchet-tiles-variant-intertwined-quarter-circles



https://images.math.cnrs.fr/Les-pavages-de-Truchet.html


interactif et parité
jm.davalan.org/divers/truchet/truc.html

https://members.loria.fr/DRoegel/TeX/31-girou.pdf

explication simple
http://jean-luc.bregeon.pagesperso-orange.fr/Page%200-27.htm#truchet4
