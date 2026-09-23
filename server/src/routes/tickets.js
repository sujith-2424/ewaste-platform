const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { assignOptimalCenter } = require('../services/routing');

router.post('/', async (req, res) => {
  try {
    const { waste_type, weight, pickup_date, coordinates } = req.body;

    // Create a guest user for demo purposes
    const User = require('../models/User');
    const guestUser = await User.create({
      name: 'Guest User',
      email: `guest_${Date.now()}@ewaste.com`,
      address: 'Hyderabad',
      coordinates: { type: 'Point', coordinates }
    });

    const center = await assignOptimalCenter(coordinates, waste_type);
    if (!center) {
      return res.status(422).json({ message: 'No available centers near you.' });
    }

    const ticket = await Ticket.create({
      user_id: guestUser._id,
      waste_type,
      weight,
      pickup_date,
      assigned_center_id: center._id,
      pickup_coordinates: { type: 'Point', coordinates }
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('user_id', 'name email')
      .populate('assigned_center_id', 'name coordinates')
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;