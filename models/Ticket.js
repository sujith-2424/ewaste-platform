const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true,
    enum: ['laptop', 'phone', 'television', 'refrigerator', 'other']
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  }
}, { timestamps: true });

ticketSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Ticket', ticketSchema);