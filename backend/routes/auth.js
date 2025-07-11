const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const { authenticateToken } = require('../middleware/auth');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Provider seeding endpoint
router.post('/providers/seed', async (req, res) => {
  const providers = [
    { name: 'Plumber', email: 'plumber@demo.com', password: 'plumber123', role: 'provider' },
    { name: 'Beautician', email: 'beautician@demo.com', password: 'beautician123', role: 'provider' },
    { name: 'Pest Control', email: 'pestcontrol@demo.com', password: 'pest123', role: 'provider' },
    { name: 'Electrician', email: 'electrician@demo.com', password: 'electrician123', role: 'provider' },
  ];
  try {
    const results = [];
    for (const p of providers) {
      let user = await User.findOne({ email: p.email });
      if (!user) {
        const hashedPassword = await bcrypt.hash(p.password, 10);
        user = new User({ ...p, password: hashedPassword });
        await user.save();
        results.push({ email: p.email, status: 'created' });
      } else {
        results.push({ email: p.email, status: 'already exists' });
      }
    }
    res.json({ message: 'Providers seeded', results });
  } catch (err) {
    res.status(500).json({ message: 'Error seeding providers', error: err.message });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update current user profile
router.patch('/profile', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // Prevent password update here
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, select: '-password' });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/all-users', authenticateToken, require('../middleware/auth').authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('services');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update provider's services (admin only)
router.put('/providers/:id/services', authenticateToken, require('../middleware/auth').authorizeRoles('admin'), async (req, res) => {
  try {
    const providerId = req.params.id;
    const { services } = req.body; // Array of service IDs
    
    console.log('Updating provider services:', { providerId, services }); // Debug log
    
    // Validate that services is an array
    if (!Array.isArray(services)) {
      return res.status(400).json({ message: 'Services must be an array' });
    }
    
    // Ensure the user is a provider
    const provider = await User.findOneAndUpdate(
      { _id: providerId, role: 'provider' },
      { services },
      { new: true, select: '-password' }
    ).populate('services');
    
    if (!provider) {
      console.log('Provider not found:', providerId); // Debug log
      return res.status(404).json({ message: 'Provider not found' });
    }
    
    console.log('Provider updated successfully:', provider); // Debug log
    res.json({ message: 'Provider services updated', provider });
  } catch (err) {
    console.error('Error updating provider services:', err); // Debug log
    res.status(500).json({ message: 'Error updating provider services', error: err.message });
  }
});

module.exports = router; 