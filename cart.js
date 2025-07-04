let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = cart.length;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function setupCart() {
  document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card = btn.closest('.card');
      const item = {
        title: card.querySelector('.card-title').innerText,
        price: card.querySelector('.card-text').innerText.replace(/[^\d.]/g, ''),
        image: card.querySelector('img').src
      };
      cart.push(item);
      saveCart();
      alert(`"${item.title}" added to cart!`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  setupCart();
});
