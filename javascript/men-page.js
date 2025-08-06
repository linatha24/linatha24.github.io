const product = [
  {
    title: "LV Spring Summer",
    price: 2400,
    image: "images/man1.jpg",
  },
  {
    title: " Blouson from the FW23",
    price: 3200,
    image: "images/man2.jpg",
  },
  {
    title: "Cowboy Set",
    price: 2310,
    image: "images/man3.jpg",
  },
  {
    title: "Louis Vuitton Sandwich Bag",
    price: 1300,
    image: "images/man4.jpg",
  },
  {
    title: "Bagbage",
    price: 2500,
    image: "images/man5.jpg",
  },
  {
    title: "JACKET FLORAL",
    price: 1300,
    image: "images/man6.jpg",
  },
];
let productItem = "";
for (let i = 0; i < product.length; i++) {
  productItem += `<div class="col">
    <div class="card product-card" style="width: 18rem; position: relative;">
      <img src="${product[i].image}" class="card-img-top" alt="${product[i].title}">
      <div class="card-body">
        <h5 class="card-title">${product[i].title}</h5>
        <p class="card-text">$${product[i].price}</p>
        <button class="btn btn-primary add-to-cart-btn" data-title="${product[i].title}" data-price="${product[i].price}" data-image="${product[i].image}">Add to Cart</button>
      </div>
    </div>
  </div>`;
}
document.getElementById("men-products").innerHTML = productItem;

// Add hover effect to product cards
const style = document.createElement('style');
style.innerHTML = `
  .product-card {
    transition: box-shadow 0.3s, transform 0.3s;
  }
  .product-card:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    transform: scale(1.04);
  }
  .toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #333;
    color: #fff;
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 1rem;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s;
  }
  .toast.show {
    opacity: 1;
    pointer-events: auto;
  }
`;
document.head.appendChild(style);

// Toast notification function
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Add event listeners for Add to Cart buttons
document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const title = this.getAttribute("data-title");
    const price = parseFloat(this.getAttribute("data-price"));
    const image = this.getAttribute("data-image");
    window.cartAPI.addToCart({ title, price, image });
    showToast(`${title} added to cart!`);
    setTimeout(() => {
      window.location.href = "men-cart.html";
    }, 800);
  });
});

