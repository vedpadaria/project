const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
});


module.exports = mongoose.model('Passenger', passengerSchema);
