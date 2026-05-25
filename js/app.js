/**
 * ARTSPHERE — app.js
 * App initialisation, modal, toast, navbar, animated stats, artists
 */

/* ── TOAST ── */
const Toast = (() => {
  let timer;
  function show(msg, type = '') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className   = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('show'), 3000);
  }
  return { show };
})();

/* ── MODAL ── */
const Modal = (() => {
  function open(id) {
    const art = Gallery.getById(id);
    if (!art) return;

    const content = document.getElementById('modalContent');
    const priceFormatted = '₹' + art.price.toLocaleString('en-IN');
    const initials = art.artist.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

    content.innerHTML = `
      <div class="modal-inner">
        <div class="modal-image-wrap">
          <img class="modal-image" src="${art.image}" alt="${art.title}"/>
        </div>
        <div class="modal-details">
          <span class="modal-badge">${Gallery.CAT_LABELS[art.category] || art.category}</span>
          <h2 class="modal-title">${art.title}</h2>
          <div class="modal-artist-row">
            <div class="artist-avatar">${initials}</div>
            <span>by <strong>${art.artist}</strong></span>
          </div>
          <p class="modal-desc">${art.description || ''}</p>
          <div class="modal-specs">
            <div class="spec-item"><label>Medium</label><span>${art.medium || '—'}</span></div>
            <div class="spec-item"><label>Dimensions</label><span>${art.dimensions || '—'}</span></div>
            <div class="spec-item"><label>Year</label><span>${art.year}</span></div>
            <div class="spec-item"><label>Likes</label><span>❤️ ${art.likes}</span></div>
          </div>
          <div class="modal-price">${priceFormatted}</div>
          <div class="modal-actions">
            ${art.sold
              ? `<button class="btn-ghost" disabled style="opacity:0.5">Sold</button>`
              : `<button class="btn-primary modal-add-btn" data-id="${art._id}">Add to Cart</button>`
            }
            <button class="btn-ghost modal-close-btn">Close</button>
          </div>
        </div>
      </div>
    `;

    content.querySelector('.modal-add-btn')?.addEventListener('click', () => {
      Cart.add(art._id); close();
    });
    content.querySelector('.modal-close-btn')?.addEventListener('click', close);

    document.getElementById('modalOverlay').classList.add('open');
    document.getElementById('artworkModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.getElementById('artworkModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  return { open, close };
})();

/* ── ARTISTS ── */
function renderArtists() {
  const grid = document.getElementById('artistsGrid');
  if (!grid) return;
  grid.innerHTML = SEED_ARTISTS.map(a => `
    <div class="artist-card">
      <div class="artist-avatar-lg">${a.avatar}</div>
      <div class="artist-full-name">${a.name}</div>
      <div class="artist-specialty">${a.specialty}</div>
      <div style="font-size:0.78rem;color:var(--text-3);margin-bottom:0.75rem">📍 ${a.location}</div>
      <div class="artist-stats-row">
        <div class="a-stat"><strong>${a.artworks}</strong>Works</div>
        <div class="a-stat"><strong>${a.sales}</strong>Sold</div>
      </div>
    </div>
  `).join('');
}

/* ── ANIMATED STATS ── */
function animateStats() {
  const counts = { statArt: 1200, statArtist: 340, statSold: 890 };
  Object.entries(counts).forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const step  = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current).toLocaleString('en-IN') + (target >= 1000 ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* ── NAVBAR SCROLL ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Active link
  const sections = ['gallery', 'artists', 'upload-section'];
  const links    = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });
}

/* ── MODAL CLOSE ── */
function initModalClose() {
  document.getElementById('modalClose')?.addEventListener('click', Modal.close);
  document.getElementById('modalOverlay')?.addEventListener('click', Modal.close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') Modal.close(); });
}

/* ── LOAD USER UPLOADS ── */
function loadUserUploads() {
  try {
    const saved = JSON.parse(localStorage.getItem('artsphere_uploads') || '[]');
    return saved;
  } catch(e) { return []; }
}

/* ── INTERSECTION OBSERVER for section fade ── */
function initObserver() {
  const els = document.querySelectorAll('.gallery-section, .artists-section, .upload-section');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'none';
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    obs.observe(el);
  });
}

/* ── STATS OBSERVER ── */
function initStatsObserver() {
  const hero = document.querySelector('.hero-stats');
  if (!hero) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateStats(); obs.disconnect(); } });
  }, { threshold: 0.5 });
  obs.observe(hero);
}

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', () => {
  const userUploads = loadUserUploads();
  const allArtworks = [...userUploads, ...SEED_ARTWORKS];

  Gallery.init(allArtworks);
  Cart.init();
  Upload.init();
  renderArtists();
  initNavbar();
  initModalClose();
  initObserver();
  initStatsObserver();
});