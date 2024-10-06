---
title: "Cognition et design : quand tout est biais plus rien n'est biais"
description: "Comment invoquer la psychologie en tant que designer, face à un problème de fiabilité de la recherche et à une avalanche d'effets et de biais disparates."
date: 2024-10-05T22:26:14.343Z
draft: false
tags:
 - "cognition"
 - "recherche"
hero:
alt:
image:
fmContentType: post
---

**Table des matières**

[[toc]]

Quand on est designer, il est tentant d'invoquer la science. Après tout, pour concevoir des systèmes adaptés à l'esprit humain il faut connaitre son fonctionnement : savoir comment est fichu notre système visuel pour comprendre ce qui rend une page lisible, savoir comment on raisonne quand on compare des produits, etc.

Mais "comprendre l'esprit humain", c'est un tantinet ambitieux. Le designer a souvent un but plus contextuel et utilitaire. Il s'est donc développée une petit industrie de livres, de cours ou d'articles sur Medium fournissant des "boites à outil" avec différents principes et effets à utiliser au cas par cas. On peut aller piocher dans cette littérature pour asseoir un argument et sa légitimité de designer : "en fait, un biais cognitif bien connu montre que…", "et pourtant, après 3 secondes l'attention de l'utilisateur…".

Le problème, c'est que tout cet écosystème est propice aux arguments d'autorité ou au baratin, pour des raisons assez humaines et compréhensibles : que ce soit de la part du chercheur, du vulgarisateur ou du designer praticien, il est facile de simplifier un résultat, de le sur-interpréter, de le comprendre comme ça nous arrange, même sans s'en rendre compte.

Rassurez-vous mon but n'est pas de faire un article sur l'état de notre culture scientifique ou de la vulgarisation, mais d'attirer l'attention sur des enjeux spécifiques à la psychologie. Il y a

1. Un fort problème de fiabilité, lié notamment à de grosses difficultés à reproduire beaucoup de résultats.
2. Un problème avec la prolifération de "biais" sur tout et n'importe quoi.


## 1. Entre 30 et 50% des résultats en psychologie n'ont pas de valeur scientifique

Ce qu'on appelle la crise de la reproductibilité, c'est la découverte que de nombreux travaux importants, principalement en médecine et en psychologie, sont impossibles à reproduire si on essaye de répéter la même expérience mais en respectant les exigences méthodologiques et statistiques. Des efforts collectifs de réplication systématique ont tenté de mesurrer l'étendue du problème et ont conclu que jusqu'à la moitié des papiers contrôlés ne pouvaient être reproduits.

Les causes sont nombreuses et énumérées [sur Wikipedia](https://en.wikipedia.org/wiki/Replication_crisis). Citons notamment : la pression à la publication, la rareté des études de reproduction (dans l'idée que ça n'apporte rien de tester ce qui a déjà été, théoriquement, prouvé), les panels composés d'étudiants américains peu représentatifs, une culture permettant les mauvaises pratiques et le triturage de données, voire la fraude pure et simple.

Il y a aussi un problème spécifique aux psychologies sociales et cognitives : elles s'intéressent à des phénomènes difficiles à isoler en laboratoire. Étudier des phénomènes de bas niveau comme les temps de réaction ou les seuils de détection n'est pas extrêmement compliqué : les méthodes, les données et ce qu'on peut en conclure sont [assez standardisées](https://en.wikipedia.org/wiki/Psychophysics). Mais affronter des thèmes comme le lien entre relations sociales et cognition, la personnalité, ou la foi, c'est plus compliqué.

Par exemple, il y a un gros programme de recherche autour des stéréotypes inconscients : à quel point les gens ont des représentations sexistes ou racistes, indépendamment de leur tolérance déclarée. Cela pose plein de questions [méthodologiques](https://en.wikipedia.org/wiki/Implicit-association_test#Criticism_and_controversy) et [épistémologiques](https://plato.stanford.edu/entrieS/implicit-bias/) : comment tester ces biais, qu'appelle-t-on inconscient, qu'appelle-t-on stéréotype, quel effet sur le comportement réel, etc. Aujourd'hui, le le protocole classique de test est largement [remis en cause](https://journals.sagepub.com/doi/full/10.1177/1745691619826015).

Avant de donner d'autres exemples, deux remarques :
- Résultat "non-reproduit" ne veut pas dire "faux". Selon les cas, l'effet peut subsister mais moins fort que prévu, ou avec un périmètre différent, ou avec un cadre théorique différent. Par exemple, [l'effet Hawthorne](https://en.wikipedia.org/wiki/Hawthorne_effect) (l'influence d'un  scientifique du fait de sa simple présence dans une expérience) est très critiqué, mais plus largement il reste que notre comportement est différent [quand on est observé](https://en.wikipedia.org/wiki/Reactivity_(psychology)).
-  La qualité de la recherche [s'est améliorée](https://www.nature.com/articles/s44271-023-00003-2). Par exemple, l'influence de l'expression faciale sur les émotions réellement ressentie, une hypothèse longuement débattue, [a finalement été confirmée](https://en.wikipedia.org/wiki/Facial_feedback_hypothesis#Experimental_confirmation) : l'effet est modeste mais existe.

Bref, il faut juste être vigilant et ne pas tomber dans une défiance facile et systématique envers la science. Deux conseils :
- Sur ces sujets, Wikipedia n'est pas forcément à jour.
- Il faut se méfier des effets trop généraux ou trop beaux pour être vrais (du type "[l'auto-persuasion](https://en.wikipedia.org/w/index.php?title=Positive_illusions&useskin=vector) est un grand facteur de succès").

### Exemples

#### Effet marshmallow

[C'est l'idée](https://en.wikipedia.org/wiki/Stanford_marshmallow_experiment) que le contrôle de soi d'un enfant (mesuré par la capacité à se retenir de manger une sucrerie en échange de deux sucreries plus tard) prédirait son succès dans la vie. [Un papier](https://www.theatlantic.com/family/archive/2018/06/marshmallow-test/561779/) tend à montrer que l'influence de facteurs socio-économiques a été largement sous-estimée. [Un papier](https://journals.sagepub.com/doi/10.1177/0956797618761661) plus récent suggère que même ce dernier lien est difficile à prouver.

#### Effet Dunning kruger

[C'est l'idée](https://en.wikipedia.org/w/index.php?title=Dunning%E2%80%93Kruger_effect) que les gens peu compétents dans un domaines sur-estiment leur capacité et que l'écart entre compétence réelle et compétence supposée rétrécit avec le gain de compétence. Tout porte à croire que ce serait un artefact statistique et de présentation des données. Tout ce qu'on trouve est une différence de [dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion) (de variabilité, en gros) : le taux de sur-estimation moyen dans l'auto-évaluation est à peu près identique entre débutants et experts, mais sa variabilité est plus faible chez les experts.

> Although there is no hint of a Dunning-Kruger effect, Figure 11 does show an interesting pattern. Moving from left to right, the spread in self-assessment error tends to decrease with more education. In other words, professors are generally better at assessing their ability than are freshmen. That makes sense. Notice, though, that this increasing accuracy is different than the Dunning-Kruger effect, which is about systemic bias in the average assessment. No such bias exists in Nuhfer’s data.
> [Source](https://economicsfromthetopdown.com/2022/04/08/the-dunning-kruger-effect-is-autocorrelation/) {lang=en}

Une autre [source ici](https://www.mcgill.ca/oss/article/critical-thinking/dunning-kruger-effect-probably-not-real).

#### Amorçage (*priming*)

L'amorçage est l'idée que l'exposition à un stimulus peut influencer la réponse à un second stimulus ou à nos actions. Cela va d'effets assez intuitifs (on aura plus tendance à penser à des animaux qu'à des chaises si on a été pré-exposé au mot "chien") à plus contestable : être exposé à des mots relevant du champ sémantique de l'intelligence ("professeur" plutôt que "hooligan") améliorait les résultats à un exercice de réflexion.

C'est tout un champ de recherche, où l'amorçage a finit par avoir des significations très variées. Cf. [Wikipedia](https://en.wikipedia.org/w/index.php?title=Priming_(psychology)#Replicability_controversy) et ces deux articles ([ici](https://www.nature.com/articles/497016a) et [là](https://nuage.toutcequibouge.net/s/5y782Fk9HGaRW6W)).

#### Épuisement de l'égo

L'idée que la volonté est fragile et limitée parait intuitive, une donnée fondamentale de la condition humaine. Mais ça devient plus compliqué si on va jusqu'à la considérer comme une jauge unique d'énergie, qui baisse de manière identique quelque soit l'activité, qu'on assimile "faire" et "se retenir de faire", et qu'on veut tester tout ça en laboratoire.

Bref, je vous laisse lire [Wikipedia](https://www.slate.com/articles/health_and_science/cover_story/2016/03/ego_depletion_an_influential_theory_in_psychology_may_have_just_been_debunked.html) et [cet article](https://www.slate.com/articles/health_and_science/cover_story/2016/03/ego_depletion_an_influential_theory_in_psychology_may_have_just_been_debunked.html).

####  Avantages cognitifs du bilinguisme

Il a souvent été affirmé qu'être élevé dans un environnement bilingue procure de nets gains cognitifs, notamment en terme de volonté et de contrôle de soi. C'est très débattu, cf [cet article](https://www.theatlantic.com/science/archive/2016/02/the-battle-over-bilingualism/462114/) et [Wikipedia](https://en.wikipedia.org/w/index.php?title=Cognitive_effects_of_bilingualism#Executive_function).

#### Coup de pouce (*nudge*)

Les effets des dispositifs de coup de pouce sont largement sur-estimés, selon deux études ([ici](https://www.pnas.org/doi/full/10.1073/pnas.2200300119) et [là](https://onlinelibrary.wiley.com/doi/epdf/10.3982/ECTA18709))

On pourrait aussi parler des accusations de manipulation contre les expériences de [Stanford](http://www.liberation.fr/debats/2018/07/11/on-voit-le-scientifique-intervenir-en-permanence-il-donne-meme-des-idees-de-punitions-aux-gardiens_1665820) et de [Milgram](https://www.newscientist.com/article/mg23731691-000-the-shocking-truth-of-stanley-milgrams-obedience-experiments/), mais ça dépasse mon propos.


### Pour aller plus loin

Si vous voulez en savoir plus sur cette crise qui a déjà quelques années, je vous recommande la série d'articles d'Ed Yong à ce sujet.

{% zotero "Cognition", "yong", "replication" %}

## 2. Notre biais pour les biais

Il existe une palanquée de biais cognitifs répertoriés, car ce n'est pas très compliqué de monter une expérience pour prouver un effet spécifique et l'ajouter à la liste. On se retrouve donc avec une nébuleuse (voir ces listes [ici](https://cognitivebiasindex.com/) ou [là](https://en.wikipedia.org/wiki/List_of_cognitive_biases)) de biais éparses et parfois similaires entre eux. Cela n'aide pas à naviguer dans la littérature, ni à se former un modèle clair de l'esprit humain, ni à analyser un cas particulier :

> Suppose you are studying a person deciding on their retirement savings plans. You want to help them make a better decision (assuming you can define it). So which biases could lead them to err? Will they be loss averse? Present biased? Regret averse? Ambiguity averse? Overconfident? Will they neglect the base rate? Are they hungry? From a predictive point of view, you have a range of countervailing biases that you need to disentangle. From a diagnostic point of view, you have an explanation no matter what decision they make. And if you can explain everything, you explain nothing.
> [Source](https://worksinprogress.co/issue/biases-the-wrong-model/) {lang=en}

!["diagramme montrant des dizaines de biais de manière vaguement organisée"](biasIndex.png)

Plus précisément, cette débauche de biais finit par deux problèmes.
1. Sous-entendre que les gens sont totalement irrationnels
2. Démultiplier les biais sans rien expliquer.

### A.  Les gens sont très intelligents mais juste pressés

(Titre adapté d'une [maxime](https://wiki.c2.com/?AboutFace) d'Alan Cooper à propos des utilisateurs)

Chez de nombreux auteurs et vulgarisateurs, parler des biais est vue une entreprise de démystification : vous vous vous croyez le sommet de l'évolution ? On va vous montrez que vous êtes irrationnel et incapable de résoudre des problèmes de probabilité si basiques que vous pourriez les croiser au quotidien.

!["Couverture du livre Vous n'êtes pas si intelligent"](notSmart.jpg)

Il faut adopter une grille de lecture différente, pas pour sauver notre égo mais parce que sans elle on ne comprend pas que ces biais existent pour une raison : nous permettre de prendre des décisions rapidement et facilement. Ce sont plus des heuristiques que des biais, car la plupart du temps elles remplissent leur but. Nous évoluons dans des contextes où nous cherchons le plus souvent des réponses acceptables plutôt que parfaites, pour agir plutôt  que pour délibérer.

Cela montre la limite de certaines expériences célèbres pensées comme de pures énigmes formelles. Parfois, [reformuler la question](https://en.wikipedia.org/wiki/Conjunction_fallacy#Debiasing) en terme plus parlants augmente le taux de succès. Ou encore [certaines expériences](https://aeon.co/essays/we-are-more-rational-than-those-who-nudge-us#:~:text=Experimental%20subjects%20are%20asked) montrent que les gens transgressent certaines règles logiques tout simplement parce qu'ils suivent un cadre différent, celui [de la conversation](https://en.wikipedia.org/wiki/Cooperative_principle#Maxim_of_relation_(relevance)).

Bref, ces heuristiques font des compromis entre effort mental, vitesse, et exactitude. On peut aller plus loin : [certaines](https://en.wikipedia.org/w/index.php?title=Heuristic_(psychology)#Formal_models_of_heuristics) sont même meilleures si elles limitent à des règles simples et à peu d'informations. Cela parait contre-intuitif, mais prenons un exemple certes limité : supposons qu'on vous demande quel est le meilleur joueur entre Roger Federer et Alexandre Müller. Si vous avez entendu parler du premier et pas du second, c'est probablement qu'il est plus connu, donc meilleur. Si vous connaissez les deux, il faut utiliser un raisonnement plus complexe et incertain.

### B. Un modèle plus général

En cataloguant des biais, on n'explique pas grand chose, à part part décrire des phénomènes locaux et isolés. Plusieurs auteurs tentent de trouver un modèle plus général.

#### Un biais pour les gouverner tous

Kahneman (auteur de *Thinking, fast and slow*) propose que la plupart des biais peuvent être expliqués par un biais plus global : la substitution d'attribut :

> Confronté à une question difficile, les gens répondent souvent une question plus facile à la place, sans réaliser la substitution.

Il y a [trois conditions](https://en.wikipedia.org/w/index.php?title=Heuristic_(psychology)&useskin=vector#Theories) :
1. La vraie question est difficilement accessible
2. Une question sémantiquement liée l'est beaucoup plus
3. Notre raisonnement conscient et délibératif (le fameux [système 2](https://en.wikipedia.org/wiki/Dual_process_theory)) exercice difficilement son rôle de contrôle sur le système 1 (intuitif).

#### Une boite à outils d'heuristiques

Gigerenzer, grand adversaire de Kahneman, trouve ce biais trop flou, car substitution et accessibilité sont difficiles à définir précisément, surtout vu leur importance dans cette théorie. Il est également critique de la dichotomie étanche entre système 1 (forcément inconscient et imparfait) et système 2. Il voit l'esprit comme piochant au besoin dans un nombre limité d'heuristiques formalisables (celles citées plus haut), au sens où on peut les représenter comme des algorithmes de décision.

### Remarque personnelle

Ces deux théories ont chacune leur limites, exactement oppposées. Celle de Kahneman est générale mais floue, à l'inverse celle de Gigerenzer risque de monter en épingle des heuristiques très spécifiques et difficilement généralisable. Il y a l'exemple des sportifs cité plus haut, ou celui de l'athlète [pistant la trajectoire](https://en.wikipedia.org/wiki/Gaze_heuristic) d'une balle en l'accompagnant par son propre mouvement. C'est une [question passionnante](https://psycnet.apa.org/record/2017-08451-001), du sport à l'aviation, mais aussi une vraie tarte à la crème [dans la littérature sur la cognition écologique ou incarnée](https://scholar.google.fr/scholar?cites=12955323164662477226&as_sdt=2005&sciodt=0,5&hl=fr). Les heuristiques ont aussi le risque d'être difficlement formalisables, au-delà des cas les plus simples. Par exemple, comment "computationnaliser" le recours à des heuristiques de conformisme social [citées ici](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1756-8765.2008.01006.x#t2) ?