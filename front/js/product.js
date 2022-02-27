/********** DESPLAYING PRODUCT ELEMENTS ON THE PRODUCT PAGE **********/

/* Retrieving of the elements that will contain the product details (name, description, price, image, color options ...) */
const itemPresentation = document.querySelector(".item");
const itemContent = document.querySelector("article");
const itemImgContainer = document.querySelector(".item__img");
const itemName = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColor = document.getElementById("colors");

/* Exctracting product Id from document URL and testing if the extraction succeded */
let params = new URL(document.location).searchParams;
let productId = params.get("id");
console.log(
  `Récupération de l'id du produit ayant enregistré le clic sur la page d'accueil : ${productId}`
);

/* Sending HTTP request to the API with fetch() */
fetch(`http://localhost:3000/api/products/${productId}`)
  /* If the request is successfull */
  /* Returning the response in a JSON format */
  .then((response) => response.json())
  /* Defining API response as productDetails and setting action to be executed */
  .then((productDetails) => {
    /* Creating productImg (img) element, setting src and alt attributes and declaring it as child of the itemImgContainer element*/
    let productImg = document.createElement("img");
    productImg.setAttribute("src", productDetails.imageUrl);
    productImg.setAttribute("alt", productDetails.altTxt);
    itemImgContainer.appendChild(productImg);

    /* Defining productName and setting it as content of the itemName element (#title) */
    let productName = productDetails.name;
    itemName.textContent = productName;

    /* Defining productPrice and setting it as content of the itemPrice element (#price) */
    let productPrice = productDetails.price;
    itemPrice.textContent = productPrice;

    /* Defining productDescription and setting it as content of the itemDescription element (#description) */
    let productDescription = productDetails.description;
    itemDescription.textContent = productDescription;

    /* Defining productColors, browsing the array returned by the API to dynamically insert color options (colorOption) in the itemColor (.color) element */
    let productColors = productDetails.colors;
    for (i = 0; i < productColors.length; i++) {
      let colorOption = document.createElement("option");
      colorOption.setAttribute("value", productColors[i]);
      colorOption.innerText = productColors[i];
      itemColor.appendChild(colorOption);
    }
  })
  /* If the request has failed */
  /* Creating a message to be uploaded in the item element to inform the user that something went wrong */
  .catch((error) => {
    console.log(
      "Il y a eu une erreur dans le chargement du produit sur le site." + error
    );
    itemPresentation.removeChild(itemContent);
    let productErrorMessage = document.createElement("h2");
    productErrorMessage.textContent =
      "Nous rencontrons des difficultés techniques pour afficher l'article que vous avez sélectionné. Nos équipes sont à l'oeuvre pour résoudre ce problème dans les plus brefs délais. Nous vous invitons à réessayer ultérieurement et nous excusons pour la gêne occasionnée.";
    productErrorMessage.style.textAlign = "center";
    productErrorMessage.style.padding = "15px";
    itemPresentation.appendChild(productErrorMessage);
  });

/********** ADDING PRODUCT TO THE CART **********/

/* Retrieving of the addToCart button and assigning it in a constant named addToCartBtn */
const addToCartBtn = document.getElementById("addToCart");

/* Retrieving of the #quantity and #colors elements and assigining them into variables*/
let quantity = document.getElementById("quantity");
let color = document.getElementById("colors");

/* Listening to click event on the addToCartBtn and setting action to be executed */
addToCartBtn.addEventListener("click", () => {
  /* Setting colorPicked and quantityPicked values */
  let colorPicked = color.value;
  let quantityPicked = Number(quantity.value);
  /* Retrieving of product name */
  let productName = document.getElementById("title").textContent;
  /* Creating product object to be uploaded into cart */
  let product = {
    id: productId,
    color: colorPicked,
    quantity: quantityPicked,
    name: productName,
  };
  /* Checking if a color and a quantity are picked :
    If YES : adding product to cart calling the addToCart function
    IF NOT : displaying an alert */
  if (color.value !== "" && quantity.value > 0 && quantity.value <= 100) {
    addToCart(product);
    alert(
      "Votre choix a bien été effectué et votre article a été ajouté à votre panier."
    );
  } else {
    /* If a color or the quantity is not picked : displaying an error message as alert */
    alert(
      "Veuillez sélectionner une couleur et indiquer la quantité souhaitée. Attention, la quantité maximale est fixée à 100 articles."
    );
  }
});
