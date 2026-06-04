const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  price:       { type: Number, required: true, min: 0 },
  category:    {
    type: String,
    required: true,
    enum: ['Starters', 'Main Course', 'Biryani', 'Breads', 'Desserts', 'Beverages'],
    default: 'Starters',
  },
  image:       { type: String, default: '' },
  isVeg:       { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true },
  isPopular:   { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
