Tout les fonctionnalités du blog, même les plus basiques (à compléter)

## Divers
- HTTPS
- Cache busting du JS et du CSS
- RSS
- Plan de site
- Aperçu du contenu quand un lien est posté sur Twitter ("Twitter Cards")


## Pages

- Page 404 (wow !)
- Page d'accueil avec une méthode facile pour ajouter de nouveaux projets
- Page d'archive avec une recherche instantanée dans tout le contenu.
- Post


## Texte

- Insertion auto de guillemets bas et d'espaces fines non-sécables.
- Insertion facile de notes de bas de pages.
- Liens profonds : Dans un article, survoler un inter-titre fait apparaitre un lien. Ce lien fournit une ancre permettant d'ouvrir la page directement à ce titre.


## Média

- Embarquement automatique de contenu Twitter, Youtube... juste avec l'URL
- Gallerie d'images s'ouvrant en popin
- Toutes les images sont charges paresseusement.
- Compression et conversion auto d'images en .webp. Fallback en jpg si le navigateur ne supporte pas le format, géré coté serveur, avec une technique adaptée [de ceci](https://github.com/cdowdy/Nginx-Content-Negotiation/blob/master/nginx.conf)
- Génération auto du balisage pour images responsive et des images correspondantes, au bonnes dimensions.
- Génération auto de la légende d'imge (<figcaption> à partir de l'attribut `title`)
- Génération de ` <figure> ... <figcaption>légende de l'image</figcaption></figure>` avec le markdown suivant : `![](url "légende de l'image")`
