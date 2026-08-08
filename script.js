/* ================= CART ================= */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const notification = document.getElementById("notification");


/* Open Cart */

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

});


/* Close Cart */

function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}

closeCart.addEventListener("click", closeCartSidebar);

cartOverlay.addEventListener("click", closeCartSidebar);


/* ================= ADD TO CART ================= */

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;

        const price = Number(button.dataset.price);


        const existingProduct = cart.find(
            item => item.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();

        showNotification("Product added to cart!");

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    let total = 0;

    let itemsCount = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        itemsCount += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

            </div>


            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

                <span
                    class="remove-item"
                    onclick="removeItem(${index})">
                    🗑️
                </span>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = itemsCount;

    cartTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

}


/* ================= INCREASE ================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* ================= DECREASE ================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


/* ================= REMOVE ================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================= NOTIFICATION ================= */

function showNotification(message) {

    notification.textContent = message;

    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove("show");

    }, 2000);

}


/* ================= SEARCH ================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product.dataset.name.toLowerCase();


        if (productName.includes(searchValue)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});


/* ================= CATEGORY FILTER ================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        const products =
            document.querySelectorAll(".product-card");


        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* ================= DARK MODE ================= */

const darkModeBtn =
    document.getElementById("darkModeBtn");


darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        darkModeBtn.textContent = "☀️";

    } else {

        darkModeBtn.textContent = "🌙";

    }

});


/* ================= NEWSLETTER ================= */

const subscribeBtn =
    document.getElementById("subscribeBtn");


subscribeBtn.addEventListener("click", () => {

    const email =
        document.getElementById("emailInput").value;


    if (email.trim() === "") {

        alert("Please enter your email.");

        return;

    }


    if (!email.includes("@")) {

        alert("Please enter a valid email.");

        return;

    }


    alert("Thank you for subscribing!");

    document.getElementById("emailInput").value = "";

});


/* ================= CHECKOUT ================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Checkout functionality will be added in the next version."
    );

});


/* ================= INITIALIZE ================= */

updateCart();