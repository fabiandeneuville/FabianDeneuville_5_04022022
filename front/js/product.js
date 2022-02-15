/********** DESPLAYING PRODUCT ELEMENTS ON THE PRODUCT PAGE **********/

/* Searching in the document for the elements that will contain the product details (name, description, price, image, color options ...) */
const itemPresentation = document.querySelector(".item")
const itemContent = document.querySelector("article");
const itemImgContainer = document.querySelector(".item__img");
const itemName = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColor = document.getElementById("colors")

/* Declaring variables to be used later outside of the fetch action scope */
let productImg, productName, productPrice, productDescription;

/* Exctracting product Id from document URL */
let params = (new URL(document.location)).searchParams;
let productId = params.get('id');
/* Testing if the extraction succeded */
console.log(`Récupération de l'id du produit ayant enregistré le clic sur la page d'accueil : ${productId}`);

/* Connecting to the API with fetch()*/
fetch(`http://localhost:3000/api/products/${productId}`)
/* If the connection to the API is successfull */
    /* Returning the response in a JSON format */
.then (response => response.json())
    /* Defining API response as productDetails and setting action to be executed */
.then(productDetails => {
    /* creating productImg (img) element, setting src and alt attributes and declaring it as child of the itemImgContainer element*/
    productImg = document.createElement("img");
    productImg.setAttribute("src", productDetails.imageUrl);
    productImg.setAttribute("alt", productDetails.altTxt);
    itemImgContainer.appendChild(productImg);

    /* Defining productName and setting it as content of the itemName element (#title) */
    productName = productDetails.name;
    itemName.textContent = productName;

    /* Defining productPrice and setting it as content of the itemPrice element (#price) */
    productPrice = productDetails.price;
    itemPrice.textContent = productPrice;

    /* Defining productDescription and setting it as content of the itemDescription element (#description) */
    productDescription = productDetails.description;
    itemDescription.textContent = productDescription;

    /* Defining productColors, browsing the array returned by the API to dynamically insert color options (colorOption) in the itemColor (.color) element */ 
    productColors = productDetails.colors;
    for(i = 0; i < productColors.length; i++){
        let colorOption = document.createElement("option");
        colorOption.setAttribute("value", productColors[i]);
        colorOption.innerText = productColors[i];
        itemColor.appendChild(colorOption);
    }
})
/* If the connection to the API has failed or is interrupted */
    /* Creating a message to be uploaded in the item element to inform the final users that something went wrong */
.catch((error) => {
    console.log("Il y a eu une erreur dans le chargement du produit sur le site." + error)
    itemPresentation.removeChild(itemContent);
    let productErrorMessage = document.createElement("h2");
    productErrorMessage.textContent = "Nous rencontrons des difficultés techniques pour afficher l'article que vous avez sélectionné. Nos équipes sont à l'oeuvre pour résoudre ce problème dans les plus brefs délais. Nous vous invitons à réessayer ultérieurement et nous excusons pour la gêne occasionnée.";
    productErrorMessage.style.textAlign = "center";
    productErrorMessage.style.color = "red";
    productErrorMessage.style.backgroundColor = "white";
    productErrorMessage.style.padding = "15px";
    productErrorMessage.style.borderRadius = "25px";
    productErrorMessage.style.border = "2px solid red";
    itemPresentation.appendChild(productErrorMessage);
})



/********** SETTINGS OF THE ADD TO CART ACTION *********/

/* Defining cart as an array */
let cart = [];

/* Searching in the document for the addToCart button and assigning it in a constant named addToCartBtn */
const addToCartBtn = document.getElementById("addToCart");

/* Selection of the #quantity and #colors elements and assigining them into variables*/
let quantity = document.getElementById("quantity");
let color = document.getElementById("colors");

/* Listening to click event on the addToCartBtn and setting action to be executed */
addToCartBtn.addEventListener("click", function addToCart(){
    /* Setting colorPicked and quantityPicked values */
    let colorPicked = (color.value);
    let quantityPicked = Number(quantity.value);
    /* If a color is picked and if a quantity is picked : creating an orderProduct object, pushing it into cart and displaying a succes message as alert */
    if (color.value !== "" && quantity.value > 0 && quantity.value <= 100){
        let orderProduct = {
            id : productId,
            color : colorPicked,
            quantity : quantityPicked
            }
        cart.push(orderProduct);
        alert("Votre choix a bien été effectué et votre article a été ajouté à votre panier.")
    } else {
    /* If a color or the quantity is not picked : displaying an error message as alert */
        alert("Veuillez sélectionner une couleur et indiquer la quantité souhaitée. Attention, la quantité maximale est fixée à 100 articles.");
    }
    console.log(cart);
});
