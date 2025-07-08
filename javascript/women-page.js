const product = [
  {
    image: "images/women-p8.jpg",
    title: "Woman LV Bag",
    price: 2400,
  },
  {
    image: "images/women-p2.jpg",
    title: "All Ready To Wear Collection for Women",
    price: 3200,
  },
  {
    image: "images/women-p3.jpg",
    title: "Canvas",
    price: 2310,
  },
  {
    image: "images/women-p4.jpg",
    title: "Monogram Toweling Jogging Pants",
    price: 1300,
  },
  {
    image: "images/women-p5.jpg",
    title: "Louis Vuitton Water Repellent Monogram Parka",
    price: 2500,
  },
  {
    image: "images/women-p6.jpg",
    title: "Women LV",
    price: 1300,
  },
];
let productItem = "";
for (let i = 0; i < product.length; i++) {
  productItem += `<div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="${product[i].image}" class="card-img-top" alt="${product[i].title}">
                    <div class="card-body">
                        <h5 class="card-title">${product[i].title}</h5>
                        <p class="card-text">$${product[i].price}</p>
                        <button class="btn btn-primary add-to-cart-btn" data-title="${product[i].title}" data-price="${product[i].price}" data-image="${product[i].image}">Add to Cart</button>
                    </div>
                </div>
            </div>`;
}
document.getElementById("women-products").innerHTML = productItem;

// Add event listeners for Add to Cart buttons
document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const title = this.getAttribute("data-title");
    const price = parseFloat(this.getAttribute("data-price"));
    const image = this.getAttribute("data-image");
    window.cartAPI.addToCart({ title, price, image });
    window.location.href = "women-cart.html";
  });
});
