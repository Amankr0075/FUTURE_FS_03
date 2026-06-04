const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  email:          { type: String, required: true, trim: true, lowercase: true },
  phone:          { type: String, required: true, trim: true },
  guests:         { type: Number, required: true, min: 1, max: 20 },
  date:           { type: String, required: true },
  time:           { type: String, required: true },
  specialRequest: { type: String, default: '', trim: true },
  status:         { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  // Payment fields
  paymentId:      { type: String, default: null },
  orderId:        { type: String, default: null },
  amountPaid:     { type: Number, default: 0 },
  paymentStatus:  { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
