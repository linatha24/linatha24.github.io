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
