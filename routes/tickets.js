const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// POST /api/tickets — user submits a new e-waste ticket
router.post('/', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    res.status(201).json({
      message: 'Ticket created successfully!',
      ticket: savedTicket
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/tickets — admin gets all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/tickets/:id — admin updates ticket status
router.patch('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;