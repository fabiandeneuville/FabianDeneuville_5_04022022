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

let cart = getCart();
console.log(cart);

const cartList = document.getElementById("cart__items")

for (let product of cart){
    let productId = product.id;
    let productColor = product.color;
    let productQuantity = product.quantity;
    fetch(`http://localhost:3000/api/products/${productId}`)
    .then (response => response.json())
    .then (productDetails => {
        console.log(productDetails.price);
        let productArticle = document.createElement("article");
        productArticle.classList.add("cart__item");
        productArticle.setAttribute("data-id", productId);
        productArticle.setAttribute("data-color", productColor)
        cartList.appendChild(productArticle);

        let productImgContainer = document.createElement("div");
        productImgContainer.classList.add("cart__item__img");
        productArticle.appendChild(productImgContainer); 

        let productImg = document.createElement("img");
        productImg.setAttribute("src", productDetails.imageUrl);
        productImg.setAttribute("alt", productDetails.altTxt);
        productImgContainer.appendChild(productImg);

        let productContent = document.createElement("div");
        productContent.classList.add("cart__item__content");
        productArticle.appendChild(productContent);

        let productContentDescription = document.createElement("div");
        productContentDescription.classList.add("cart__item__content__description");
        productContent.appendChild(productContentDescription);

        let productName = document.createElement("h2");
        productName.textContent = productDetails.name;
        productContentDescription.appendChild(productName);

        let productColorPicked = document.createElement("p");
        productColorPicked.textContent = productColor;
        productContentDescription.appendChild(productColorPicked);

        let productPrice = document.createElement("p");
        productPrice.textContent = `${productDetails.price} €`;
        productContentDescription.appendChild(productPrice);

        let productContentSettings = document.createElement("div");
        productContentSettings.classList.add("cart__item__content__settings");
        productContent.appendChild(productContentSettings);

        let productQuantitySettings = document.createElement("div");
        productQuantitySettings.classList.add("cart__item__content__settings__quantity")
        productContentSettings.appendChild(productQuantitySettings);

        let productQuantityPickedLabel = document.createElement("p");
        productQuantityPickedLabel.textContent = "Quantité : ";
        productQuantitySettings.appendChild(productQuantityPickedLabel);

        let productQuantityPicked = document.createElement("input");
        productQuantityPicked.setAttribute("type", "number");
        productQuantityPicked.setAttribute("name", "itemQuantity");
        productQuantityPicked.setAttribute("min", 1);
        productQuantityPicked.setAttribute("max", 100);
        productQuantityPicked.setAttribute("value", productQuantity)
        productQuantityPicked.classList.add("itemQuantity")
        productQuantitySettings.appendChild(productQuantityPicked);

        let productDelete = document.createElement("div");
        productDelete.classList.add("cart__item__content__settings__delete")
        productContentSettings.appendChild(productDelete);

        let productDeleteButton = document.createElement("p");
        productDeleteButton.classList.add("deleteItem");
        productDeleteButton.textContent = "Supprimer";
        productDelete.appendChild(productDeleteButton);
    })
}

