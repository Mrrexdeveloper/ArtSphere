/**
 * ARTSPHERE — server.js
 * Node.js + Express backend
 * Run: npm install && node server.js
 */

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const multer     = require('multer');
const path       = require('path');
const fs         = require('fs');

require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ──
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── MONGODB ──
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/artsphere';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected:', MONGO_URI))
  .catch(err => console.error('❌ MongoDB error:', err));

// ── MULTER (Image Upload) ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  }
});

// ── ROUTES ──
const artworkRoutes = require('./routes/artworks');
const artistRoutes  = require('./routes/artists');

app.use('/api/artworks', artworkRoutes);
app.use('/api/artists',  artistRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 ArtSphere backend running on http://localhost:${PORT}`);
});

module.exports = { app, upload };