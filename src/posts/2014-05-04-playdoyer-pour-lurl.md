---
title: "Plaidoyer pour l'URL"
date: 2014-05-04
tags:
  - "features"

---

_Résumé : il faut se battre pour l'URL mais il faut aussi améliorer la barre d'adresse et en faire une vraie barre de navigation et d'action._

Google expérimente en ce moment une nouvelle fonctionnalité pour Chrome : faire disparaitre l'URL de la barre d'adresse. Il ne subsisterait que le nom de domaine dans un cadre, afin de mieux le mettre en avant et lutter contre le phishing ([source](https://news.ycombinator.com/item?id=7694146)). Cela permettrait de mieux distinguer `amazon.com` de `amazon.siteChelou.com`. Pour voir l'URL et l'éditer, il faudrait cliquer sur le nom de domaine.

![](/assets/images/hidden-url.gif " Animation empruntée à [Usability Post](http://usabilitypost.com/2014/05/03/killing-the-url/)")

Beaucoup se sont élevés contre cette idée ([notamment](http://www.allenpike.com/2014/burying-the-url/)), l'URL étant le concept fondateur du web. Grâce à elle, un document est accessible universellement et sans ambiguïté. À cela, on peut répondre que bien des appareils fonctionnent parce que leur technologie est invisible pour l'utilisateur. Après tout, on ne lui révèle pas l'adresse IP d'un site ou le header d'une requête HTTP, alors que ce sont des protocoles fondamentaux et porteurs d'information. De plus, les URL sont souvent une suite de caractères incompréhensibles et inutilisables.

Mon avis : cela reste une mauvaise idée et une réponse très disproportionnée au problème du phishing. Rien n'empêche une URL de suivre une syntaxe claire, il y a même de bonnes [raisons techniques](http://en.wikipedia.org/wiki/Clean_URL) pour cela. De plus, elle peut comporter des informations directement pertinentes pour l'utilisateur. Considérez une URL de ce genre :

boutique.com/fr/vêtements/homme/pantalons?items-par-page=30?classement=prix

Elle permet de situer la page dans l'arborescence du site et de signaler comment elle est paramétrée. C'est un excellent repère de navigation, toujours présent et toujours au même endroit.

On pourrait aller plus loin et imaginer que chaque niveau de l'URL soit manipulable, comme cela se fait dans l'explorateur de fichiers de Windows ou dans certains éditeurs de code. Par exemple, dans Coda, cliquer sur un dossier du chemin ouvre un menu permettant d'accéder aux autres dossiers de même niveau. Cliquer sur le fichier ouvert permet également d'accéder aux différentes fonctions que celui-ci inclut, ce qui facilite la navigation dans le corps du document. Dans une page web, par exemple, on pourrait imaginer que changer de langue se fasse depuis l'URL, par un menu dédié, au lieu de chercher désespérément le lien dans la page (cela m'arrive souvent dans des bases documentaires).

![interactive path for Coda 2](/assets/images/coda.png)

Plus généralement, je trouve toujours dommage qu'on essaye de cacher un système puissant, sous prétexte qu'il est complexe et mal utilisé. Il faudrait plutôt domestiquer cette complexité et la rendre plus accessible aux utilisateurs. La barre d'adresse d'un navigateur est aujourd'hui un des rares endroits où l'on est confronté au concept d'interface en ligne de commande. C'est aussi une interface vers énormément de choses : historique, favoris, recherche, etc. Organiser et retrouver du contenu, opérer un service… Il y a là un gros potentiel et une bonne occasion de faire progresser les interfaces en ligne de commande et d'y habituer les gens.

Je précise que mon propos n'est pas une position de principe ou un un appel à sauver le web. Un protocole ne devrait avoir aucune importance, sauf s'il peut avoir du sens pour l'utilisateur, comme ici. Je dis bien « peut » : en l'état, la plupart des gens se fichent des URL et vu la gueule de bien d'entre elles, on les comprend. Il y a là un pari : c'est seulement en explorant leur potentiel qu'on fera comprendra leur intérêt au plus grand nombre.

C'était l'idéal d'un projet de Mozilla, Ubiquity. Le concept de départ, très ambitieux, était de s'abstraire des pages et de proposer une interface en language naturel qui permette d'exécuter des actions de haut niveau et de les lier entre elles. Concrètement, on pourrait entrer "réserver un vol vers Sidney pour moi et Machin, envoyer l'itinéraire à Machin et ajouter la date à mon calendrier". La réalité était plus modeste mais tout de même bien cool. Pour en savoir plus, voir [ici](http://www.azarask.in/blog/post/ubiquity-in-depth/) et [ici](https://blog.mozilla.org/labs/2008/08/introducing-ubiquity).

Bref, il y a tant de choses à faire autour de la barre d'adresse.
