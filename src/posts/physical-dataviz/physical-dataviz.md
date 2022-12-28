---
title: "Dataphys : toucher la donnée, de -3000 à nos jours"
date: 2021-05-16
tags:
  - "histoire"
  - "objets"
  - "données"
featured: true
draft: false
picture_lightbox: true
hero:
  image: maxwell.jpg
  alt: "modèle en plâtre sur lequel est tracé des courbes, pour expliquer la thermodynamique."

---

Panorama foutraque de ce que l'on appelle parfois la physicalisation de données : visualiser des données par un support physique non-numérique.

<!-- excerpt -->



## La dataviz en 3000 avant JC

On n'a pas attendu l'informatique pour représenter des données. Les [premières traces](https://en.wikipedia.org/wiki/History_of_writing#Recorded_history) de l'écriture c'est un peu ça : un jeton pour une vache, un deuxième pour une seconde vache.  Les systèmes graphiques plus aboutis étaient utilisées avec des buts similaires, puisqu'on retrouve beaucoup d'inscription parlant de taille de troupeaux, d'aire de parcelles ou de volumes de récoltes. Parfois en utilisant à plein la spatialité de la surface, comme en témoignent ces deux tablettes babyloniennes :  un problème de géométrie et le plan d'un grand bâtiment.

{% richpicture %}

![Tablette d'argile décrivant un losange et un problème de géométrie associé. Coté recto.](tablette2.jpg "[Source](https://fr.wikipedia.org/wiki/YBC_7289)")

![Tablette d'argile décrivant un losange et un problème de géométrie associé. Coté verso.](tablette1.jpg)



{% endrichpicture %}



{% richpicture %}

![Plan d'un bâtiment de six pièces, un sanctuaire ou une maison privée. Fin du IIIe millénaire](Building_plans_Louvre_AO338.jpg "Plan d'un bâtiment de six pièces, un sanctuaire ou une maison privée. Fin du IIIe millénaire. [Source](https://fr.wikipedia.org/wiki/Fichier:Building_plans_Louvre_AO338.jpg).")

{% endrichpicture %}



Ces exemples sont impresionnants parce qu'anciens, mais vous allez dire qu'ils restent assez classiques. Voici un autre spécimen qu'on cite souvent : les cartes utilisées par les marins des îles Marshall, dans l'océan Pacifique. Les îles y sont représentées notamment par des coquillages (en blanc) et les trajectoires aidées par la houle par les tiges. Chaque carte était idiosyncrasique dans la manière dont il fallait l'interpréter et surtout utilisée par son créateur.

![Carte de navigation de l'archipel des Iles Marshall ](stick_maps.jpg)

Citons aussi les [cartes tactiles des Inuits](https://www.archaeology.org/issues/337-1905/features/7550-maps-greenland-wooden-inuit-maps), sculptées dans du bois. Celle de gauche est une carte côtière et celle de droite représente une succession d'îles. Elle étaient apparemment plus utilisées comme support de récit qu'aide à la navigation.



 ![Deux morceaux de bois sculptés en longueur servant de carte aux peuples Inuit. Pour l'un, la découpe décrit la silhouette des cotes. Pour l'autre, des ronds plus larges que la base de la tige de bois représentent des iles. ](Maps-Greenland-Inuit-Wooden-Maps.jpg)



Il y a plein de manières compréhensibles et mémorables d'encoder des informations dans des objets. Voici [une longue compilation](http://dataphys.org/list/) de ces "visualisations physiques de données", avec aussi pas mal d'expérimentations récentes. Sans rentrer dans un débat théorique ou une quête de définition, l'idée est en gros de ne pas utiliser l'écriture, ou de manière plus secondaire et auxiliaire.



## 3D

Si on saute aux XIX et XXe siècles, la création de modèles en relief est un cas d'utilisation relativement fréquent.  En 1874, Maxwell illustra avec un modèle en plâtre les liens entre l'évolution de trois variable : volume, entropie et énergie.

![modèle en plâtre sur lequel est tracé des courbes, pour expliquer la thermodynamique.](maxwell.jpg "[Source](https://peabodyhsi.wordpress.com/2020/07/15/3d-scanning-the-famous-maxwell-gibbs-thermodynamic-model/). Voir [Wikipedia](https://en.wikipedia.org/wiki/Maxwell's_thermodynamic_surface) pour des photos du modèle en plâtre et d'autres infos.")

Datant de 1913, cette carte montre le nombre de passagers transportés par le métro de Frankfort. La quantité était représenté par le nombre de lamelles de bois collées et empilées.

![](streetcar.jpg "[Source](http://dataphys.org/list/frankfurt-streetcar-load/)")

Datant des années 50, cette courbe montre l'évolution de la consommation d'électricité en Grande-Bretagne, suivant les heures de la journée, entre 1951 et 1954. Chaque jour est représenté par une feuille de carton et des poignées permettaient d'élargir le dispositif pour ajouter des feuilles.

![Graphique en 3D de l'évolution de la consommation électrique](medium_cd0673_039_111216_INH_090_Electricity_3D_graph.jpg "[Source](http://dataphys.org/list/electricity-generated-or-demanded/).")

## Interactivité

Au début du XXe, le volume de données produites explose. Comment les récupérer, les manipuler et les visualiser facilement ?

Par exemple, comment présenter un enchainement de graphiques à un auditoire, quand on n'a même pas de rétroprojecteur ? C'est pas compliqué : créer une véritable bibliothèque de diapositives sous la forme de grands panneaux de bois imprimés et montés sur rail. J'en ai [déjà parlé ici](https://toutcequibouge.net/blog/2016/02/les-ancetres-d-excel-et-de-powerpoint/#powerpoint).

{% richpicture %}

![](/assets/images/1974298\_001.jpg "1919 : première version.")

![](/assets/images/2005273\_0001-e145540648863.jpg "1950 : ver­sion plus évo­luée.")

{% endrichpicture %}



Autre exemple : [ce système de fiches](https://gravyanecdote.com/uncategorized/interactive-dashboards-in-1914-yes/) décrit dans un traité de 1914 (!) : *Graphic methods for presenting facts*. L'idée était d'utiliser plusieurs fiches représentant des graphiques et les mettre bout à bout horizontalement ou verticalement, pour comparer ou enchainer plusieurs années. Parler de "dashboard interactif", comme le fait l'article en lien, est sans doute exagéré,  mais pour l'époque l'idée apportait sans doute un grand confort. Avoir des masses de données bien organisées, prêtes à l'emploi et lisibles  facilite grandement l'analyse et la discussion, c'est un premier degré d'interactivité entre l'utilisateur et le système.

D'autant que le système était pensé de bout en bout. Il y avait des "méta-fiches" pour indexer le contenu et le retrouver facilement, la partie gauche était laissée vide si l'utilisateur voulait ajouter une annotation et chaque fiche avait un bleu (*blueprint*) pour la dupliquer et la partager facilement.

{% richpicture %}



![](indexcards.jpg)

![](indexcards2.jpg)

{% endrichpicture %}



## Ouvroir de dataviz potentielles

Finissons par un exercice sous contraintes intéressant : des "photoviz" qui utilisent des objets triviaux pour figurer des quantités et liés au thème de la donnée représentée. Garanti sans triche ni redimensionnement.

https://twitter.com/JulesGrandin/status/1163371189487722496

https://twitter.com/JulesGrandin/status/1164093612172427264





## Récap des principaux liens

- [Un panorama complet de la question](https://hal.archives-ouvertes.fr/hal-02113248v1) : histoire, enjeux, développements récents...
- [Un inventaire de dataphys](http://dataphys.org/list/).
- [Plein de posts dédié à Brinton](https://gravyanecdote.com/tag/100yrsofbrinton/), auteur du traité de 1914 évoqué et qui avait à l'époque déjà recensé pas mal d'exemples.