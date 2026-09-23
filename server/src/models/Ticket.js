const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    assigned_center_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Center'},
    status: {
        type: String,
        enum: ['Pending', 'InTransit', 'Completed'],
        default: 'Pending'
    },
    waste_type: {type: String, required: true},
    weight: {type: Number},
    pickup_date: {type: Date},
    pickup_coordinates: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], required: true}
    }
}, {timestamps: true});

ticketSchema.index({pickup_coordinates: '2dsphere'});

module.exports = mongoose.model('Ticket', ticketSchema);
