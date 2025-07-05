document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".card .btn.btn-primary");

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const card = button.closest(".card");
      const title = card.querySelector(".card-title")?.innerText || "Unnamed";
      const priceText = card.querySelector(".card-text")?.innerText || "$0.00";
      const price = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;
      const image = card.querySelector("img")?.src || "";
      const category = document.title || "Unknown";

      const item = {
        id: `item-${title}-${category}-${index}`,
        name: title,
        price: price,
        image: image,
        quantity: 1,
        category: category
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(p => p.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      showMiniCart();
      showMessage(`Added To Cart`)
    });
  });

  updateCartCount();
  showMiniCart();
  setupMiniCartToggle();
});

// Update cart icon badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const icon = document.querySelector(".fa-shopping-bag");
  if (!icon) return;

  let badge = icon.querySelector(".cart-count");
  if (!badge) {
    badge = document.createElement("span");
    badge.classList.add("cart-count");
    icon.appendChild(badge);
  }
  badge.textContent = count;
}

// Show mini cart with remove buttons
function showMiniCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let miniCart = document.getElementById("mini-cart");

  if (!miniCart) {
    miniCart = document.createElement("div");
    miniCart.id = "mini-cart";
    miniCart.className = "mini-cart-summary";
    document.body.appendChild(miniCart);
  }

  if (cart.length === 0) {
    miniCart.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let html = "<ul>";
  let total = 0;

  cart.forEach((item, index) => {
  const itemTotal = item.price * item.quantity;
  total += itemTotal;

  html += `
    <li>
      <strong>${item.name}</strong><br>
      <small>${item.category}</small><br>
      Qty: ${item.quantity} &nbsp; Price: $${itemTotal.toFixed(2)}<br>
      <button class="remove-mini-btn" onclick="removeMiniCartItem(${index})">Remove</button>
      <a href="cart.html" class="btn btn-primary btn-sm">View Full Cart</a>
    </li>
    <hr>
  `;
});
html += `</ul><p><strong>Total: $${total.toFixed(2)}</strong></p>`;

  miniCart.innerHTML = html;
}

// Remove item from cart in mini-cart
function removeMiniCartItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showMiniCart();
}

// Message function (non-blocking)
  function showMessage(msg) {
    const msgBox = document.createElement("div");
    msgBox.innerText = msg;
    msgBox.style.cssText = `
      position: fixed; top: 20px; right: 20px;
      background: green; color: white; padding: 10px 20px;
      border-radius: 5px; z-index: 1000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(msgBox);
    setTimeout(() => {
      msgBox.remove();
    }, 2000);
  }

// Toggle mini cart on icon click
function setupMiniCartToggle() {
  const icon = document.querySelector(".fa-shopping-bag");
  const miniCart = document.getElementById("mini-cart");
  if (!icon || !miniCart) return;

  // Toggle on icon click
  icon.addEventListener("click", function (e) {
    e.preventDefault();
    miniCart.style.display = miniCart.style.display === "block" ? "none" : "block";
  });

  // Close when clicking outside BOTH icon and miniCart
  document.addEventListener("click", function (e) {
    // If click is inside miniCart OR on the icon, do nothing
    if (miniCart.contains(e.target) || icon.contains(e.target)) return;
    // Otherwise hide
    miniCart.style.display = "none";
  });
}