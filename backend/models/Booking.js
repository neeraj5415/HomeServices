const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
}, {timestamps: true}
);

module.exports = mongoose.model('Booking', bookingSchema); 