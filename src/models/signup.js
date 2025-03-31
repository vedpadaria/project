const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Birthdate: {
        type: Date,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const RailWayReservation = mongoose.model('RailWayReservation', userSchema, "user");

module.exports = RailWayReservation;
