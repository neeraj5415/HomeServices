const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Service = require('../models/Service');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Create a booking (assign real provider based on service)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { service, date, address, notes } = req.body;
    
    // Find the service by name
    const serviceDoc = await Service.findOne({ name: service });
    if (!serviceDoc) {
      return res.status(400).json({ message: 'Service not found' });
    }
    
    // Find a provider who offers this service
    const provider = await User.findOne({
      role: 'provider',
      services: serviceDoc._id
    });
    
    if (!provider) {
      return res.status(400).json({ message: 'No provider available for this service' });
    }
    
    const booking = new Booking({
      user: req.user.userId,
      provider: provider._id,
      service: service,
      date,
      address,
      notes,
      status: 'pending',
    });
    await booking.save();
    
    // Populate provider info for response
    await booking.populate('provider', 'name email');
    
    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking,
      provider: {
        name: provider.name,
        email: provider.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// Get bookings for a provider
router.get('/provider', authenticateToken, authorizeRoles('provider'), async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user.userId }).populate('user', 'name email');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Update booking status (accept/cancel/complete)
router.patch('/:id/status', authenticateToken, authorizeRoles('provider'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['accepted', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, provider: req.user.userId },
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking status updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// Get bookings for a user
router.get('/user', authenticateToken, authorizeRoles('user'), async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).populate('provider', 'name email');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

module.exports = router; 