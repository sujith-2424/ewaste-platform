const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    coordinates: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: { type: [Number], required: true}
    }
}, {timestamps: true});

userSchema.index({coordinates: '2dsphere'});

module.exports = mongoose.model('User', userSchema);