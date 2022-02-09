/* Je cherche dans le document l'élément qui va recevoir mes produits et l'assigne dans une constante nommée itemsList */
const itemsList = document.getElementById('items');

/* Je me connecte à l'API grâce à fetch() */
fetch('http://localhost:3000/api/products')
.then(response => response.json())
.then(products => {

    /* Grâce à une boucle for, je parcours les données renvoyées par l'API */    
    for (i = 0; i < products.length; i++){
        /* Je crée mon élément productLink (a), je renseigne son attribut href et le déclare enfant de mon élément itemsList */
        let productLink = document.createElement("a");
        productLink.setAttribute("href", "product.html?id="+products[i]._id);
        itemsList.appendChild(productLink);

        /* Je crée mon élément productArticle (article) et le déclare enfant de mon élément productLink */
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        /* Je crée mon élément productImg (img), lui assigne ses attributs src et alt et le déclare enfant de mon élément productArticle */
        let productImg = document.createElement("img");
        productImg.setAttribute("src", products[i].imageUrl);
        productImg.setAttribute("alt", products[i].altTxt);
        productArticle.appendChild(productImg);

        /* Je crée mon élément productName (h3), lui ajoute la classe productName, son contenu textuel et le déclare enfant de mon élément productArticle */
        let productName = document.createElement("h3");
        productName.classList.add("productName");
        productName.textContent = products[i].name;
        productArticle.appendChild(productName);

        /* Je crée mon élément productDescription (p), lui ajoute la classe productDescription, son contenu textuel et le déclare enfant de mon élément productArticle */
        let productDescription = document.createElement("p");
        productDescription.classList.add("productDescription");
        productDescription.textContent = products[i].description;
        productArticle.appendChild(productDescription);
    }
})