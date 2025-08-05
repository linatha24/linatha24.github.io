// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart (by title, price, image)
function addToCart(product) {
  let cart = getCart();
  // Check if product already in cart (by title)
  let found = cart.find((item) => item.title === product.title);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
}

// Remove product from cart (by title)
function removeFromCart(title) {
  let cart = getCart().filter((item) => item.title !== title);
  saveCart(cart);
}

// Update quantity
function updateCartQty(title, change) {
  let cart = getCart();
  let found = cart.find((item) => item.title === title);
  if (found) {
    found.qty = Math.max(1, found.qty + change);
    saveCart(cart);
  }
}

// Clear cart
function clearCart() {
  localStorage.removeItem("cart");
}

// Export for use in other scripts
window.cartAPI = {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateCartQty,
  clearCart,
};

// Cart rendering logic for cart pages
function renderCartPage(options = {}) {
  const cart = window.cartAPI.getCart();
  const cartItemsDiv = document.getElementById('cart-items');
  const itemCount = document.getElementById('item-count');
  const itemsText = document.getElementById('items-text');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  if (!cart || cart.length === 0) {
    if (cartItemsDiv) cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    if (itemCount) itemCount.textContent = '0 Items';
    if (itemsText) itemsText.textContent = 'ITEMS 0';
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$5.00';
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
        <button class="qty-btn" onclick="window.cartAPI.updateQtyAndRender('${item.title}', -1)">-</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn" onclick="window.cartAPI.updateQtyAndRender('${item.title}', 1)">+</button>
      </div>
      <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
      <span class="remove-btn" onclick="window.cartAPI.removeItemAndRender('${item.title}')">×</span>
    </div>`;
  });
  if (cartItemsDiv) cartItemsDiv.innerHTML = html;
  if (itemCount) itemCount.textContent = `${cart.length} Items`;
  if (itemsText) itemsText.textContent = `ITEMS ${cart.length}`;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (subtotalEl) subtotalEl.textContent = `$${subtotal}.00`;
  if (totalEl) totalEl.textContent = `$${subtotal + 5}.00`;
}

window.cartAPI.renderCartPage = renderCartPage;
window.cartAPI.updateQtyAndRender = function(title, change) {
  window.cartAPI.updateCartQty(title, change);
  window.cartAPI.renderCartPage();
};
window.cartAPI.removeItemAndRender = function(title) {
  window.cartAPI.removeFromCart(title);
  window.cartAPI.renderCartPage();
};
