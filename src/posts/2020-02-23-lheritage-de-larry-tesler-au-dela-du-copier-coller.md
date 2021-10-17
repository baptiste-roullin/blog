---
title: "L'héritage de Larry Tesler au-delà du copier-coller"
date: 2020-02-23
tags:
  - "conception"
  - "histoire"
  - "utilisateurs"
  - "features"
hero:
  type: split  # options: carousel, graphic, video, split (text & image)
  image: "souris_btn.png"
  alt: Clavier auxiliaire utilisé par Tesler pour tester la fonction de couper-coller, avec des étiquettes notées "cut" et "paste".
---



Larry Tesler, décédé récemment, est associé à l'invention du copier-coller. De même qu'Engelbart a inventé bien plus que la souris, son influence est vaste : les premières interfaces graphique chez Xerox Parc et Apple, SmallTalk, le PDA Newton... Vice a fait un bon [portrait](https://www.vice.com/en_us/article/n7jdgw/larry-tesler-the-inventor-of-copy-paste-was-more-influential-than-you-realize) de son parcours.

Comme avec Engelbart, ce qui est intéressant au-delà du catalogue de ses accomplissements, c'est de comprendre la vision qui les a motivé. En plus et comme souvent, Tesler est moins un inventeur solitaire que le synthétiseur d'une effervescence collective. Dans l'article je m'efforce de citer ses inspirations.

Mais commençons pas du concret.

## Le génie du copier-coller

Les actions de couper, copier et coller font partie de ces idées omniprésentes qui ont pourtant été créées un jour. Les barres de défilement, l'auto-complétion... [j'ai continué ici](https://toutcequibouge.net/2014/08/aux-origines-des-interactions/) une liste d'inventions commencée par Dan Saffer.

Tesler a inventé en fait plusieurs choses.

### 1\. **Une sélection intuitive du texte**

A l'époque, la crurseur était placé sous le caractère (ou derrière, en couleur inversée), ce qui introduisait de l’ambiguïté : si j'insère une lettre, va-t-elle être placée avant ou après le caractère sélectionné ?

NLS, le système d'Engelbart était plus avancé et utilisait une souris comme pointeur, mais n'avait pas de curseur permanent. La souris servait littéralement de pointeur, pour indiquer par exemple le début et à la fin d'une sélection de texte.

Larry Tesler (avec Peter Deutsch) inventa alors le curseur placé entre les caractères que l'on connait aujourd'hui.

![curseur en poutre en I](/assets/images/2020-02-23_00h54_25.png){width=400}

### 2\. **Le remplacement des modes par le presse-papier et les menus**

Se débarrasser des modes était le grand combat de Tesler. Qu'est-ce qu'un mode ? C'est un état global du système que l'utilisateur enclenche et qui permet ou interdit d'autres actions. Par exemple appuyer sur la touche VERR MAJ permet de taper des lettres capitales mais interdit les minuscules. Appuyer sur MAJ serait un quasi-mode (selon la terminologie de Jef Raskin) qui oblige à maintenir la touche pour rester actif.

Les éditeurs de texte étaient massivement modaux, c'est-à-dire qu'il y avait un mode pour naviguer, un pour insérer, un pour supprimer... La présence de modes complexifie les interactions (dans quel mode suis-je ? Comment en sortir ?) mais élargit la palette d'actions. Par exemple en mode Naviguer, chaque touche du clavier peut être un raccourci, ce qui permet des actions fines du genre "avancer de trois paragraphes". [L'éditeur Vim](http://rc3.org/2012/05/12/the-grammar-of-vim/), encore populaire aujourd'hui, fonctionne essentiellement ainsi.

C'est aussi l'héritage d'une époque où [les éditeurs de texte](https://en.wikipedia.org/wiki/Line_editor) étaient conçus pour un télétype (c'est-à-dire concrètement une imprimante), pas pour un écran. On désignait une ligne, on faisait une modification et on imprimait le résultat en croisant les doigts pour ne avoir fait d'erreur. Dans un contexte aussi peu interactif, des modes étaient nécessaires.

![Les créateurs d'Unix utilisant un PDP-11 avec un terminal télétype](/assets/images/ken-and-den.jpg "Les créateurs d'Unix utilisant un PDP-11 avec un terminal télétype")


Même NLS, le système d'Engelbart avec clavier et souris n'était pas plus simple. Voici la procédure pour déplacer du texte :

1. Touche M (pour Move)
2. Touche T (pour Text)
3. Pointer le début puis la fin du texte souhaité
4. Pointer la destination
5. Valider

Inspiré par Pentti Kanerva, Tesler abolit ces modes en inversant le modèle d'interaction : au lieu de désigner d'abord l'action (effacer) puis son objet (tel groupe de mot), on sélectionnait du texte puis on agissait dessus. Le clavier ne servait plus qu'à une chose, taper du texte. Les commandes ont d'abord été attribuées à des touches spéciales puis au menu déroulant "éditer", inventé juste après.

La complexité a été ainsi déplacée des modes au presse-papier : celui-ci stocke de l'information sans l'afficher à l'utilisateur, ce qui occasionne parfois des surprises. Mais globalement, copier et coller étant souvent concomitants, on a beaucoup gagné au change.

![Capture d'écran de Mac OS 9, avec un éditeur de texte ouvert dans lequel il est écrit "Larry Tesler 1945-2020")](/assets/images/tesler0.png "Réalisé avec cet [émulateur](https://jamesfriend.com.au/pce-js/)"
)


### 3\. La métaphore de couper et coller

La dernière pièce du puzzle a été de rassembler le déplacement et la duplication. Suivant l'action précédente, coller peut couper ou bien copier. Cela n'allait pas de soit : encore aujourd'hui Mac OS permet de copier un fichier mais pas de le couper, car le déplacement est vu comme une action bien distincte. On a finalement trois actions réunies par une même métaphore, celle du papier.

## La méthode Tesler

Quelle approche a suivi Tesler pour faire tout ça ?

### 1\. Tester, tester et tester

Malgré ses fortes convictions (qui allaient jusqu'à avoir une plaque d'immatriculation anti-modale), Tesler n'a jamais succombé à l'illusion de connaitre les utilisateurs et a donc très tôt mené des tests.

![](/assets/images/2020-02-23_01h20_55.jpg)

> My observations of secretaries learning to use the text editors of that era soon convinced me that my beloved computers were, in fact, unfriendly monsters, and that their sharpest fangs were the ever-present modes. The most common question asked by new users, at least as often as "How do I do this?," was "How do I get out of this mode?"
>
> [The Smalltalk Environment, 1981](https://carlstrom.com/stanford/cs242/WWW/readings/Smalltalk-Byte.htm)

> Before doing it he decided that he wanted to observe a user, and used a technique similar to his“guided fantasy.” He describes working with a secretary who had just started at PARC and was not yet influenced by the programs that were being used:I sat her down in front of a screen, and did what’s now called a“blank screen experiment.”
>
> “Imagine that there is a page on the screen, and all you’ve got is this device that you can use to move a cursor around, and you can type,” I said. “You’ve got to make some changes to this document. How would you do it?”I gave her a paper document with lots of markups on it for reference, and asked her to imagine that is was on the screen. She just designed it right there!“I would point there, and then I would hit a delete key,” she said.To insert, she would point first and then start typing. She’d never been contaminated by any computer programs before, so I wrote all this down, and I thought, “That sounds like a pretty good way to do it!”
>
> p. 62, Bill Moggridge, Designing interactions. MIT press, 2007. [Tout le chapitre est disponible ici](http://www.designinginteractions.com/download)

### 2\. Prendre les problèmes à la racine

Ce qui m'impressionne, c'est sa capacité très tôt dans sa carrière à argumenter et théoriser ses choix. Dès 1981, son [disours contre les modes](https://carlstrom.com/stanford/cs242/WWW/readings/Smalltalk-Byte.htm) est solide et construit. En 2010 il réalise ce schéma pour montrer qu'il faut moins d'étapes pour corriger une erreur avec une interface amodale. Voir ces enjeux nécessitait de s'abstraire du fonctionnel et de modéliser des interactions. Cela va plus loin que compter le nombre de clics et relève de la sémantique : les opérations de l'utilisateur sont composées de verbes et de noms, l'ordre nom-verbe est-il supérieur à l'ordre inverse, pourtant plus proche de l'anglais ? Les tests lui ont montré que oui.

![](/assets/images/2020-02-23_01h43_56.png)

[A Personal History of Modeless Text Editing](http://worrydream.com/refs/Tesler%20-%20A%20Personal%20History%20of%20Modeless%20Text%20Editing%20and%20Cut-Copy-Paste.pdf)

### 3\. La démocratisation contre l'avant-garde

L'opposition de Tesler à Engelbart fut parfois frontale et révèle une différence fondamentale dans leurs visions. Pour schématiser, le premier visait le grand public et le second des experts.

Engelbart développait un système ambitieux et complet pour inventer de nouvelles manières de travailler collaborativement et même de raisonner. Plusieurs ordinateurs étaient connectés entre eux et équipés d'un clavier, d'une souris à trois boutons et d'un [clavier-accord](https://en.wikipedia.org/wiki/Chord_keyset). Ce dernier, à gauche sur la photo, résume bien la complexité de l'ensemble, puisque chaque combinaison de touches exécutait une action différente.

![Douglas Engelbart démontrant son système ](/assets/images/motd_ui.jpg)

[Douglas Engelbart démontrant son système](https://en.wikipedia.org/wiki/The_Mother_of_All_Demos)

Il se préoccupait plus d'utilité que d'utilisabilité. Mettre des mois à apprendre à maitriser le système n'était pas vraiment un problème si ça valait le coup. A la fin l'utilisateur pouvait manipuler de grandes quantités d'informations, raisonner sur des problèmes complexes ou résoudre des défis scientifiques. Engelbart avait cette vision de l'ordinateur comme nouveau medium cognitif capable "[d'accroitre notre intellect](https://www.dougengelbart.org/content/view/138/)".

Le problème est qu'il voulait créer un instrument merveilleux comme le violon alors que pas grand monde ne prendra le temps d'apprendre à jouer du violon, pour reprendre une formule d'Alan Kay cité par Bardini, p. 215)

Tesler, à l'inverse, voulait créer des logiciels simples à comprendre par le plus grand nombre :

> \[Avec un collègue\] ils rédigèrent une note interne à Xerox décrivant ce qu'ils appelèrent IT, pour "Intuitive Typewriter" \[machine à écrire intuitive\]. Ils décidèrent que la facilité d'utilisation était importante, en réalisant que ce serait un "désaccord majeur avec Engelbart".
>
> p. 157, Bardini, Thierry (2000). [_Bootstrapping: Douglas Engelbart, Coevolution, and the Origins of Personal Computing_](https://archive.org/details/bootstrappingdou00bard_0). Stanford University Press.

Pour Engelbart, un nouveau medium appelait de nouvelles conventions, tant pis si cela rompait avec les habitudes. Pour Tesler c'était l'inverse :

> Il fallait adapter l'interface à la manière dont les gens travaillent et pas utiliser l'interface pour les forcer à apprendre à travailler mieux et différemment.
>
> Idem

Dès le début des années 70 est donc née cette opposition entre deux philosophies. Elle reste prégnante dans la conception de logiciels : élitisme ou démocratisation, puissance ou facilité, respect des habitudes ou nouveauté. Présentée ainsi, l'opposition tend à la caricature et il y a sans doute de la place pour tous les types de logiciel. D'aucuns ont cependant argué qu'une vision a écrasé l'autre et a tué dans l’œuf tout un champ [d'outils exigeants et avancés](http://www.loper-os.org/?p=861).

Quoiqu'il en soit, voici quelques personnes qui chacun à leur manière tentent de combler ce fossé et de faire avancer le medium.

- [Up and Down the Ladder of Abstraction, a Systematic Approach to Data Visualization](http://worrydream.com/LadderOfAbstraction/)
- [How can we develop transformative tools for thought?](https://numinous.productions/ttft/)
- [Casual creator, ou de la séparation artificielle entre créateur et consommateur](http://www.galaxykate.com/blog/casualcreator.html)

## Références complémentaires

Computer History Museum, [Oral History of Lawrence G. “Larry” Tesler](https://archive.computerhistory.org/resources/access/text/2014/08/102746675-05-01-acc.pdf)

[Une démonstration par Tesler de son éditeur de texte phare](https://www.youtube.com/watch?v=Dhmz68CII9Y)

![](/assets/images/maxresdefault1.jpg "Larry Tesler face à un Xerox Alto")

## Post-scriptum : où l'on retrouve Don Norman

J'évoque dans cet article les éditeurs de texte des années 70. Il s'avère que l'un d'entre eux fut longtemps l'éditeur par défaut d'Unix et fut durement critiqué dans un article de Don Norman : _[The truth about Unix: The user interface is horrid](http://www.ceri.memphis.edu/people/smalley/ESCI7205_misc_files/The_truth_about_Unix_cleaned.pdf)_ (PDF).

L'article date de 1981 et fut apparemment très populaire. C'est le premier d'un longue série de textes qu'il consacre à l'informatique.
