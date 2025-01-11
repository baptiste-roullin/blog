---
title: "Archéologie des interfaces – Ou pourquoi il ne faut pas faire une refonte à moitié"
date: 2016-08-18
tags:
  - "critique"
  - "histoire"
  - "interface utilisateur"

---

[Précédemment](http://toutcequibouge.net/2015/09/pocket-et-la-coherence-cest-pas-trop-ca/), je parlais du manque de cohérence entre les applications de Pocket. Il s'agissait pour beaucoup de points isolés qui s'accumulaient, alors que les exemples suivants sont plus graves : les interfaces sont incohérentes dans leur principe.

L'histoire est coutumière : un site Web entame une grosse refonte pour se moderniser. On voit arriver une page d'accueil flambante neuve et différents gabarits plus sobres et mieux pensés. Cela dit, quand on cherche dans les coins on trouve quelques pages qui ne respectent pas la nouvelle charte. Mais bon c'est pas grave, qui se soucie des mentions légales et des pages d'erreur 404.

Parfois, ce sont des pans entiers d'un site qui détonnent. Exemple : Pôle Emploi, dont la page d'accueil ressemble actuellement à ça :

![Page d'accueil Pole Emploi](/img/Pole-emploi-HP-cropped-.png)

Pas mal pas mal. Sauf que cette "[révolution numérique](http://www.leparisien.fr/economie/emploi/pole-emploi-fait-sa-revolution-numerique-23-01-2016-5478493.php)", "[user-centric et disruptive](http://www.journaldunet.com/management/ressources-humaines/1176880-anne-leone-campanella-pole-emploi/)", n'est pas encore allée très loin. Dès qu'on se connecte on retombe sur l'ancien, avec un style et une structure largement différente, et une utilisabilité sur laquelle je ne m'étendrai pas.

![](/img/Pole-Emploi-connect-particulier1.png)

Bien sûr, je sais ce que c'est. Il y a des contraintes de temps et d'argent et je n'ose imaginer les décennies de dette technique et d'inertie architecturale pour ce genre de gros SI. Ce qui semble pour l'utilisateur une section parmi d'autres est peut-être un module à part, avec une technologie incompatible et géré par un département différent (une bonne illustration du [principe de Conway](https://en.wikipedia.org/wiki/Conway%27s_law)). Je ne doute pas que les gens qui y travaillent soient les premiers frustrés. Mais bon, l'homogénéisation est prévue pour une V2, hein ? Hein ?

Sauf que ce n’est pas toujours le cas. Parfois, au fil des refontes ou des ajouts, les divergences s'aggravent au lieu de se résorber. Le site de la MAAF a trois gabarits largement hétérogènes, tantid que le site des impôts en a quatre (ou disons deux avec des fortes variantes chacun), plus désuets à mesure que l'on s'enfonce dans les profondeurs du site. L'absence de cohérence se ressent, car à l'utilisation l'on est facilement amené à passer d'un gabarit à l'autre. Oh, encore un autre exemple avec deux screenshots de l'espace client d'EDF [ici](/img/2016-08-19_14h28_11.png) et [ici](/img/EDF-2.png).

## MAAF

![](/img/MAAF-0.png)

* * *

![](/img/MAAF-1.png)

* * *

![](/img/MAAF-2-1024x808-1.jpg)

## impots.gouv.fr

[](/img/impots-0-e1471563276671.png) {.container-wide}

* * *


[](/img/impots-2-e1471563206897.png) {.container-wide}

* * *

[](/img/Impots-3-e1471563162292.png) {.container-wide}


## Windows, ce palimpseste

Microsoft est un spécialiste pour ajouter des couches d'IHM à Windows sans rénover ou enlever les anciennes. C'est parfois une preuve de sagacité (le sélecteur de couleur est correct et [à peine bougé](https://twitter.com/Saint_loup/status/766068136416256001)) en vingt ans, parfois d'immobilisme (il a fallu quinze ans et Vista pour avoir une réelle mise à jour de Paint). Ce que je trouve le plus fascinant, c'est le panneau de configuration : avec ses successions de panneaux toujours plus avancés et vieillots, on traverse une bonne partie de l'histoire du système d'exploitation.

D'abord, l'accueil datant de Windows 10. Ensuite, celui datant de XP. Les deux suivent le même concept : une grille d'icônes ouvrant des fenêtres maximisées dotées avec une barre de navigation latérale. Mais mystérieusement, les deux ont été conservés. Il y a donc des fenêtres redondantes (Désinstaller des programmes), d'autres qui n'ont pas été migrées vers la charte Windows 10 (Centre de réseau et partage).

![Parametres Windows](/img/2016-08-18_21h57_11.png)

![Panneau de configuration Windows 10](/img/2016-08-18_21h57_42.png)

Ensuite, on arrive aux panneaux à taille fixe et à onglets, qui datent de Windows 95. Les paramètres de l'explorateur de fichiers en est le meilleur exemple : à part le retrait et surtout l'ajout de certaines options, il n'a pas bougé en vingt ans -- et il en aurait bien besoin, avec cette liste interminable dans un cadre minuscule.

![Options de l'explorateur de fichier](/img/2016-08-18_22h22_56.png)

## Un dernier exemple

L'historique de Google Chrome ne ressemblent pas aux favoris, qui ne ressemblent pas du tout à la fenêtre de téléchargement ([voir screenshots](https://twitter.com/Saint_loup/status/753873190041034752)). C'est apparemment [temporaire](http://thenextweb.com/google/2016/01/29/how-to-try-google-chromes-material-design-makeover-right-now/#gref), mais pourquoi une transition aussi désordonnée vers le Material Design ?
