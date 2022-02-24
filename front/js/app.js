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
    /* Filtering cart to keep only the products of which the id is different from the id of the product that we want to remove OR the products with a different color */
    cart = cart.filter(p => p.id != product.id || p.color != product.color);
    /* Saving the modified cart using the saveCart function */
    saveCart(cart);
    /* Reloading the page after deletion of the product */
}

/* Creating a function to clear the cart when order form is submitted */
function clearCart(){
    /* Retrieving of cart with the getCart function */
    let cart = getCart();
    /* Removing each product in the cart with the removeFromCart function */
    for(let product of cart){
        removeFromCart(product)
    }
}

/* Creating a function to get the total amount of products in the cart */
function getNumberOfProducts(){
    /* Retrieving of cart with the getCart function */
    let cart = getCart();
    /* Defining numberOfProduct and setting value to 0 */
    let numberOfProduct = 0;
    /* Browsing the cart with a for of loop */
    for (let product of cart){
        /* For each product in the cart, adding the product quantity to the total amount of products */
        numberOfProduct += product.quantity;
    }
    /* Returning the total amount of products */
    return numberOfProduct;
}

/* Creating a function to get the total price of cart */
function getTotalPrice(product, quantity){
    /* For each product in cart, adding the product subtotal to the total price of cart */
    totalCartPrice += product.price * quantity
    /* Returning total price of cart */
    return totalCartPrice;
}

/* Creating a function to modify product quantity */
function modifyQuantity(product, quantity){
    /* Retrieving of cart */
    let cart = getCart();
    /* Checking if a product with identical id AND identical color is already in the cart */
    let productFound = cart.find(p => p.id == product.id && p.color == product.color);
    /* If YES, setting the quantity of the product with the new quantity */
    if (productFound != undefined){
        productFound.quantity = quantity;
    }
    /* Saving the modified cart using the saveCart function */
    saveCart(cart);
}

/* Creating a function to modify total price */
function modifyTotalPrice(product, oldQuantity, newQuantity){
    /* If the new quantity set is superior to the old quantity : incrementing and returning the total price */
    if(newQuantity > oldQuantity){
        totalCartPrice += product.price * (newQuantity - oldQuantity);
        return totalCartPrice
    /* If the new quantity set is superior to the old quantity : decrementing and returning the total price */
    }else if(newQuantity < oldQuantity){
        totalCartPrice -= product.price * (oldQuantity - newQuantity);
        return totalCartPrice
    }
}

/********** FORM INPUTS VALIDITY MESSAGE DISPLAY **********/

/* Creating a function to check validity of the text inputs (firstName, LastName, city) and display a message (succes or error) */
function textValidity(input){
    let nameRegExp = /^[a-zéèôöîïûùü' -]{2,50}/gi;
    let test = nameRegExp.test(input.value);
    if(test == true){
        input.nextElementSibling.textContent = "Champ valide";
    }else{
        input.nextElementSibling.textContent = "Vous ne pouvez utiliser que des lettres, espaces, - et ' ";
    }
}

function cityValidity(input){
    let cityRegExp = /^[0-9]{5}[a-zéèôöîïûùü' -]{2,50}$/gi;
    let test = cityRegExp.test(input.value);
    if(test == true){
        input.nextElementSibling.textContent = "Champ valide";
    }else{
        input.nextElementSibling.textContent = "Veuillez respecter le format CODE POSTAL (5 CHIFFRES) suivi du nom de la VILLE. Exemple : 75012 Paris"
    }
}

/* Creating a function to check validity of the text/number (address) inputs and display a message (succes or error) */
function adressValidity(input){
    let adressRegExp = /^[a-z0-9éèôöîïûùü' -]{2,50}/gi;
    let test = adressRegExp.test(input.value);
    if(test == true){
        input.nextElementSibling.textContent = "Champ valide";
    }else{
        input.nextElementSibling.textContent = "Vous ne pouvez utiliser que des chiffres, lettres, espaces, - et ' ";
    }
}

/* Creating a function to check validity of the email input and display a message (succes or error) */
function emailValidity(input){
    let emailRegExp = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z ]+$/gi;
    test = emailRegExp.test(input.value);
    if(test === true){
        input.nextElementSibling.textContent = "Champ valide";
    }else{
        input.nextElementSibling.textContent = "Veuillez saisir une adresse email valide";
    }
}

