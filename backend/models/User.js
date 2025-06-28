const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'provider', 'admin'], required: true },
  phone: { type: String },       //Change for update user profile
  address: { type: String },     // Change for update user profile
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  serviceCategory: { type: String },
  experience: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema); 