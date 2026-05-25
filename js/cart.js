/**
 * ARTSPHERE — cart.js
 * Shopping cart: add, remove, update count, sidebar
 */

const Cart = (() => {
  let items = [];

  function init() {
    // Load from localStorage
    try { items = JSON.parse(localStorage.getItem('artsphere_cart') || '[]'); } catch(e) { items = []; }
    updateCount();

    document.getElementById('cartBtn')?.addEventListener('click', open);
    document.getElementById('cartClose')?.addEventListener('click', close);
    document.getElementById('cartOverlay')?.addEventListener('click', close);
  }

  function add(id) {
    const art = Gallery.getById(id);
    if (!art) return;
    if (art.sold) { Toast.show('This artwork has been sold', 'error'); return; }
    if (items.find(i => i._id === id)) { Toast.show('Already in cart'); return; }
    items.push(art);
    save();
    updateCount();
    renderItems();
    Toast.show('🛒 Added to cart: ' + art.title, 'success');
  }

  function remove(id) {
    items = items.filter(i => i._id !== id);
    save();
    updateCount();
    renderItems();
  }

  function save() {
    try { localStorage.setItem('artsphere_cart', JSON.stringify(items)); } catch(e) {}
  }

  function updateCount() {
    const el = document.getElementById('cartCount');
    if (!el) return;
    el.textContent = items.length;
    el.classList.toggle('visible', items.length > 0);
  }

  function open() {
    renderItems();
    document.getElementById('cartSidebar')?.classList.add('open');
    document.getElementById('cartOverlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    document.getElementById('cartSidebar')?.classList.remove('open');
    document.getElementById('cartOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderItems() {
    const container = document.getElementById('cartItems');
    const footer    = document.getElementById('cartFooter');
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `<div class="cart-empty"><span>🛒</span><p>Your cart is empty</p></div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    container.innerHTML = items.map(art => `
      <div class="cart-item" data-id="${art._id}">
        <img class="cart-item-img" src="${art.image}" alt="${art.title}"/>
        <div class="cart-item-info">
          <div class="cart-item-title">${art.title}</div>
          <div class="cart-item-artist">${art.artist}</div>
        </div>
        <div class="cart-item-price">₹${art.price.toLocaleString('en-IN')}</div>
        <button class="cart-item-remove" data-id="${art._id}" title="Remove">✕</button>
      </div>
    `).join('');

    container.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => remove(btn.dataset.id));
    });

    const total = items.reduce((s, a) => s + a.price, 0);
    document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString('en-IN');
    if (footer) footer.style.display = 'block';
  }

  return { init, add, remove };
})();