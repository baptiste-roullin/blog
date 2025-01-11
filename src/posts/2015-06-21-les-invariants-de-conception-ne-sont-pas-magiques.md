---
title: "Statistiquement les gens sont tous différents et il y a beaucoup de différences différentes"
date: 2015-06-21
tags:
  - "mobile"
  - "objets"
  - "utilisateurs"
  - "statistiques"

---

![Tiré de La Mesure de l'homme, par Henry Dreyfuss (un des fondateurs de l'ergonomie scientifique " ](/img/hand-dimensions.png "Tiré de _La Mesure de l'homme_ de Henry Dreyfuss, un des fondateurs de l'ergonomie scientifique")

L'honorable Raphaël « iErgo » Yharrassarry aime à rappeler que la conception est encadrée par certains invariants :

> La taille d’un téléphone est et sera toujours conditionnée par la distance entre l’oreille et la bouche, ainsi que par la taille de la main et la taille du bout des doigts pour les touches. ([Source](http://blocnotes.iergo.fr/articles/innovation-et-invariant/))

C'est éminemment vrai, au sens qu'avant de concevoir un service ou un objet, il y a des valeurs relativement stables, notamment physiologiques et anatomiques, qu'il faut connaitre et prendre en compte. Il faut pourtant faire attention : ces invariants ne sont que des guides. Il n'y a pas de critère unique et magique.

## Il n'y a pas d'homme moyen

Reprenons l'exemple du téléphone : quelle dimension doit-il avoir pour être utilisable ? On peut prendre pour cible la taille moyenne des mains de notre population cible, mais c'est trop approximatif. Une même moyenne peut cacher des distributions très différentes, comme dans ce graphique.

![Moyenne identique, écart-type très différent](/img/Comparison_standard_deviations.png " Moyenne identique, écart-type très différent")

Pour une même moyenne, les gens peuvent avoir des mains très semblables ou au contraire dissemblables. Sans donnée plus fine, on ne peut pas savoir quelle proportion de gens pourront correctement utiliser le téléphone.

Pour concevoir un peu moins au pif, on utilise les centiles (ou « percentiles »). Cela consiste à ordonner les mesures dont on dispose et à les répartir en cent paquets comprenant chacun le même nombre de mesures. Cela donne une meilleure idée de la distribution des données et permet aussi de définir des seuils. Par exemple, si j'ai mesuré cent mains, le premier centile marque le seuil en deçà duquel se trouvent les dix mains les plus petites.

En anthropométrie, on présente souvent seulement le 5e, le 50e (équivalent à la médiane) et le 95e centile. Voici par exemple la longueur de la main des britanniques masculins :

- 5e centile : 174 mm
- 50e centile : 184 mm
- 95e centile : 207 mm

Par choix, on considère que les mesures en deçà du 5e et au-delà du 95e centile sont des extrêmes et peuvent être ignorés. Il reste seulement ces trois mesures à prendre en compte : est-ce que le téléphone aura une bonne prise pour ces trois tailles de main ?

## Quelle mesure choisir ?

Compliquons encore les choses : on a fait comme si seule la longueur de la main importait, mais il y a d'autres mesures pertinentes. La source dont j'ai tiré la longueur de la main fournit en fait six tailles :

<table border="1"><caption>Données anthropométriques d'individus « valides » en millimètres (<a href="http://usability.gtri.gatech.edu/eou_info/hand_anthro.php">Source</a>)</caption><tbody><tr><th scope="col">Dimension</th><th scope="col">Genre</th><th scope="col">5<sup>e</sup> centile</th><th scope="col">50<sup>e</sup> centile</th><th scope="col">95<sup>e</sup> centile</th></tr><tr><th rowspan="2" scope="row">Longueur de la main</th><th scope="row">Masc.</th><td>173-175</td><td>178-189</td><td>205-209</td></tr><tr><th scope="row">Fém.</th><td>159-160</td><td>167-174</td><td>189-191</td></tr><tr><th rowspan="2" scope="row">Longueur de la paume</th><th scope="row">Masc.</th><td>98</td><td>107</td><td>116</td></tr><tr><th scope="row">Fém.</th><td>89</td><td>97</td><td>105</td></tr><tr><th rowspan="2" scope="row">Longueur du pouce</th><th scope="row">Masc.</th><td>44</td><td>51</td><td>58</td></tr><tr><th scope="row">Fém.</th><td>40</td><td>47</td><td>53</td></tr><tr><th rowspan="2" scope="row">Largeur du pouce</th><th scope="row">Masc.</th><td>11-12</td><td>23</td><td>26-27</td></tr><tr><th scope="row">Fém.</th><td>10-14</td><td>20-21</td><td>24</td></tr><tr><th rowspan="2" scope="row">Longueur de l'index</th><th scope="row">Masc.</th><td>64</td><td>72</td><td>79</td></tr><tr><th scope="row">Fém.</th><td>60</td><td>67</td><td>74</td></tr><tr><th rowspan="2" scope="row">Largeur de la main</th><th scope="row">Masc.</th><td>78</td><td>87</td><td>95</td></tr><tr><th scope="row">Fém.</th><td>69</td><td>76</td><td>83-85</td></tr></tbody></table>

Ces mesures ne sont pas forcément parfaitement corrélées entre elles. Pour schématiser, des mains de bucherons et de pianistes sont longues mais pas de la même manière. Résultat : même si le téléphone couvre 95% des utilisateurs selon une mesure, il peut en exclure d'autres selon d'autres mesures. Plus on ajoute de critères, plus on risque d'exclure de gens. C'est ce qui est arrivé aux chaises ergonomiques d'Herman-Miller. Dans un [article passionnant](http://www.hermanmiller.com/research/solution-essays/anthropometrics-of-fit.html), ils expliquent qu'en croisant sept mesures, leur chaise pouvait être inconfortable pour un tiers des personnes selon au moins une de ces mesures.

![ant](/img/se_the_anthropometrics_of_fig1.jpg)

EDIT : dans les années 50, l'armée américaine a découvert le même problème [pour les cockpits d'avions](https://www.thestar.com/news/insight/2016/01/16/when-us-air-force-discovered-the-flaw-of-averages.html) : « _Out of 4,063 pilots, not a single airman fit within the average range on all 10 dimension_s ».

## Quel principe de conception ?

Il y a des techniques statistiques pour extraire les variables pertinentes d'un ensemble de corrélations, mais c'est hors de portée de cet article. Imaginons qu'une technique de ce genre nous dise que retenir trois des six variables permette de couvrir du 6e au 97e. Ça ne nous dit pas toujours pas quoi faire. Il y a trois axes de conception possibles :

Première solution : décliner le produit **en plusieurs tailles** afin de couvrir la plus grande population possible. C'est la solution retenue pour les chaises sus-citées (trois tailles) ou d'Apple pour leur montre (deux tailles).

Deuxième solution : rendre le produit **ajustable**, lors de l'installation ou de l'utilisation. Par exemple on peut changer la hauteur, l'avancement… d'un siège de voiture. Ce serait compliqué pour un téléphone, mais on peut citer le Galaxy Note 3, doté d'un mode assez curieux permettant réduire la surface utile de l'image d'un geste (cliquez pour arrêter l'animation) :

<figure>
<img alt="" id="#freezegif" src="/img/note-3-shrink-15fps.gif">
	<figcaption>Un geste de va-et-vient réduit la taille de l'écran. (Source : Android Central </figcaption>
</figure>


Enfin, on peut essayer de trouver une **dimension unique** qui satisfasse le maximum de monde. Par exemple on peut placer une borne interactive à hauteur de bras d'une personne de petite taille, dans l'idée qu'il est plus facile pour une grande personne de se baisser que le contraire.

## Et l'usage au fait

Il y a une dernière complication : au-delà des critères physiques, les usages d'un téléphone sont variables, y compris pour une même personne.

D'abord, il y a plusieurs manières de tenir son appareil. Au minimum on peut distinguer la prise à une main (une moitié des usages observés), la prise en berceau (plus de 15%) et la prise à deux mains (un petit tiers). Je tire ces chiffres de cette [passionnante présentation](http://fr.slideshare.net/orsoral/comportements-mobiles-vrais-challenges-ides-reues) de Cornelia Laros à Paris Web, qui contient bien d'autres données (portrait vs paysage, changements de prise en main, influence du contexte, etc.).

![Prises en main du téléphone](/img/Sans-titre.png)

Ensuite, les gens sont prêts à différents compromis selon des facteurs externes à l'objet lui-même. Citons :

- Les conventions sociales. Selon l'époque et le groupe social, différents styles seront plus ou moins acceptés : « t'as l'air con avec ton ardoise contre l'oreille ».
- Le type de tâche le plus fréquent. Un contexte d'utilisation avec une pression temporelle forte et un haut facteur de distraction (par exemple : vérifier l'heure de son départ dans une gare) n'appelle pas le même genre de téléphone qu'un contexte de distraction pépouze (type zapper sur Youtube dans son canapé).
- Les appareils à disposition. Par exemple, il y a dans l'Apple Watch la promesse d'avoir à sortir moins souvent son téléphone de la poche et d'une complémentarité entre les gros écrans des iPhone 6 et l'utilisation ponctuelle de la montre.
- Les attentes des utilisateurs. Je pense aux profils experts qui préfèrent un téléphone tout simple, puisqu'ils sont de toute façon plus à l'aise avec un ordinateur de bureau pour la moindre tâche complexe.

Rétrospectivement, l'exemple de l'iPhone est intéressant. Sur le seul critère de la prise en main, les premiers modèles étaient [indéniablement](http://dcurt.is/3-point-5-inches) supérieurs aux phablets d'Android. Du coup, [bien des experts](http://www.marco.org/2011/10/08/iphone-screen-size) (et [Steve Jobs lui-même](http://www.engadget.com/2010/07/16/jobs-no-ones-going-to-buy-a-big-phone/)) étaient persuadés qu'Apple n'avait aucune raison de sortir un plus gros iPhone. Le contraire a fini par se produire et s'on est aperçu qu'un grand écran c'était quand même bien pratique.

Conclusion : ne jamais raisonner sur un critère isolé. Tout est affaire de compromis, il faut juste trouver les bons.

## Pour aller plus loin

- [Une compilation de ressources sur les usages et la conception mobile](http://4ourth.com/Touch/)
- [Les slides de la présentation de Cornelia Laros](http://fr.slideshare.net/orsoral/comportements-mobiles-vrais-challenges-ides-reues)

