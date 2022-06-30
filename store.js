if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let buttonRemove = document.querySelectorAll('.btn-remove');
   for(let i = 0; i < buttonRemove.length; i++) {
         let button = buttonRemove[i];
        button.addEventListener('click', removeCartItem);
    }

        let quantityInputs = document.querySelectorAll('.quantity-input');
        for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    let addToCartButtons = document.querySelectorAll('.cart-btn');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.querySelectorAll('.btn-checkout')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    alert('Thank you for your purchase');
    let cartItems = document.querySelectorAll('.cart-items')[0];

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

 function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement;
    let title = shopItem.querySelectorAll('.shop-item')[0].innerText;
    let price = shopItem.querySelectorAll('.price')[0].innerText;
    let imageSrc = shopItem.querySelectorAll('.image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {

    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }

        let cartRowContents = `<div class="items">
                <img class="item-image" src="${imageSrc}" width="100" height="100">
                <span class="item-title">${title}</span>
                <span class="item-price items-column">${price}</span>

            <div class="item-quantity">
                <input class="quantity-input" type="number" value="1">
            </div>
                <button class="btn-remove" type="button"> <i class="fa fa-trash"></i></button>
                </div>`;
    
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem);

    cartRow.getElementsByClassName('quantity-input')[0].addEventListener('change', quantityChanged);
}


function updateCartTotal() {
    let cartItemContainer = document.querySelectorAll('.cart-items')[0];
    let cartRows = cartItemContainer.querySelectorAll('.cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('item-price')[0];
        let quantityElement = cartRow.getElementsByClassName('quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total')[0].innerText = '$' + total;
 }

