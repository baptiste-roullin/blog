---
title: "De quelques similitudes entre utilisabilité et sécurité"
date: 2015-09-06
tags:
  - "réflexions"
  - "sécurité"

---

Créer un système, c'est s'assurer qu'il remplit un ensemble de fonctions données, mais aussi qu'il possède des qualités globales comme la maintenabilité, la fiabilité, la rapidité… On les appelle parfois des [exigences non-fonctionnelles](https://en.wikipedia.org/wiki/Non-functional_requirement). Parmi elles, l'utilisabilité et la sécurité sont des qualités cruciales et moins antagonistes que l'on ne pourrait le croire.

## Ne pas raisonner dans l'absolu

On se demande souvent « est-ce que cette interface est ergonomique ? » Ce n'est pas la bonne question à se poser car elle n'a pas grand sens dans l'absolu. Il faut plutôt chercher à savoir dans quelle mesure elle est utilisable, selon certains critères, pour certains usages et avec certaines contraintes.

Le même enjeu existe en sécurité : on oscille entre fantasmes de protection totale et sentiment résigné que, de toute façon, Google et la NSA savent tout de nous. Pourtant, non seulement la sécurité n'est pas une propriété binaire, mais grosso modo elle dépend de trois facteurs.

1. Les enjeux : à quel point les données à protéger sont critiques ? Cette évaluation se fait classiquement selon trois critères : la disponibilité (les personnes autorisées ont accès aux données), la confidentialité (uniquement ces personnes y ont accès) et l'intégrité (les données n'ont pas été modifiées dans leurs dos). Selon le contexte, certains critères vont être privilégiés : par exemple je considère que déverrouiller mon téléphone facilement est plus important que de le rendre indéchiffrable, donc je ne lui donne pas de mot de passe interminable.
2. Le modèle de menace : qui en a après mes données, quelles ressources a-t-il et à quel point est-il déterminé.
3. La réponse : quelles mesures mettre en place ?

Elaborer une politique de sécurité n'est pas forcément très compliqué. Par exemple, selon James Mickens dans [cet article très drôle](https://www.usenix.org/system/files/1401_08-12_mickens.pdf), le modèle de menaces d'un particulier peut se limiter à « Mossad ou pas Mossad ». Si le Mossad (ou une institution comparable) en a après vous, vous êtes foutus. Si non, prenez des mesures raisonnables et tout ira bien.

Même si elle n'est pas très compliquée, la sécurité n'est jamais une propriété binaire. Il en va de même en ergonomie : on peut favoriser la polyvalence ou la spécialisation, une apprenabilité rapide ou longue, etc.

## Ne pas se croire tout puissant

En sécurité, un aspect intéressant est que les mesures prises ont pour objectifs de rendre acceptable le niveau de risque — et pas plus. Pour chaque risque identifié, on évalue sa vraisemblance et sa gravité, avant de prendre une mesure pour diminuer son impact. A la fin, il reste des _vulnérabilités résiduelles_, qu'il suffit d'expliciter et de justifier : certes, quelqu'un avec un accès physique au système, une porte dérobée déjà en place et un supercalculateur de poche pourrait opérer une brèche. Mais c'est un risque acceptable.

Ce n'est pas très différent d'une démarche ergo, dans laquelle on identifie certains déterminants de l'activité (par exemple, l'utilisateur est forcé d'utiliser sa tablette avec des moufles), auxquels on répond par des solutions (doubler la taille des boutons) ou des recommandations (ne pas utiliser la tablette dans un contexte nécessitant ces moufles).

La différence, dans mon expérience, c'est que la démarche ergo est :

- Moins formalisée : Les observations et solutions sont moins décomposées, les points faibles sont affichés de manière moins transparente. (Mais j'ai peut-être une vision idéaliste des audits de sécurité.)
- Moins cadrée : au nom d'une utilisabilité parfaite et absolue, on nous demande souvent l'impossible. Une bonne part du boulot d'un expert en ergonomie est d'expliquer que l'on n'est pas omnipotents.

## Faire avec l'utilisateur

Une dernière similitude, c'est qu'on ne peut pas concevoir un système isolé : il faut anticiper son utilisation et supposer que l'utilisateur peut être étourdi, bricoleur, ou malveillant (voire les trois en même temp). Par exemple, il faut anticiper ce qui se passe si l'utilisateur oublie son mot de passe ou s'il est laxiste dans une procédure de vérification quelconque.

Dans les deux cas, il y a une tension entre les utilisateurs réels (pressés et tous différents) et idéaux (consciencieux et attentifs). Il existe même un concept juridique de [« personne prudente et raisonnable](https://en.wikipedia.org/wiki/Information_security#Process) », consacrant le fait que manipuler des informations sensibles entraine certaines responsabilités et exige un certain comportement. Evidemment, c'est plutôt rare d'aller en prison parce que vous n'avez pas utilisé un logiciel comme un concepteur l'espérait. Malgré tout, la conception doit faire certains postulats et compromis.

## Similaires, voire complémentaires

La sécurité nuit souvent tellement à l'utilisabilité qu'elle se tire une balle dans le pied. Les exemples ne manquent pas, [des critères absurdes](http://kottke.org/12/06/the-worlds-worst-password-requirements-list) de choix de mot de passe à [la complexité](https://www.usenix.org/legacy/events/sec99/full_papers/whitten/whitten_html/index.html) (PDF) des outils de chiffrement. Les deux approches sont suffisamment similaires pour pouvoir être complémentaires. Il suffit d'en revenir à l'utilisateur. Voici deux articles classiques pour creuser le sujet : « [Users are not the enemy](http://discovery.ucl.ac.uk/20247/2/CACM%20FINAL.pdf)  » (PDF) et « [When security gets in the way](http://jnd.org/dn.mss/when_security_gets_in_the_way.html) ».
