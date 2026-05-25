/**
 * ARTSPHERE — gallery.js
 * Gallery rendering, filtering (category + price), sorting, search
 */

const Gallery = (() => {
  let allArtworks = [];
  let filtered    = [];
  let activeCategory = 'all';
  let maxPrice    = 500000;
  let minPrice    = 0;
  let sortBy      = 'newest';
  let searchQuery = '';

  // Category display names
  const CAT_LABELS = {
    graphite:    'Graphite',
    charcoal:    'Charcoal',
    acrylic:     'Acrylic',
    oil:         'Oil Painting',
    madhubani:   'Madhubani',
    warli:       'Warli',
    tanjore:     'Tanjore',
    miniature:   'Miniature',
    pattachitra: 'Pattachitra',
    digital:     'Digital Art'
  };

  function init(artworks) {
    allArtworks = artworks;
    filtered    = [...artworks];
    bindEvents();
    render();
  }

  function bindEvents() {
    // Category pills
    document.querySelectorAll('.pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.cat;
        applyFilters();
      });
    });

    // Price slider
    const slider = document.getElementById('priceSlider');
    const sliderVal = document.getElementById('sliderVal');
    slider?.addEventListener('input', () => {
      maxPrice = parseInt(slider.value);
      sliderVal.textContent = '₹' + maxPrice.toLocaleString('en-IN');
      document.getElementById('priceMax').value = maxPrice;
      applyFilters();
    });

    // Price inputs
    document.getElementById('priceMin')?.addEventListener('input', e => {
      minPrice = parseInt(e.target.value) || 0;
      applyFilters();
    });
    document.getElementById('priceMax')?.addEventListener('input', e => {
      maxPrice = parseInt(e.target.value) || 500000;
      document.getElementById('priceSlider').value = maxPrice;
      document.getElementById('sliderVal').textContent = '₹' + maxPrice.toLocaleString('en-IN');
      applyFilters();
    });

    // Sort
    document.getElementById('sortSelect')?.addEventListener('change', e => {
      sortBy = e.target.value;
      applyFilters();
    });

    // Search
    let searchTimer;
    document.getElementById('searchInput')?.addEventListener('input', e => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
      }, 250);
    });

    // Clear filters
    document.getElementById('clearFilters')?.addEventListener('click', resetFilters);
    document.getElementById('resetBtn')?.addEventListener('click', resetFilters);
  }

  function applyFilters() {
    filtered = allArtworks.filter(art => {
      const catMatch   = activeCategory === 'all' || art.category === activeCategory;
      const priceMatch = art.price >= minPrice && art.price <= maxPrice;
      const searchMatch = !searchQuery ||
        art.title.toLowerCase().includes(searchQuery) ||
        art.artist.toLowerCase().includes(searchQuery) ||
        art.category.toLowerCase().includes(searchQuery) ||
        (art.description || '').toLowerCase().includes(searchQuery);
      return catMatch && priceMatch && searchMatch;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':  filtered.sort((a,b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a,b) => b.price - a.price); break;
      case 'popular':    filtered.sort((a,b) => b.likes - a.likes); break;
      case 'newest':
      default:           filtered.sort((a,b) => b.year - a.year);  break;
    }

    render();
    updateResultsCount();
  }

  function resetFilters() {
    activeCategory = 'all';
    minPrice = 0;
    maxPrice = 500000;
    sortBy   = 'newest';
    searchQuery = '';
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.pill[data-cat="all"]')?.classList.add('active');
    document.getElementById('priceMin').value    = '';
    document.getElementById('priceMax').value    = '';
    document.getElementById('priceSlider').value = 500000;
    document.getElementById('sliderVal').textContent = '₹5,00,000';
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value  = 'newest';
    filtered = [...allArtworks];
    render();
    updateResultsCount();
  }

  function updateResultsCount() {
    const el = document.getElementById('resultsCount');
    if (!el) return;
    if (filtered.length === allArtworks.length) {
      el.textContent = `Showing all ${allArtworks.length} artworks`;
    } else {
      el.textContent = `Showing ${filtered.length} of ${allArtworks.length} artworks`;
    }
  }

  function render() {
    const grid  = document.getElementById('galleryGrid');
    const empty = document.getElementById('emptyState');
    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';

    grid.innerHTML = filtered.map((art, i) => buildCard(art, i)).join('');

    // Attach event listeners to cards
    grid.querySelectorAll('.art-card').forEach(card => {
      card.querySelector('.card-view-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        Modal.open(card.dataset.id);
      });
      card.querySelector('.card-like-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(card.dataset.id, e.currentTarget);
      });
      card.querySelector('.card-add-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        Cart.add(card.dataset.id);
      });
      card.addEventListener('click', () => Modal.open(card.dataset.id));
    });
  }

  function buildCard(art, index) {
    const priceFormatted = '₹' + art.price.toLocaleString('en-IN');
    const initials = art.artist.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const delay = (index % 12) * 50;
    return `
      <div class="art-card" data-id="${art._id}" style="animation-delay:${delay}ms">
        <div class="card-image-wrap">
          <img src="${art.image}" alt="${art.title}" loading="lazy"/>
          <span class="card-badge">${CAT_LABELS[art.category] || art.category}</span>
          <div class="card-actions">
            <button class="card-action-btn card-view-btn" title="Quick view">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="card-action-btn card-like-btn" title="Like" data-liked="false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
          ${art.sold ? '<div class="card-badge" style="top:auto;bottom:12px;background:rgba(192,57,43,0.9);color:white;">SOLD</div>' : ''}
        </div>
        <div class="card-body">
          <div class="card-artist">
            <div class="artist-avatar">${initials}</div>
            <span class="artist-name-sm">${art.artist}</span>
          </div>
          <h3 class="card-title">${art.title}</h3>
          <p class="card-meta">${art.medium || ''} · ${art.year}</p>
          <div class="card-footer">
            <span class="card-price">${priceFormatted}</span>
            ${art.sold
              ? `<button class="card-add-btn" disabled style="opacity:0.4;cursor:not-allowed">✓</button>`
              : `<button class="card-add-btn" title="Add to cart">+</button>`
            }
          </div>
        </div>
      </div>
    `;
  }

  function toggleLike(id, btn) {
    const art = allArtworks.find(a => a._id === id);
    if (!art) return;
    const liked = btn.dataset.liked === 'true';
    btn.dataset.liked = !liked;
    art.likes += liked ? -1 : 1;
    if (!liked) {
      btn.style.color = '#c9a84c';
      btn.querySelector('svg path')?.setAttribute('fill', '#c9a84c');
    } else {
      btn.style.color = '';
      btn.querySelector('svg path')?.setAttribute('fill', 'none');
    }
    Toast.show(liked ? 'Removed from likes' : '❤️ Added to likes');
  }

  function getById(id) {
    return allArtworks.find(a => a._id === id) || null;
  }

  function addArtwork(art) {
    allArtworks.unshift(art);
    applyFilters();
    updateResultsCount();
    renderArtists();
  }

  return { init, getById, addArtwork, applyFilters, CAT_LABELS };
})();