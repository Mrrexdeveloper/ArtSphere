/**
 * ARTSPHERE — models/Artist.js
 * MongoDB schema for artists
 */

const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  specialty: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  avatar: String,
  website: String,
  instagram: String,

  // Stats (denormalised for fast reads)
  artworkCount: { type: Number, default: 0 },
  totalSales:   { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },

  verified: { type: Boolean, default: false },
  active:   { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual: initials (used in UI avatars)
artistSchema.virtual('initials').get(function () {
  return this.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
});

module.exports = mongoose.model('Artist', artistSchema);