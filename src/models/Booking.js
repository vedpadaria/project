const bookingSchema = new mongoose.Schema({
    trainId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Train' },
    passengerDetails: [{ /* Your passenger details schema */ }],
    // ... other fields
});