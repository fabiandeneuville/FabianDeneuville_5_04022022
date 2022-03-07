# Kanap #

This is the front end and back end server for Project 5 of the Web Developer path.

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

# P5 – CONSTRUCTION D'UN SITE E-COMMERCE EN JAVASCRIPT #

### CONTEXTE ###

La société KANAP, marque de canapés qui ne dispose pour l’heure que d’une boutique physique, souhaite le développement d’un site e-commerce pour vendre ses produits sur Internet.

Les 4 pages statiques ont déjà été mises en place (HTML et CSS)

L’API a déjà été développée

Notre mission consiste en : 

- L’intégration dynamique des éléments de l’API

- Le codage du parcours client, depuis la page de résultat jusqu’à la validation du panier

### ARCHITECTURE GÉNÉRALE ###

Le site web se compose de 4 pages :

- Une page d’accueil présentant l’ensemble des produits disponibles

- Une page produit qui présente les détails du produit sélectionné en page d’accueil et permet l’ajout du produit au panier avec sélection d’une quantité et d’une couleur

- Une page panier qui présente les produits présents dans le panier, la quantité et le prix total du panier et un formulaire permettant de passer la commande. La quantité de chaque produit peut par ailleurs être modifiée et les produits peuvent être retirés du panier directement sur la page panier

- Une page de confirmation qui indique à l’utilisateur son numéro de commande

### CONTRAINTES TECHNIQUES ###

- Aucun Framework JS ne doit être utilisé

- Le code doit être correctement indenté et commenté pour faciliter sa maintenance

- Le prix des articles ne doit pas être stocké dans le Local Storage

- Les données saisies dans le formulaire de contact doivent être validées avant envoi

### PRESENTATION DES DIFFÉRENTS FICHIERS ###

- Un fichier script.js pour l’insertion des articles de l’API sur la page d’accueil

- Un fichier product.js pour la présentation des détails du produit

- Un fichier app.js pour l’affichage des détails du panier 

- Un fichier cart.js pour la gestion du panier (stockage, ajout, suppression, modification d’une quantité) et la validation du formulaire

- Un fichier confirmation.js pour la confirmation de la commande et la fourniture du numéro de commande à l’utilisateur

### CONCEPTS ET TECHNIQUES JS MIS EN PRATIQUES ###

- Récupération des données de l’API avec fetch() 

- Insertion et modification des éléments du DOM

- Utilisation d’URLSearchParams.get() pour récupérer l’id du produit cliqué en page d’accueil

- Utilisation du Local Storage pour gérer l’accès au panier sur plusieurs pages

- Validation des données du formulaire à l’aide de regex 

- Envoi des données à l’API avec fetch() – méthode POST

### TESTS ###

Voir plan de test d’acceptation : plan_test.pdf
