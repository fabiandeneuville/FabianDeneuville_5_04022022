function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart(){
    let cart = localStorage.getItem("cart");
    if(cart == null){
        return [];
    }else{
        return JSON.parse(cart);
    }
}

function addToCart(product){
    let cart = getCart();
    let productFound = cart.find(productFound => productFound.id == product.id && productFound.color == product.color);
    if(productFound != undefined){
        productFound.quantity += product.quantity;
    }else{
        cart.push(product);
    }
    saveCart(cart);
}