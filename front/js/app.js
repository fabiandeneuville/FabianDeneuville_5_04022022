/********** CART MANAGEMENT **********/

/* Creating a function to save the cart in the localStorage in a JSON format */
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Creating a function to get the cart from the localStorage */
function getCart(){
    let cart = localStorage.getItem("cart");
    /* If the localStorage is empty, returning an empty array */
    if(cart == null){
        return [];
    /* If the localStorage is not empty, returning the cart in the original format */
    }else{
        return JSON.parse(cart);
    }
}

/* Creating a function to add products to the cart */
function addToCart(product){
    /* Retrieving of cart with the getCart function */
    let cart = getCart();
    /* Checking if a product with identical id AND identical color is already in the cart */
    let productFound = cart.find(productFound => productFound.id === product.id && productFound.color === product.color);
    /* If YES, adjusting product quantity by adding the new quantity declared to it */
    if(productFound != undefined){
        productFound.quantity += product.quantity;
    /* If NOT, pushing the new product in the cart */
    }else{
        cart.push(product);
    }
    /* Saving the modified cart using the saveCart function */
    saveCart(cart);
}

/* Creating a function to remove products from cart */
function removeFromCart(product){
    /* Retrieving of cart with the getCart function */
    let cart = getCart();
    /* Filtering cart to keep only the products of which the id is different from the id of the product that we want to remove */
    cart = cart.filter(p => p.id != product.id);
    /* Desplaying an alert to inform the user that the product has been removed */
    alert("L'article a été retiré de votre panier");
    /* Saving the modified cart using the saveCart function */
    saveCart(cart);
    /* Reloading the page after deletion of the product */
    document.location.reload();
}