// ARTSPHERE — GallerySection.jsx
import { useState } from "react";
import { CATEGORIES } from "../data/seedData";

const CAT_LABELS = Object.fromEntries(CATEGORIES.map(c => [c.value, c.label]));

function ArtCard({ art, onClick, onAddToCart }) {
  const [liked, setLiked] = useState(false);
  const initials = art.artist.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <div className="art-card" onClick={() => onClick(art)}>
      <div className="card-image-wrap">
        <img src={art.image} alt={art.title} loading="lazy" />
        <span className="card-badge">{CAT_LABELS[art.category] || art.category}</span>
        <div className="card-actions">
          <button className="card-action-btn" onClick={e => { e.stopPropagation(); onClick(art); }} title="Quick view">👁</button>
          <button
            className="card-action-btn"
            style={liked ? { color: '#c9a84c' } : {}}
            onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
            title="Like"
          >♥</button>
        </div>
        {art.sold && <div className="card-badge sold-badge">SOLD</div>}
      </div>
      <div className="card-body">
        <div className="card-artist">
          <div className="artist-avatar">{initials}</div>
          <span className="artist-name-sm">{art.artist}</span>
        </div>
        <h3 className="card-title">{art.title}</h3>
        <p className="card-meta">{art.medium} · {art.year}</p>
        <div className="card-footer">
          <span className="card-price">₹{art.price.toLocaleString('en-IN')}</span>
          <button
            className="card-add-btn"
            disabled={art.sold}
            onClick={e => { e.stopPropagation(); onAddToCart(art); }}
          >+</button>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection({
  artworks, allCount, category, priceRange, sortBy, searchQuery,
  onCategoryChange, onPriceChange, onSortChange, onSearchChange,
  onCardClick, onAddToCart, onReset
}) {
  return (
    <section className="gallery-section" id="gallery">
      <div className="section-header">
        <h2 className="section-title">The Gallery</h2>
        <p className="section-sub">Handpicked works from India's finest artists</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar sticky-filter">
        {/* Categories */}
        <div className="filter-left">
          <div className="filter-group">
            <label className="filter-label">Art Form</label>
            <div className="category-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  className={`pill ${category === cat.value ? 'active' : ''}`}
                  onClick={() => onCategoryChange(cat.value)}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price + Sort + Search */}
        <div className="filter-right">
          <div className="filter-group price-filter-group">
            <label className="filter-label">Price Range (₹)</label>
            <div className="price-inputs">
              <input
                type="number" placeholder="Min" className="price-input"
                value={priceRange[0] || ''}
                onChange={e => onPriceChange([parseInt(e.target.value)||0, priceRange[1]])}
              />
              <span className="price-dash">—</span>
              <input
                type="number" placeholder="Max" className="price-input"
                value={priceRange[1] || ''}
                onChange={e => onPriceChange([priceRange[0], parseInt(e.target.value)||500000])}
              />
            </div>
            <input
              type="range" className="price-slider" min="0" max="500000" step="500"
              value={priceRange[1]}
              onChange={e => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            />
            <div className="price-range-labels">
              <span>₹0</span><span>₹{priceRange[1].toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select className="sort-select" value={sortBy} onChange={e => onSortChange(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <div className="filter-group">
            <div className="search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text" placeholder="Search artworks, artists…" className="search-input"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results bar */}
      <div className="results-bar">
        <span>
          {artworks.length === allCount
            ? `Showing all ${allCount} artworks`
            : `Showing ${artworks.length} of ${allCount} artworks`}
        </span>
        <button className="btn-ghost-sm" onClick={onReset}>Clear Filters</button>
      </div>

      {/* Grid */}
      {artworks.length > 0 ? (
        <div className="gallery-grid">
          {artworks.map(art => (
            <ArtCard key={art._id} art={art} onClick={onCardClick} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🎨</div>
          <h3>No artworks found</h3>
          <p>Try adjusting your filters or search query</p>
          <button className="btn-primary" onClick={onReset}>Reset Filters</button>
        </div>
      )}
    </section>
  );
}