const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a review
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    
    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to review this booking
    if (booking.user.toString() !== req.user.userId && booking.provider.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to review this booking' });
    }
    
    // Check if booking is completed (accepted or completed status)
    if (booking.status !== 'accepted' && booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review accepted or completed bookings' });
    }
    
    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this booking' });
    }
    
    // Determine who is being reviewed
    const reviewed = req.user.userId === booking.user.toString() ? booking.provider : booking.user;
    
    const review = new Review({
      reviewer: req.user.userId,
      reviewed: reviewed,
      booking: bookingId,
      rating,
      comment
    });
    
    await review.save();
    
    // Populate reviewer and reviewed info
    await review.populate('reviewer', 'name');
    await review.populate('reviewed', 'name');
    
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
});

// Get reviews for a user (provider or user)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const reviews = await Review.find({ reviewed: userId })
      .populate('reviewer', 'name')
      .populate('booking', 'service date')
      .sort({ createdAt: -1 });
    
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// Get reviews by current user
router.get('/my-reviews', authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user.userId })
      .populate('reviewed', 'name')
      .populate('booking', 'service date')
      .sort({ createdAt: -1 });
    
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// Get reviews for a specific booking
router.get('/booking/:bookingId', authenticateToken, async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const review = await Review.findOne({ booking: bookingId })
      .populate('reviewer', 'name')
      .populate('reviewed', 'name');
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json({ review });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching review', error: err.message });
  }
});

// Get average rating for a user
router.get('/average-rating/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await Review.aggregate([
      { $match: { reviewed: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, averageRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
    ]);
    
    const averageRating = result.length > 0 ? result[0].averageRating : 0;
    const totalReviews = result.length > 0 ? result[0].totalReviews : 0;
    
    res.json({ averageRating: Math.round(averageRating * 10) / 10, totalReviews });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating average rating', error: err.message });
  }
});

module.exports = router; 