---
title: "Un bidule optimisé pour la main mais codé avec les pieds"
date: 2016-01-02
tags:
  - "projets"

---

**EDIT** : [Infos plus récentes ici](http://toutcequibouge.net/2016/05/lecons-ergonomiques-et-techniques-dun-projet-perso/).

S'il y a bien un moment où je n'ai pas envie d'utiliser mes faibles capacités de calcul mental, mais plutôt un artefact cognitif adapté (en français : dégainer une calculette), c'est quand il s'agit de payer en tickets restaurant. Étant toujours à la recherche d'occasions concrètes d'apprendre à programmer, j'ai donc bricolé un petit outil qui affiche le nombre de tickets à donner et le reste en liquide.

Le bidule est pensé pour une utilisation sur petit écran et une saisie au pouce. J'ai essayé de rendre le formulaire dynamique, pour empêcher la saisie de lettres ou des montants mal formatés. C'est un parti pris ergonomique (blocage versus message d'erreur), mais c'est également instructif de voir à quel point le développement de web app peut être CHIANT si on tombe sur la mauvais combinaison de cas – en l'occurrence, combiner un contrôle à la saisie et un clavier adapté à la saisie numérique sur mobile. Par exemple, l'outil bloque la saisie d'une seconde virgule après "1,01", mais après "1," ou "1,00".

Avertissement : on parle d'un truc optimisé pour la main mais codé avec les pieds. Donc pas de support de Safari <9 ni d'Internet Explorer (et temporairement de Firefox sur Android, grrr). et un code d'une qualité très relative.

[C'est ici](http://misc.toutcequibouge.net/TR/index.html).

[![Screenshot_2016-01-03-00-05-00](/assets/images/Screenshot_2016-01-03-00-05-00-e1451777220269.png)](http://misc.toutcequibouge.net/TR/index.html)
