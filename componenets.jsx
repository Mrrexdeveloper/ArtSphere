// ── Hero.jsx ──
export function Hero({ artworkCount }) {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-orb orb-1" /><div className="hero-orb orb-2" /><div className="hero-orb orb-3" />
        <div className="hero-grain" />
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">India's Premier Online Art Marketplace</p>
        <h1 className="hero-title">Where Every<br/><em>Brushstroke</em><br/>Finds a Home</h1>
        <p className="hero-sub">Discover rare artworks — from ancient Indian traditions to contemporary expressions.</p>
        <div className="hero-cta">
          <a href="#gallery" className="btn-primary btn-lg">Explore Gallery</a>
          <a href="#upload-section" className="btn-ghost btn-lg">Become an Artist</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">{artworkCount}+</span><span className="stat-label">Artworks</span></div>
          <div className="stat-sep" />
          <div className="stat"><span className="stat-num">340+</span><span className="stat-label">Artists</span></div>
          <div className="stat-sep" />
          <div className="stat"><span className="stat-num">890+</span><span className="stat-label">Sold</span></div>
        </div>
      </div>
    </section>
  );
}

// ── ArtistsSection.jsx ──
export function ArtistsSection({ artists }) {
  return (
    <section className="artists-section" id="artists">
      <div className="section-header">
        <h2 className="section-title">Featured Artists</h2>
        <p className="section-sub">The creators behind the magic</p>
      </div>
      <div className="artists-grid">
        {artists.map(a => (
          <div key={a._id} className="artist-card">
            <div className="artist-avatar-lg">{a.avatar}</div>
            <div className="artist-full-name">{a.name}</div>
            <div className="artist-specialty">{a.specialty}</div>
            <div style={{fontSize:'0.78rem',color:'var(--text-3)',marginBottom:'0.75rem'}}>📍 {a.location}</div>
            <div className="artist-stats-row">
              <div className="a-stat"><strong>{a.artworks}</strong>Works</div>
              <div className="a-stat"><strong>{a.sales}</strong>Sold</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CartSidebar.jsx ──
export function CartSidebar({ open, items, onClose, onRemove }) {
  const total = items.reduce((s, a) => s + a.price, 0);
  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${open ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty"><span>🛒</span><p>Your cart is empty</p></div>
          ) : items.map(art => (
            <div key={art._id} className="cart-item">
              <img className="cart-item-img" src={art.image} alt={art.title} />
              <div className="cart-item-info">
                <div className="cart-item-title">{art.title}</div>
                <div className="cart-item-artist">{art.artist}</div>
              </div>
              <div className="cart-item-price">₹{art.price.toLocaleString('en-IN')}</div>
              <button className="cart-item-remove" onClick={() => onRemove(art._id)}>✕</button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span style={{color:'var(--gold)'}}>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-primary btn-block">Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}

// ── ArtworkModal.jsx ──
export function ArtworkModal({ art, onClose, onAddToCart }) {
  if (!art) return null;
  const initials = art.artist.split(' ').map(w => w[0]).join('').slice(0,2);
  return (
    <>
      <div className="modal-overlay open" onClick={onClose} />
      <div className="artwork-modal open">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-content">
          <div className="modal-inner">
            <img className="modal-image" src={art.image} alt={art.title} />
            <div className="modal-details">
              <span className="modal-badge">{art.category}</span>
              <h2 className="modal-title">{art.title}</h2>
              <div className="modal-artist-row">
                <div className="artist-avatar">{initials}</div>
                <span>by <strong>{art.artist}</strong></span>
              </div>
              <p className="modal-desc">{art.description}</p>
              <div className="modal-specs">
                <div className="spec-item"><label>Medium</label><span>{art.medium}</span></div>
                <div className="spec-item"><label>Dimensions</label><span>{art.dimensions}</span></div>
                <div className="spec-item"><label>Year</label><span>{art.year}</span></div>
                <div className="spec-item"><label>Likes</label><span>❤️ {art.likes}</span></div>
              </div>
              <div className="modal-price">₹{art.price.toLocaleString('en-IN')}</div>
              <div className="modal-actions">
                {art.sold
                  ? <button className="btn-ghost" disabled>Sold</button>
                  : <button className="btn-primary" onClick={() => { onAddToCart(art); onClose(); }}>Add to Cart</button>
                }
                <button className="btn-ghost" onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Toast.jsx ──
export function Toast({ msg, type, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''} ${type}`}>{msg}</div>
  );
}