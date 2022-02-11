/* Searching in the document for the element that will contain the products and assigning it in a constant named itemsList */
const itemsList = document.getElementById('items');

/* Connecting to the API with fetch() */
fetch('http://localhost:3000/api/products')
/* If the connection to the API is successfull */
    /* Returning the response in a JSON format */
.then(response => response.json())
    /* Defining API response as Products and setting action to be executed */
.then(products => { 

    /* Browsing the data returned by the API with a for loop */    
    for (let i = 0; i < products.length; i++){
        /* Creating productLink (a) element, setting href attribute and defining it as child of the itemsList element */
        let productLink = document.createElement("a");
        productLink.setAttribute("href", `product.html?id=${products[i]._id}`);
        itemsList.appendChild(productLink);

        /* Creating productArticle (article) element and defining it as child of the productLink element */
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        /* Creating productImg (img) element, setting src and alt attributes and declaring it as child of the productArticle element */
        let productImg = document.createElement("img");
        productImg.setAttribute("src", products[i].imageUrl);
        productImg.setAttribute("alt", products[i].altTxt);
        productArticle.appendChild(productImg);

        /* Creating productName (h3) element, adding the productName class and textual content and declaring it as child of the productArticle element */ 
        let productName = document.createElement("h3");
        productName.classList.add("productName");
        productName.textContent = products[i].name;
        productArticle.appendChild(productName);

        /* Creating productDescription (p) element, adding the productDescription class and textual content and declaring it as child of the productArticle element */
        let productDescription = document.createElement("p");
        productDescription.classList.add("productDescription");
        productDescription.textContent = products[i].description;
        productArticle.appendChild(productDescription);
    }
})
/* If the connection to the API has failed*/
    /* Creating a message to be uploaded in the itemsList element to inform the final users that something went wrong */
.catch((error) => {
    console.log("Le chargement des produits a rencontré un problème." + error);
    let errorMessage = document.createElement('h2');
    errorMessage.textContent = "Nous rencontrons des difficultés techniques et ne pouvons pas vous présenter les articles pour le moment. Nos équipes sont à l'oeuvre pour résoudre ce problème dans les plus brefs délais. Nous vous invitons à réessayer ultérieurement et nous excusons pour la gêne occasionnée.";
    errorMessage.style.textAlign = "center";
    errorMessage.style.color = "red";
    errorMessage.style.backgroundColor = "white";
    errorMessage.style.padding = "15px";
    errorMessage.style.borderRadius = "25px";
    errorMessage.style.border = "2px solid red";
    itemsList.appendChild(errorMessage);
})
