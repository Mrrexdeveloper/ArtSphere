// ARTSPHERE — Navbar.jsx
export default function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-text">ArtSphere</span>
      </div>
      <ul className="nav-links">
        <li><a href="#gallery" className="nav-link">Gallery</a></li>
        <li><a href="#artists" className="nav-link">Artists</a></li>
        <li><a href="#upload-section" className="nav-link">Upload Art</a></li>
      </ul>
      <div className="nav-actions">
        <button className="btn-cart" onClick={onCartOpen}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          {cartCount > 0 && <span className="cart-count visible">{cartCount}</span>}
        </button>
        <a href="#upload-section" className="btn-primary">Sell Art</a>
      </div>
    </nav>
  );
}