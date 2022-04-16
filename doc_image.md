Besoins

- Gérer des images placées dans n'importe quel dossier
- Gérer  des images avec des URL différentes
- 



```flow
st=>start: début
webpack=>operation: Webpack :  copie de toutes les images vers 
src/assets/imagesToprocess
passthrough=>parallel: Eleventy : copie "passthrough" de toute les images
vers dist/assets/generatedImages
et de tous les GIF dans dans dist/[dossier d'origine]
data1=>operation: collections.ts : 
génération d'une image truchet pour projet n'ayant pas d'image
data2=>operation: post.11tydata.js :
Génération d'une image truchet pour les post n'ayant pas d'image hero.
vers src/assets/imagesToProcess/ 
TROP TARD POUR LE PASSTHROUGH. POURTANT ÇA MARCHE
data3=>operation: création d'un champ agrégé data.collatedHeroImage.
Il comprend les images manuelles et les images truchet. 
Utilisé dans les vignettes de post, les pages post dédiées et les card Twitter. 
TODO :  HOMOGÉNÉISER AVEC PROJET.
md1=>operation: Un plugin markdown est ajouté pour entourer <img> d'un <picture>
md2=>operation: markdown est transformé en HTML
responsiver1=>operation: plugin responsiver : 
ajouté les dimensions aux attributs width et height des <img>
responsiver2=>operation: plugin responsiver : générer des versions compressées des images. 
env prod : webp et jpg. Dev : uniquement jpg.
Placées dans dist/assets/generatedImages/
responsiver3=>operation: plugin responsiver  : réécriture du HTML pour ajouter srcset et sizes aux <img>
responsiver4=>operation: plugin responsiver : ajout du balisage pour photoswipe

d=>operation: test
e(align-next=no)=>operation: Plugin : transformation des .gif en .mp4
fin(align-next=no)=>end: Fin

st->webpack->passthrough
passthrough(path1, bottom)->fin
passthrough(path2, right)->data1->data2->data3->md1->md2->responsiver1->responsiver2->e(left)->fin

```



