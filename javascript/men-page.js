const product = [
  {
    title: "Louis Vuitton Spring Summer",
    price: 2400,
    image: "images/man1.jpg",
  },
  {
    title: "This Made to Order varsity blouson from the FW23 Show",
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
    title: "JACKET WITH FLORAL EMBROIDERY",
    price: 1300,
    image: "images/man6.jpg",
  },
];
let productItem = "";
for (let i = 0; i < product.length; i++) {
  productItem += `
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="${product[i].image}" class="card-img-top" alt="${product[i].title}">
            <div class="card-body">
                <h5 class="card-title">${product[i].title}</h5>
                <p class="card-text">$${product[i].price}</p>
                <button class="btn btn-primary add-to-cart-btn" data-title="${product[i].title}" data-price="${product[i].price}" data-image="${product[i].image}">Add to Cart</button>
            </div>
        </div>
    </div>
    `;
}
document.getElementById("men-products").innerHTML = productItem;

// Add event listeners for Add to Cart buttons
document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const title = this.getAttribute("data-title");
    const price = parseFloat(this.getAttribute("data-price"));
    const image = this.getAttribute("data-image");
    window.cartAPI.addToCart({ title, price, image });
    window.location.href = "shopping-cart.html";
  });
});
