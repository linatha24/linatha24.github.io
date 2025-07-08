// Render cart items from localStorage
    function renderCart() {
        const cart = window.cartAPI.getCart();
        const cartItemsDiv = document.getElementById('cart-items');
        if (!cart || cart.length === 0) {
            cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            document.getElementById('item-count').textContent = '0 Items';
            document.getElementById('items-text').textContent = 'ITEMS 0';
            document.getElementById('subtotal').textContent = '$0.00';
            document.getElementById('total').textContent = '$5.00';
            return;
        }
        let html = '';
        cart.forEach((item) => {
            html += `<div class="item-row" data-title="${item.title}">
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.title}</div>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="updateQty('${item.title}', -1)">-</button>
                <span class="qty-display">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty('${item.title}', 1)">+</button>
            </div>
            <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
            <span class="remove-btn" onclick="removeItem('${item.title}')">×</span>
        </div>`
        });
        cartItemsDiv.innerHTML = html;
        document.getElementById('item-count').textContent = `${cart.length} Items`;
        document.getElementById('items-text').textContent = `ITEMS ${cart.length}`;
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        document.getElementById('subtotal').textContent = `$${subtotal}.00`;
        document.getElementById('total').textContent = `$${subtotal + 5}.00`;
    }

    function updateQty(title, change) {
        window.cartAPI.updateCartQty(title, change);
        renderCart();
    }
    function removeItem(title) {
        window.cartAPI.removeFromCart(title);
        renderCart();
    }
    document.addEventListener('DOMContentLoaded', renderCart);