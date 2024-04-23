---
title: "La génération procédurale dans le jeu vidéo"
date: 2014-09-13
tags:
  - "jeu vidéo"
  - "procédural"
featured: true
---

_Je recycle ici un travail étudiant datant d'il y a trois ou quatre ans. Le texte a été un peu désuniversitarisé, à part ça il est tel quel. Le format était volontairement court et limité au jeu vidéo._

Les jeux vidéos grand public actuels ont souvent une grande valeur ajoutée en terme de contenu : graphismes réalistes, environnements vastes et variés, acteurs professionnels, etc. Même avec un gros budget, cette richesse représente un défi de production. Par exemple, la ville immense et détaillée de GTA4 a été entièrement créée « à la main » : chaque immeuble a été dessiné et placé avec soin par des artistes. Il existe une autre approche, qui consiste à partir d’éléments de base (ici, un ensemble de bâtiments) et à les disposer semi-aléatoirement, avec certaines contraintes (laisser des vides pour que des rues se forment, rassembler les immeubles similaires pour que chaque quartier ait une identité, etc.). Cette approche dite _procédurale_ est très générique : avec elle, on peut générer des textures, des terrains, des niveaux de jeu, des scénarios, etc.

## Un peu de technique

Il y a globalement deux familles de techniques : celles des grammaires de formes et celles utilisant des fonction de bruit.

(Note 2014 : J'avoue ne plus savoir d'où je sors cette distinction. Il existe des dichotomies plus générales, notamment entre algorithmes ontogénétiques et téléogiques, c'est-à-dire en gros entre les modèles réalistes seulement en apparence et ceux qui le sont vraiment. Voir cette [liste](http://pcg.wikidot.com/pcg-algorithm:teleological-vs-ontogenetic) et cet [article](http://cowboyprogramming.com/2007/01/05/shattering-reality/).)

Les _grammaires de formes_ sont héritées des grammaires formelles, qui permettent de décrire avec un jeu de règles l’ensemble des phrases correctes d’un langage donné. On procède en générant toutes les phrases possibles à partir d’un alphabet et de règles de transition. Par, exemple, à partir de l’alphabet {a, b} et de la règlea => b, on peut générer le langage {a, ab, abb, abbb…}. Cette idée fut d’abord utilisée pour modéliser des phénomènes de croissance naturelle (feuilles, colonies de bactérie), puis étendue à l’architecture. En prenant des formes géométriques simples comme alphabet de base, on peut créer des façades, des bâtiments, voire des villes entières.

![Système L](/assets/images/System-L.jpg " Système L")

Passons aux _fonctions de bruit._ On commence par placer des points dont les valeurs sont générées de façon pseudo-aléatoire, puis à effectuer une interpolation entre eux afin d’obtenir une courbe. Faire la somme de plusieurs de ces courbes permet d’en obtenir une d’aspect plus fractal, compliqué et naturel. On peut faire la même chose en deux dimensions, ce qui donne alors une texture. Le passage à la troisième dimension permet d’obtenir un terrain, ce qui est relativement trivial : il suffit d’interpréter la valeur du niveau de gris comme une hauteur.

![Bruit de Perlin en dimensions 1, 2 et 3](/assets/images/Perlin.png " Bruit de Perlin en dimensions 1, 2 et 3")

## Un nouveau processus de conception

Générer du contenu procéduralement au lieu de le créer à la main a de multiples avantages :

- Réduction des coûts de main d’œuvre. Concevoir et paramétrer un algorithme qui génère une forêt n’est pas trivial, mais ce sera toujours moins long que de dessiner et placer chaque arbre.
- Diminution des besoins de stockage et de bande passante. Par exemple si l’on veut des textures hautement réalistes, il suffit de stocker l’algorithme qui les génére à la volée, et pas les lourdes images finales. C’est ce qui permet à certains de créer des démos graphiques spectaculaires avec un fichier d’origine pesant quelques dizaines de Ko, alors que l'équivalent en vidéo pèserait beaucoup plus. Voir par exemple [.kkrieger](http://en.wikipedia.org/wiki/.kkrieger).

Cette approche a évidemment des limites. Générer procéduralement un objet revient à automatiser sa création, ce qui implique dans une certaine mesure qu’on le comprenne. Par exemple, créer des récits vraisemblables suppose que l’on sache ce qui fait qu'une histoire est bonne. Il faut au pire avoir de bonnes intuitions et heuristiques à ce sujet, au mieux avoir isolé des invariants et savoir les combiner. Cela fait écho à la quête des théoriciens du récit et des spécialistes des séries télévisées qui cherchent à trouver des archétypes et des mécanismes présents dans tout récit.

Ces limites suggèrent une méthode de conception différente de celle fréquemment en vigueur. Les jeux vidéo pour le grand public sont souvent très linéaires, avec une suite d’évènements scriptés minutieusement. Par exemple, un avion doit passer au-dessus du joueur précisément au moment où il sort d’un tunnel. Le but est de contrôler autant que possible l’expérience du joueur, dans la perspective classique d’un artiste démiurge et totalement maitre de l’univers fictionnel. Cet idéal devient impossible dans une perspective procédurale, puisque le contenu est largement aléatoire[^Dans les faits, peu de jeux sont générés intégralement de manière procédurale. De plus, on peut techniquement rendre l’environnement identique à chaque génération, puisque le générateur est [pseudo-aléatoire](https://en.wikipedia.org/wiki/Random_seed) : il suffit d’entrer à chaque fois les même paramètres de départ.]. Par exemple, on ne peut pas savoir la disposition exacte des arbres et des clairières dans une forêt.

Pourtant, on regagne en facilités de macro-gestion ce qu’on perd en contrôle minutieux. On ne peut pas placer telle espèce d’arbre à tel endroit, mais on peut faire des changements globaux sur la flore simplement en modifiant l’algorithme. Ce nouvel état d’esprit peut se répandre dans tout le processus de conception. Par exemple, puisqu’on ne peut pas planifier précisément l’emplacement d’une rencontre en forêt, on peut laisser le programme s’en occuper en suivant certaines conditions (« dans une clairière à moins d’un kilomètre de la ville »). Ensuite, on peut être tenté de rendre aléatoire la survenue elle-même des évènements. Certains moments clés dans le scénario peuvent restés pré-codés, tandis que d’autres peuvent se faire au hasard (par exemple les rencontres que le joueur ferait dans une ville).

## De nouveaux types d’interactions

L’approche procédurale change aussi beaucoup la manière de jouer. Certains jeux promettent en effet une re-jouabilité potentiellement infinie, puisque la cartographie des niveaux, l’emplacement des objets, les objectifs à remplir, etc. sont différents pour chaque nouvelle partie et chaque joueur. La question de la durée de vie d’un jeu doit donc être repensée, puisqu’elle dépend plus de la propension du joueur à se lasser que de l’imagination du développeur. À charge pour ce dernier de créer un programme qui génère des environnements et des aventures intéressantes, le reste se passe entre le jeu et le joueur. C’est à nouveau une perte de contrôle pour le créateur, mais qui se révèle payante, puisqu’elle permet au joueur de mieux s’approprier le jeu et de se faire sa « propre » aventure.

Plus généralement, le centre de gravité se déplace du créateur vers la création elle-même. Dans beaucoup de jeux classiques, le joueur essaye de composer avec ce qu’il devine des intentions du créateur, en essayant de prédire où un piège a été placé, ou quel va être le prochain rebondissement dans l'intrigue. Dans un jeu généré procéduralement, on cherche plutôt la logique qui gouverne la génération de ces structures variées. Passé l’émerveillement initial, on cherche la nécessité derrière la contingence apparente des formes.

L’approche procédurale est ainsi très prometteuse. Il existe même des travaux qui tentent de rendre automatisable la génération des règles elles-mêmes, notamment [Angelina](http://www.develop-online.net/features/1537/Games-built-by-computers), un moteur aléatoire de création de jeux. Toutefois, étant donné les limitations de conception, ne sont envisageables que des méthodes où seul un aspect du jeu est procédural.