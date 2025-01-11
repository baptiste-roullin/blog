---
title: "D'une métaphore oubliée : Macintosh et le lent déclin du bureau"
date: 2015-05-01
tags:
  - "histoire"
  - "mac"
  - "bureau"
featured: true
hero:
  image: /img/wooton.png
  alt: Bureau Wooton, station de travail tout-en-un
---

Les raisons du succès des interfaces graphiques sont bien connues : des objets visuels simples (fenêtre, icônes, menus et pointeurs), permettant un panel d'actions limitées et explicites, organisés par une métaphore cohérente : des documents rassemblés en dossier, posés sur le bureau pour les affaires courantes et rangés dans des casiers pour le reste.

## Un dossier = une fenêtre

il est moins connu que cette métaphore, à son origine, était plus forte et contraignante. Les premières versions du Finder (l'explorateur de fichier de Mac OS) obéissaient à un modèle dit « spatial », lequel a été abandonné à la sortie de Mac OS X (moment d'une refonte complète du système). Cela se traduisait par deux règles :

1. **Cohérence**. Chaque dossier était représenté par une seule fenêtre et chaque fenêtre était liée à un seul dossier. L'icône d'un dossier changeait d'apparence pour signifier qu'il était ouvert ou fermé. Cliquer sur l'icône d'un dossier ouvert faisait clignoter sa fenêtre et rien d'autre, puisqu'il ne pouvait être ouvert deux fois. En bref, pour l'utilisateur il n'y avait aucune différence entre un dossier et sa fenêtre.

2. **Stabilité**. Les fenêtres mémorisaient la manière dont l'utilisateur les personnalisait. La forme, la position, le mode d'affichage (grille, liste...), la position des icônes en mode grille, etc., tout cela était conservé. Grâce à l'association entre fenêtre et dossier, cette règle était beaucoup plus simple à appliquer qu'aujourd'hui et le comportement des fenêtres d'autant plus prédictible pour l'utilisateur. Si j'ouvre ce dossier, je sais qu'il apparaitra à droite sur toute la hauteur de l'écran ; si j'ouvre cet autre dossier, il apparaitra en petit à gauche et ses fichiers seront en liste. Aujourd'hui, le Finder conserve certains paramètres (taille et position) et d'autres non (mode d'affichage et style), selon des règles de priorité impénétrables ([détails ici](http://hints.macworld.com/article.php?story=20030305025744788)).


En résumé, le Finder « spatial » tentait de faire fonctionner le bureau comme un ensemble de choses tangibles et fixes, pouvant servir de véritable mémoire externe ([l'être humain étant plus doué pour reconnaitre un objet que pour s'en rappeler](http://www.nngroup.com/articles/recognition-and-recall/)). Au lieu d'utiliser une abstraction pour en gérer une autre (fenêtre et système de fichier), l'utilisateur manipulait des objets concrets qui ne changeaient pas dans son dos ([principe de moindre surprise](http://en.wikipedia.org/wiki/Principle_of_least_astonishment)).

## Contraignant mais adapté à son temps

Ce modèle pouvait être assez contraignant. Notamment, ouvrir un dossier faisait forcément apparaître une nouvelle fenêtre (_la_ fenêtre de _ce_ dossier). Pour éviter de se retrouver avec des dizaines ouvertes, il fallait déplier l'arborescence du dossier (comme dans Mac OS X aujourd'hui), ou bien utiliser Alt+click, ce qui fermait la fenêtre d'origine et ouvrait la nouvelle en même temps.

![Un dossier dans un dossier dans un… (Mac OS 9 "](/img/macOS9.png "Un dossier dans un dossier dans un… (Mac OS 9)")

Pourtant, d'après ce que j'ai pu lire et tester, ça marchait pas mal. D'abord, ces dossiers superposés dans tous les sens ne faisaient que reproduire le rangement classique d'un bureau, dans ce qu'il peut avoir d'idiosyncrasique et d'apparement chaotique. Ensuite, l'OS était organisé autour de ce modèle. Par exemple, plutôt que de minimiser une fenêtre, on pouvait double-cliquer sur la barre de titre pour ne laisser que celle-ci et cacher tout le reste. Cette fonction de « stores » (_shades_) suivait, une fois encore, un principe de spatialité : la fenêtre restait à sa place.

![Exemple de deux fenêtres réduites à leur barre de titres](/img/MacOS9-shades.png " Exemple de deux fenêtres réduites à leur barre de titres")

Ensuite, la cible d'Apple était moins experte que le public typique de l'époque et n'était probablement pas à l'aise avec l'abstraction d'un système de fichiers arborescent. Enfin, les ordinateurs d'alors avaient peu de mémoire, peu de fichiers et peu d'applications, peu de mémoire et avaient donc moins besoin de manipuler des quantités énormes d'information.

## Le lent déclin du bureau façon Macintosh

Aujourd'hui, bien peu d'explorateurs de fichiers utilisent encore un modèle spatial. Les seuls [projets actifs](http://en.wikipedia.org/wiki/Spatial_file_manager#Examples) que j'ai trouvé sont Haiku OS (héritier de BeOS), Enligthenment (dit-on) et MATE (mais pas par défaut).

A moins que vous n'utilisiez un système exotique, il y a de fortes chances que votre bureau fonctionne différemment. Un simple test : y a-t-il des boutons Précédent et Suivant dans une fenêtre de l'explorateur ? Si oui, c'est qu'il ressemble plus à un navigateur Internet : il permet de parcourir différents dossiers _à travers_ une fenêtre.

Ce modèle a été popularisé par Windows 98 (avec des prémisses dans 95). Dans une optique de convergence avec Internet Explorer, une barre d'adresse et des boutons Précédent et Suivant ont été ajoutés. Ouvrir un dossier a cessé d'ouvrir une nouvelle fenêtre. Ce comportement a été adopté par Mac OS X à sa sortie, créant un Finder bâtard, avec deux types de fenêtres et des réactions imprévisibles. Pour des détails, voyez notamment cet [article de Siracusa](http://arstechnica.com/apple/2003/11/macosx-10-3/11/), et celui-ci de [Tog](http://www.asktog.com/columns/034OSX-FirstLook.html) (un des premiers spécialistes en IHM employés par Apple).

## Cachez ces fenêtres que je ne saurais voir

Le modèle de Windows est donc devenu la convention dominante -- son ubiquité n'y est sans doute pas étrangère.

A la sortie de Mac OS, Steve Jobs [a déclaré](http://www.zdnet.com/article/new-os-x-headlines-jobs-keynote/#!) qu'un utilisateur ne devrait pas avoir à faire le ménage dans ses fenêtres. Il disait surtout ça pour promouvoir certaines nouveautés plus que pour exposer une quelconque vision du futur des interfaces, mais cela signale à mon avis un changement profond quoique lent de l'OS, dont l'abandon du Finder spatial constitue la première étape.

En gros, tout est fait pour qu'on n'ait plus à déplacer ou redimensionner ses fenêtres. La plupart des fonctions introduites depuis dix ans et dédiées à la navigation vont dans ce sens :

- Mission Control (anciennement Exposé), une vue éclatée présentant simultanément des vignettes de toutes les fenêtres
- Launchpad, grille montrant toutes les applications
- Spaces, permettant de gérer des bureaux virtuels au lieu de fenêtres
- Le mode plein écran, apparu avec Lion et qui a remplacé la fonction de maximisation
- Des onglets pour le Finder.

Certains se sont inquiétés de l'importation de certains concepts depuis iOS. Il est vrai qu'aujourd'hui, tout est fait pour qu'on puisse utiliser un Mac comme un iPad, en affichant toutes les applications en plein écran et en naviguant entre elles grâce à un geste du trackpad. Après l'abandon du Finder spatial, faut-il s'attendre un jour à la disparition des fenêtres ?

## Pour aller plus loin

- [Un article](http://arstechnica.com/apple/2003/04/02/finder/) de John Siracusa récapitulant sa défense du Finder spatial
- [Une démo de Mac OS 7](https://jamesfriend.com.au/pce-js/) accessible depuis un navigateur
- [Une démo de Mac OS 9](http://www.macwindows.com/Emulator-for-Mac-OS-9-in-OS-X-updated-for-Mountain-Lion.html) téléchargeable et utilisable sur Mac sans installation ni configuration. Le lien direct vers le téléchargement est [ici](http://jon.brazoslink.net/jlg/COIV4.0.1+.zip).
