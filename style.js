let cart = [];

function incrementQuantity(item) {
    let existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ item, quantity: 1 });
    }
    updateCart();
}

function decrementQuantity(item) {
    const cartItem = cart.find(cartItem => cartItem.item === item);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            // Remove the item from the cart if the quantity becomes 0
            cart = cart.filter(cartItem => cartItem.item !== item);
        }
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.querySelector('.checkout-items');
    cartItems.innerHTML = '';

    cartItems.innerHTML += `
            <div>
                <p>Order Details</p>
            </div>
    `;

    cart.forEach(item => {
        let itemDisplay = item.item;
        itemDisplay += ` x ${item.quantity}`;
        cartItems.innerHTML += `
            <div class="checkout-item">
                <div>${itemDisplay}</div>
            </div>
        `;
    });

    // Update quantity spans based on item name
    const quantitySpans = document.querySelectorAll('.quantity');
    quantitySpans.forEach(span => {
        const itemName = span.parentElement.parentElement.parentElement.querySelector('.bs-card-title').textContent;
        const cartItem = cart.find(item => item.item === itemName);
        if (cartItem) {
            span.textContent = cartItem.quantity;
        } else {
            span.textContent = '0'; // Set to 0 if item not found in cart
        }
    });
}




function validateAndOrder() {
    const businessNameInput = document.getElementById('businessName');
    const postCodeInput = document.getElementById('postCode');
    const businessNameErrorMessage = document.getElementById('businessNameErrorMessage');
    const postCodeErrorMessage = document.getElementById('postCodeErrorMessage');

    // Check if fields are empty
    if (!businessNameInput.value) {
        businessNameErrorMessage.textContent = "Please enter the name of the business.";
        businessNameErrorMessage.style.display = 'block';
    } else {
        businessNameErrorMessage.style.display = 'none';
    }

    if (!postCodeInput.value) {
        postCodeErrorMessage.textContent = "Please enter the post code.";
        postCodeErrorMessage.style.display = 'block';
    } else {
        postCodeErrorMessage.style.display = 'none';
    }

    // Proceed with the order if both fields are filled out
    if (businessNameInput.value && postCodeInput.value) {
        orderViaWhatsApp();
    }
}


function orderViaWhatsApp() {
    // Append business name and post code to the message
    let message = ''
    const businessName = document.getElementById('businessName').value;
    const postCode = document.getElementById('postCode').value;
    message += `Business Name: ${businessName}\n`;
    message += `Post Code: ${postCode}\n\n`;

    message += 'Order Details:\n\n';
    cart.forEach(item => {
        message += `${item.quantity > 1 ? `${item.quantity} x ` : ''}${item.item}\n\n`;
    });
    const whatsappLink = `https://wa.me/+447787402004?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappLink;
}

document.getElementById('scrollToCheckoutBtn').addEventListener('click', function() {
    // Scroll to the checkout section
    const checkoutSection = document.querySelector('.checkout-center');
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
});
