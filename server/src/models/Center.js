const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    capacity: {type: Number, required: true},
    currentLoad: {type: Number, default: 0},
    accepted_materials: [{type: String}],
    coordinates: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], required: true}
    }
}, {timestamp: true});

centerSchema.index({coordinates: '2dsphere'});

module.exports = mongoose.model('Center', centerSchema);