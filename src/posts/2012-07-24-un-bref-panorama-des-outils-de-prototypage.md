---
title: "Un bref panorama des outils de prototypage"
date: 2012-07-24
tags:
  - "prototypage"

---

J’ai créé une catégorie sur Wikipedia pour recenser les outils de prototypage d’interfaces graphiques. Voici une liste plus complète (mais loin d’être exhaustive), incluant ceux qui n’ont pas de pages sur Wikipedia et me permettant de faire quelques commentaires le cas échéant.
**EDIT : Voici [un article](http://toutcequibouge.net/toutcequibouge/2014/06/le-guide-relativement-exhaustif-et-raisonnablement-ultime-des-outils-de-prototypage/) plus récent sur la question.**



**Adobe Fireworks** (Mac OS, Windows)

Outil de dessin orienté prototypage web. La possibilité d’export en HTML est assez puissante. Une fonction de “slicing” permet de spécifier quelles portions de la page resteront des images (fonction également présente sur Photoshop, mais moins poussée).



**Powerpoint** (Mac OS, Windows)

Logiciel d’une polyvalence impressionnante. On peut par exemple lancer un diaporama en désactivant le changement de slide à volonté et le clic droit. Parfait pour une maquette interactive. Pour ça, allez dans l’onglet Diaporama > Configurer le diaporama et cliquez sur “visionné sur une borne” (“terminal” dans la version anglaise).

Hélas, le fait que Powerpoint n’ait pas été conçu comme un logiciel de graphisme se sent vite et peut devenir gênant si on veut en faire une utilisation poussée. Par exemple le nuancier n’inclut pas de valeurs hexadécimales. Également, le dessin des formes n’est pas invariant selon le niveau de zoom. Cela se peut se révéler exaspérant si on cherche à travailler au pixel près. Par exemple, si on veut aligner plusieurs rectangles, suivant le niveau de zoom il y aura un léger décalage.



**[Axure](http://www.axure.com)** (Mac OS, Windows, démo de 30 jours)

Logiciel pour créer des maquettes interactives avec export en HTML. Inclut une gestion des états pour animer une page sans avoir à la cloner, ainsi que des transitions (translation, fading, etc.). Un début de fonction de script. Possibilité de créer des masters de widget réutilisables. Parmi les outils qui sont uniquement dédiés au maquettage, c’est probablement le plus puissant. Tiens d’ailleurs la licence est à $589.



[**Balsamiq Mockups**](http://www.balsamiq.com/) (Mac OS, Windows, démo en ligne limitée, démo complète à télécharger et valable sept jours)

Volontairement limité, l’outil est imbattable pour créer rapidement une maquette. Tout est dans le choix des widgets prédéfinis et des propriétés spécifiques pour les modifier. J’apprécie aussi le menu en accès rapide pour éditer le contenu d’un widget avec une syntaxe dédiée (taper “lorem” pour obtenir du pseudo-texte, \[ \] pour une checkbox, \[x\] pour qu’elle soit cocher, - \[ \]- pour qu’elle soit désactivée, ce genre de choses).

[**Microsoft Expression Blend**](http://www.microsoft.com/expression/products/Blend_Overview.aspx) + Sketchflow (Windows)

Blend cherche à combler le fossé entre graphistes et développeurs en proposant un outil hybride qui permet de dessiner des éléments d’interface et de voir le code sous-jacent. Ce n’est pas le premier éditeur WYSIWYG et c’est une approche qui attire souvent la méfiance, mais c’est un logiciel vraiment intéressant. Il génère des projets lisibles directement dans Visual Studio et totalement natifs au niveau du code (il faut choisir entre WPF, la composante graphique de .NET, et Silverlight). Un graphiste peut ainsi profiter des widgets prédéfinis, les styler, spécifier leur comportement et balancer le tout aux développeurs qui peuvent l’intégrer au reste du projet. Cela suggère des manières de travailler en équipe assez intéressantes. Au minimum, cela favorise les interactions entre créateurs d’interface et codeurs, puisque cela force les premiers à se familiariser avec la technologie et les seconds à faire attention aux spécifications qu’on leur envoie.  

 Par ailleurs, si vous voulez créer une maquette aboutie graphiquement, il est facile d’y inclure les widgets standard de Windows. Si vous voulez plutôt un rendu en fil de fer, le module Sketchflow (disponible dans la version Ultimate) propose un style “mockup”. Mais n’espérez pas la légèreté d’un Balsamiq. Blend expose via une interface graphique une bonne partie de la technologie WPF : les liaisons de données, le système de mise en page, les nombreuses propriétés propres à chaque widget (pardon, à Redmond on dit “contrôle”), etc. Les premiers contacts avec le logiciel ne sont pas forcément faciles. C’est sans doute le prix à payer, vu la portée des fonctionnalités,


[**Omnigraffle**](http://www.omnigroup.com/products/omnigraffle/) + le gabarit Konigi Wireframes (Mac OS, iPad, démo de 14 jours)

Un logiciel de diagramme à la base. Je ne suis pas très fan de l’interface.

**[Pencil](https://addons.mozilla.org/fr/firefox/addon/pencil/)** (Add-on pour Firefox)

Un peu vieux et limité.


**[Just In](http://www.justinmind.com/) [Mind](http://www.justinmind.com/)** (Mac OS, Windows, existe en version gratuite)



[**Flairbuilder**](http://flairbuilder.com/) (Mac OS, Windows, Linux).



[**InVision**](http://www.invisionapp.com/) (En ligne, version gratuite)

Les deux petits derniers :

[**Moqups**](https://moqups.com/) (En ligne)

Gratuit, fait des maquettes en fil de fer. Emprunte pas mal à Balsamiq, assez orienté iOS. Prometteur.


[**Fluid UI**](https://www.fluidui.com/editor/live/) (En ligne, orienté mobile)
