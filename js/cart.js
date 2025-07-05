document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".card .btn.btn-primary");

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const card = button.closest(".card");
      const title = card.querySelector(".card-title")?.innerText || "Unnamed";
      const priceText = card.querySelector(".card-text")?.innerText || "$0.00";
      const price = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;

      const item = {
        id: `item-${title}-${index}`,
        name: title,
        price: price
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!cart.some(p => p.id === item.id)) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${item.name} added to cart!`);
      } else {
        alert(`${item.name} is already in your cart.`);
      }
    });
  });
});