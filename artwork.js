/**
 * ARTSPHERE — models/Artwork.js
 * MongoDB schema for artworks
 */

const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: false
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['graphite', 'charcoal', 'acrylic', 'oil', 'madhubani', 'warli', 'tanjore', 'miniature', 'pattachitra', 'digital', 'other'],
      message: 'Invalid art category'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [100, 'Minimum price is ₹100']
  },
  medium: {
    type: String,
    trim: true,
    default: 'Mixed media'
  },
  dimensions: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  imagePublicId: String,         // for cloud storage
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],   // user IDs who liked
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  },
  sold: { type: Boolean, default: false },
  soldAt: Date,
  featured: { type: Boolean, default: false },
  tags: [String],
  views: { type: Number, default: 0 }
}, {
  timestamps: true,              // createdAt + updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ── INDEXES ──
artworkSchema.index({ category: 1 });
artworkSchema.index({ price: 1 });
artworkSchema.index({ artist: 'text', title: 'text', description: 'text' });
artworkSchema.index({ createdAt: -1 });
artworkSchema.index({ likes: -1 });

// ── VIRTUALS ──
artworkSchema.virtual('priceFormatted').get(function () {
  return '₹' + this.price.toLocaleString('en-IN');
});

// ── MIDDLEWARE ──
artworkSchema.pre('save', function (next) {
  if (this.isModified('sold') && this.sold && !this.soldAt) {
    this.soldAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Artwork', artworkSchema);