/********** DISPLAYING CART CONTENT ON THE CART PAGE **********/

/* Retrieving of cart with the getCart function and assigning the content into a variable */
let cart = getCart();

/* Searching in the document for the element that will contain the cart details */
const cartList = document.getElementById("cart__items")

/* Browsing the cart with a for of loop */  
for (let product of cart){
    /* For each product, retrieving the id, color and quantity */
    let productId = product.id;
    let productColor = product.color;
    let productQuantity = product.quantity;
    /* Connecting to the API with fetch() to get the product details */
    fetch(`http://localhost:3000/api/products/${productId}`)
    /* Returning the response in a JSON format */
    .then (response => response.json())
    /* Defining API response as productDetails and setting action to be executed for each product of the cart*/
    .then (productDetails => {

        /* Creating the article element, setting attributes, adding the cart__item class and defining it as child of the cartList element */
        let productArticle = document.createElement("article");
        productArticle.classList.add("cart__item");
        productArticle.setAttribute("data-id", productId);
        productArticle.setAttribute("data-color", productColor)
        cartList.appendChild(productArticle);

        /* Creating the productImgContainer element, adding the cart__item__img class and defining it as child of the productArticle element */
        let productImgContainer = document.createElement("div");
        productImgContainer.classList.add("cart__item__img");
        productArticle.appendChild(productImgContainer); 

        /* Creating the productImg element, setting attributes and defining it as child of the productImgContainer element */
        let productImg = document.createElement("img");
        productImg.setAttribute("src", productDetails.imageUrl);
        productImg.setAttribute("alt", productDetails.altTxt);
        productImgContainer.appendChild(productImg);

        /* Creating the productContent element, adding the cart__item__content class and defining it as child of the productArticle element */
        let productContent = document.createElement("div");
        productContent.classList.add("cart__item__content");
        productArticle.appendChild(productContent);

        /* Creating the productContentDescription element, adding the cart__item__content__description class and defining it as child of the productContent element */
        let productContentDescription = document.createElement("div");
        productContentDescription.classList.add("cart__item__content__description");
        productContent.appendChild(productContentDescription);

        /* Creating the productName element, inserting text content and defining it as child of the productContentDescription element */
        let productName = document.createElement("h2");
        productName.textContent = productDetails.name;
        productContentDescription.appendChild(productName);

        /* Creating the poductColorPicked element, inserting color picked by user on the previous step and defining it as child of the productContentDescription element */
        let productColorPicked = document.createElement("p");
        productColorPicked.textContent = productColor;
        productContentDescription.appendChild(productColorPicked);

        /* Creating the productPrice element, inserting value returned by the API, followed by the € symbol using backticks and defining it as child of the productContentDescription element */
        let productPrice = document.createElement("p");
        productPrice.textContent = `${productDetails.price} €`;
        productContentDescription.appendChild(productPrice);

        /* Creating the productContentSettings element, adding the crt__item__content__settings class and defining it as child of the productContent element */
        let productContentSettings = document.createElement("div");
        productContentSettings.classList.add("cart__item__content__settings");
        productContent.appendChild(productContentSettings);

        /* Creating the productQuantitySettings element, adding the cart__item__content__settings__quantity class and defining it as child of the productContentSettings element */
        let productQuantitySettings = document.createElement("div");
        productQuantitySettings.classList.add("cart__item__content__settings__quantity")
        productContentSettings.appendChild(productQuantitySettings);

        /* Creating the productQuantityPickedLabel element, inserting text content and defining it as child of the productQuantitySettings element */
        let productQuantityPickedLabel = document.createElement("p");
        productQuantityPickedLabel.textContent = "Quantité : ";
        productQuantitySettings.appendChild(productQuantityPickedLabel);

        /* Creating the productQuantityPicked element, adding attributes, inserting quantity picked by user on the previous step and inserting it as child of the productQuantitySettings element */
        let productQuantityPicked = document.createElement("input");
        productQuantityPicked.setAttribute("type", "number");
        productQuantityPicked.setAttribute("name", "itemQuantity");
        productQuantityPicked.setAttribute("min", 1);
        productQuantityPicked.setAttribute("max", 100);
        productQuantityPicked.setAttribute("value", productQuantity)
        productQuantityPicked.classList.add("itemQuantity")
        productQuantitySettings.appendChild(productQuantityPicked);

        /* Creating the productDelete element, adding the cart__item__content__settings__delete class and defining it as child of the productContentSettings element */
        let productDelete = document.createElement("div");
        productDelete.classList.add("cart__item__content__settings__delete")
        productContentSettings.appendChild(productDelete);

        /* Creating the productDeleteButton element, adding the deleteItem class, inserting text content and defining it as child of the productDelete element */
        let productDeleteButton = document.createElement("p");
        productDeleteButton.classList.add("deleteItem");
        productDeleteButton.textContent = "Supprimer";
        productDelete.appendChild(productDeleteButton);
    })
    /* If the connection to the API has failed or is interrupted, creating a message to be uploaded for each product to inform the final users that something went wrong */
    .catch((error) => {
        console.log("Erreur dans le chargement du panier" + error);
        let cartErrorMessage = document.createElement("h2");
        cartErrorMessage.textContent = "L'article que vous avez sélectionné semble inaccessible pour le moment.";
        cartErrorMessage.style.textAlign = "center";
        cartErrorMessage.style.color = "red";
        cartErrorMessage.style.backgroundColor = "white";
        cartErrorMessage.style.padding = "15px";
        cartErrorMessage.style.borderRadius = "25px";
        cartErrorMessage.style.border = "2px solid red";
        cartList.appendChild(cartErrorMessage);
    })
}
