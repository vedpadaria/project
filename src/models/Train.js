// models/Train.js
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainId: Number,
    trainName: String,
    source: String,
    destination: String,
    departureTime: String,
    arrivalTime: String,
    travelDate: Date,
    classType: [String], // Array for different class types like Sleeper, 3AC, 2AC, 1AC
    fare: Number,
    seatsAvailable: {
        sleeper: Number,
        thirdAC: Number,
        secondAC: Number,
        firstAC: Number
    }
});

const Train = mongoose.model('Train', trainSchema);
module.exports = Train;
