const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  acceptedItems: [{
    type: String,
    enum: ['laptop', 'phone', 'television', 'refrigerator', 'other']
  }],
  capacity: {
    type: Number,
    default: 100
  },
  currentLoad: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'full', 'closed'],
    default: 'active'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, { timestamps: true });

facilitySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Facility', facilitySchema);