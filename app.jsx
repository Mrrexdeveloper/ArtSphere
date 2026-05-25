// ARTSPHERE — React App.jsx
// Main application component

import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GallerySection from "./components/GallerySection";
import ArtistsSection from "./components/ArtistsSection";
import UploadSection from "./components/UploadSection";
import CartSidebar from "./components/CartSidebar";
import ArtworkModal from "./components/ArtworkModal";
import Toast from "./components/Toast";
import { SEED_ARTWORKS, SEED_ARTISTS } from "./data/seedData";

export default function App() {
  const [artworks, setArtworks]         = useState([]);
  const [cart, setCart]                 = useState([]);
  const [selectedArt, setSelectedArt]   = useState(null);
  const [cartOpen, setCartOpen]         = useState(false);
  const [toast, setToast]               = useState({ msg: '', type: '', show: false });

  // Filters
  const [category, setCategory]         = useState('all');
  const [priceRange, setPriceRange]     = useState([0, 500000]);
  const [sortBy, setSortBy]             = useState('newest');
  const [searchQuery, setSearchQuery]   = useState('');

  // Load data
  useEffect(() => {
    const userUploads = JSON.parse(localStorage.getItem('artsphere_uploads') || '[]');
    setArtworks([...userUploads, ...SEED_ARTWORKS]);
    setCart(JSON.parse(localStorage.getItem('artsphere_cart') || '[]'));
  }, []);

  // Show toast
  const showToast = useCallback((msg, type = '') => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  }, []);

  // Filtered + sorted artworks
  const filteredArtworks = artworks
    .filter(a => {
      const catMatch    = category === 'all' || a.category === category;
      const priceMatch  = a.price >= priceRange[0] && a.price <= priceRange[1];
      const q           = searchQuery.toLowerCase();
      const searchMatch = !q ||
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return catMatch && priceMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular')    return b.likes - a.likes;
      return b.year - a.year;
    });

  // Cart actions
  const addToCart = useCallback((art) => {
    if (art.sold) { showToast('This artwork has been sold', 'error'); return; }
    setCart(prev => {
      if (prev.find(i => i._id === art._id)) { showToast('Already in cart'); return prev; }
      const next = [...prev, art];
      localStorage.setItem('artsphere_cart', JSON.stringify(next));
      showToast('🛒 Added: ' + art.title, 'success');
      return next;
    });
  }, [showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const next = prev.filter(i => i._id !== id);
      localStorage.setItem('artsphere_cart', JSON.stringify(next));
      return next;
    });
  }, []);

  // Upload artwork
  const handleUpload = useCallback((artwork) => {
    setArtworks(prev => {
      const next = [artwork, ...prev];
      const uploads = next.filter(a => a._id.startsWith('user_'));
      localStorage.setItem('artsphere_uploads', JSON.stringify(uploads));
      return next;
    });
    showToast('🎨 Your artwork is now live!', 'success');
  }, [showToast]);

  const resetFilters = () => {
    setCategory('all');
    setPriceRange([0, 500000]);
    setSortBy('newest');
    setSearchQuery('');
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cart.length}
        onCartOpen={() => setCartOpen(true)}
      />
      <Hero artworkCount={artworks.length} />
      <GallerySection
        artworks={filteredArtworks}
        allCount={artworks.length}
        category={category}
        priceRange={priceRange}
        sortBy={sortBy}
        searchQuery={searchQuery}
        onCategoryChange={setCategory}
        onPriceChange={setPriceRange}
        onSortChange={setSortBy}
        onSearchChange={setSearchQuery}
        onCardClick={setSelectedArt}
        onAddToCart={addToCart}
        onReset={resetFilters}
      />
      <ArtistsSection artists={SEED_ARTISTS} />
      <UploadSection onUpload={handleUpload} />

      <CartSidebar
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
      />
      {selectedArt && (
        <ArtworkModal
          art={selectedArt}
          onClose={() => setSelectedArt(null)}
          onAddToCart={addToCart}
        />
      )}
      <Toast {...toast} />
    </div>
  );
}