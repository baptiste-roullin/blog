---
title: "Un prototype en plein écran et sur deux moniteurs"
date: 2016-02-18
tags:
  - "prototypage"

---

Dans les systèmes d'information permettant de suivre une situation complexe et changeante (systèmes de contrôle, de régulation, de communication, etc.), un opérateur doit consulter beaucoup d'informations à la fois. Pour ça, il a souvent plusieurs écrans et une même application peut utiliser deux écrans. Par exemple, j'ai travaillé récemment sur un système où l'écran principal était occupé par un tableau de bord et l'écran secondaire par un outil cartographique. Le tableau de bord permettait d'accéder à d'autres vues (popups, onglets, etc.). Il y avait également des influences possibles d'un écran à l'autre, par exemple sélectionner un élément dans le tableau de bord permet de le localiser sur la carte.

Supposons qu'on veuille tester l'utilisabilité du dispositif en permettant à l'utilisateur de manipuler l'IHM et les deux écrans. L'outil de prototypage utilisé génère probablement des maquettes en HTML et le plein écran des navigateurs est prévu pour un seul moniteur. Un gros projet industriel a les moyens de développer un vrai prototype fonctionnel, mais supposons que soit impossible. Voici une alternative pour Windows 8 et Firefox.

## Configuration des fenêtres

Pour avoir un plein écran, il faut masquer les barre d'onglets, d'outil, d'adresse... tout ce que Mozilla appelle le « [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) »). Pour ça, l'extension [stylish](https://addons.mozilla.org/en-US/firefox/addon/stylish/) permet de modifier le CSS (c'est-à-dire en gros le style) de n'importe quel site, et même de Firefox lui-même.

- Installez-la et redémarrez Firefox ;
- Pressez les touches Ctrl+Shift+A ;
- Allez dans l'onglet de Stylish et cliquez sur "Créer un nouveau style".

![2015-12-29_15h40_30](/assets/images/2015-12-29_15h40_30.png)

- Dans la nouvelle fenêtre, recopiez le code suivant et enregistrer.

```
@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);
#navigator-toolbox {
    display:none !important;
}
```

Voici également le code si vous voulez cacher les ascenseurs. :

```
#content browser {
    margin-right: -14px !important;
    overflow-y: scroll;
    overflow-x: hidden;
}
```

Le résultat ressemble à ça :

![2015-12-29_15h42_12](/assets/images/2015-12-29_15h42_12.png)

Quand vous voudrez désactivez la personnalisation, réappuyez sur Ctrl+Shift+A et cliquez sur "Désactiver".

Ensuite, passez Firefox en mode fenêtré et ajustez la taille de la fenêtre aux dimensions des deux écrans. Selon la manière dont le système est censé être utilisé, il faut ou non masquer la barre des tâches de Windows.

## Configuration des maquettes

Pour Axure, la solution la plus simple (OK tout est relatif) est de créer un panneau dynamique pour chaque écran et de les placer dans la même page. Chaque vue est ainsi un sous-panneau. La maquette sera longue à charger, mais ensuite la navigation sera fluide. Cela évite de dupliquer du contenu et permet de garder fixe le contenu d'un écran pendant un changement de vue dans l'autre écran.

## Configuration des écrans

Dans Windows, configurez la position des deux écrans (Bureau > Clic droit > Résolution de l'écran) en fonction de la manière dont l'utilisateur sera réellement installé à son poste. Quelque chose comme ça :

![2015-12-29_09h59_17](/assets/images/2015-12-29_09h59_17.png)
