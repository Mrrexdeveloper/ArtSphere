// ARTSPHERE — seedData.js (React)
export const SEED_ARTWORKS = [
  { _id: 'a1', title: 'Sacred Lotus — Dawn', artist: 'Priya Sharma', artistId: 'art1', category: 'madhubani', price: 18000, medium: 'Natural pigments on handmade paper', dimensions: '24"×18"', description: 'A traditional Madhubani depicting the sacred lotus at dawn, using natural earth pigments from Bihar.', image : 'https://images.unsplash.com/photo-1753807005653-81c46cdec6d6?q=80&w=780', likes: 124, year: 2024, sold: false, featured: true },
  { _id: 'a2', title: 'Geometric Sunrise', artist: 'Rajan Patel', artistId: 'art2', category: 'warli', price: 12500, medium: 'White paint on terracotta', dimensions: '20"×20"', description: 'Warli-inspired geometric composition depicting the harvest festival.', image: 'geometricsunrise.jpg', likes: 89, year: 2024, sold: false, featured: false },
  { _id: 'a3', title: 'Portrait with peace', artist: 'Rajendra Pharswan', artistId: 'art3', category: 'charcoal', price: 8500, medium: 'Charcoal on 200gsm Brustro paper', dimensions: '16"×20"', description: 'A deeply textured charcoal Work representing the peace through smiles', image: '', likes: 211, year: 2026, sold: false, featured: true },
  { _id: 'a4', title: 'Golden Temple Study', artist: 'Vikram Singh', artistId: 'art4', category: 'graphite', price: 6000, medium: '6B-2H Graphite on Bristol board', dimensions: '12"×16"', description: 'A meticulous graphite architectural study of the Golden Temple.', image: 'https://images.unsplash.com/photo-1577083553418-2a9e4b6eb4d8?w=600&q=80', likes: 156, year: 2024, sold: false, featured: false },
  { _id: 'a5', title: 'Monsoon Melody', artist: 'Priya Sharma', artistId: 'art1', category: 'acrylic', price: 22000, medium: 'Acrylic on stretched canvas', dimensions: '30"×40"', description: 'An expressive acrylic capturing the first monsoon shower.', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', likes: 198, year: 2024, sold: false, featured: true },
  { _id: 'a6', title: 'Tanjore Krishna', artist: 'Meera Iyer', artistId: 'art5', category: 'tanjore', price: 45000, medium: 'Gold foil & gemstones on wooden panel', dimensions: '18"×24"', description: 'A classical Tanjore painting of Lord Krishna with genuine 22-karat gold foil.', image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80', likes: 342, year: 2023, sold: false, featured: true },
  { _id: 'a7', title: 'Deccan Journey', artist: 'Arjun Mehta', artistId: 'art6', category: 'miniature', price: 35000, medium: 'Natural pigments & 24K gold on vellum', dimensions: '8"×10"', description: 'A miniature in the Deccani school tradition, depicting a royal procession.', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80', likes: 267, year: 2024, sold: false, featured: false },
  { _id: 'a8', title: 'Ocean of Thought', artist: 'Ananya Krishnan', artistId: 'art3', category: 'oil', price: 55000, medium: 'Oil on linen canvas', dimensions: '36"×48"', description: 'A large-scale oil painting capturing a contemplative seascape.', image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600&q=80', likes: 389, year: 2024, sold: false, featured: true },
  { _id: 'a9', title: 'Pattachitra Vishnu', artist: 'Suresh Das', artistId: 'art7', category: 'pattachitra', price: 28000, medium: 'Natural colours on cloth-layered canvas', dimensions: '22"×30"', description: 'Authentic Odisha Pattachitra depicting Lord Vishnu with the ten avatars.', image: 'https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?w=600&q=80', likes: 178, year: 2023, sold: false, featured: false },
  { _id: 'a10', title: 'Neon Durga', artist: 'Zara Ahmed', artistId: 'art8', category: 'digital', price: 5000, medium: 'Digital illustration, limited print', dimensions: '24"×32"', description: 'A contemporary digital artwork reimagining Goddess Durga in cyberpunk aesthetic.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', likes: 512, year: 2024, sold: false, featured: true },
  { _id: 'a11', title: 'River Ganga Study', artist: 'Vikram Singh', artistId: 'art4', category: 'graphite', price: 7500, medium: 'Mechanical pencil on vellum', dimensions: '18"×24"', description: 'Detailed graphite panorama of the Ganga ghats at Varanasi.', image: 'https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?w=600&q=80', likes: 143, year: 2023, sold: true, featured: false },
  { _id: 'a12', title: 'Sunset Over Rajasthan', artist: 'Rajan Patel', artistId: 'art2', category: 'oil', price: 38000, medium: 'Oil on canvas', dimensions: '28"×36"', description: 'A luminous oil painting of the Thar Desert at golden hour.', image: 'https://images.unsplash.com/photo-1558959356-3f88c4cb26ac?w=600&q=80', likes: 221, year: 2024, sold: false, featured: false },
];

export const SEED_ARTISTS = [
  { _id: 'art1', name: 'Priya Sharma', specialty: 'Madhubani & Acrylic', location: 'Patna, Bihar', artworks: 12, sales: 34, avatar: 'PS' },
  { _id: 'art2', name: 'Rajan Patel', specialty: 'Warli & Oil', location: 'Nashik, MH', artworks: 8, sales: 19, avatar: 'RP' },
  { _id: 'art3', name: 'Ananya Krishnan', specialty: 'Charcoal & Oil', location: 'Chennai, TN', artworks: 15, sales: 41, avatar: 'AK' },
  { _id: 'art4', name: 'Vikram Singh', specialty: 'Graphite', location: 'Varanasi, UP', artworks: 9, sales: 22, avatar: 'VS' },
  { _id: 'art5', name: 'Meera Iyer', specialty: 'Tanjore', location: 'Thanjavur, TN', artworks: 6, sales: 17, avatar: 'MI' },
  { _id: 'art6', name: 'Arjun Mehta', specialty: 'Miniature', location: 'Jaipur, RJ', artworks: 11, sales: 28, avatar: 'AM' },
  { _id: 'art7', name: 'Suresh Das', specialty: 'Pattachitra', location: 'Raghurajpur, OD', artworks: 7, sales: 15, avatar: 'SD' },
  { _id: 'art8', name: 'Zara Ahmed', specialty: 'Digital Art', location: 'Bengaluru, KA', artworks: 20, sales: 67, avatar: 'ZA' },
];

export const CATEGORIES = [
  { value: 'all', label: 'All', emoji: '🎨' },
  { value: 'graphite', label: 'Graphite', emoji: '✏️' },
  { value: 'charcoal', label: 'Charcoal', emoji: '🖤' },
  { value: 'acrylic', label: 'Acrylic', emoji: '🎨' },
  { value: 'oil', label: 'Oil', emoji: '🖌️' },
  { value: 'madhubani', label: 'Madhubani', emoji: '🌸' },
  { value: 'warli', label: 'Warli', emoji: '🔶' },
  { value: 'tanjore', label: 'Tanjore', emoji: '🏛️' },
  { value: 'miniature', label: 'Miniature', emoji: '🔬' },
  { value: 'pattachitra', label: 'Pattachitra', emoji: '🌀' },
  { value: 'digital', label: 'Digital', emoji: '💻' },
];