const mongoose = require('mongoose');

// Define the train schema
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

// Create the Train model
const Train = mongoose.model('Train', trainSchema);

// Sample train data
const trains =  [
    { trainId: 101, trainName: 'Vadodara Express', source: 'Vadodara', destination: 'Mumbai', departureTime: '06:00', arrivalTime: '08:00', travelDate: new Date('2024-10-21'), classType: ['Sleeper'], fare: 400, seatsAvailable: { sleeper: 100, thirdAC: 0, secondAC: 0, firstAC: 0 } },
    { trainId: 102, trainName: 'Ahmedabad Mail', source: 'Ahmedabad', destination: 'Delhi', departureTime: '10:00', arrivalTime: '22:00', travelDate: new Date('2024-10-22'), classType: ['3AC'], fare: 800, seatsAvailable: { sleeper: 0, thirdAC: 50, secondAC: 0, firstAC: 0 } },
    { trainId: 103, trainName: 'Mumbai Rajdhani', source: 'Mumbai', destination: 'Delhi', departureTime: '14:00', arrivalTime: '05:00', travelDate: new Date('2024-10-21'), classType: ['1AC'], fare: 1500, seatsAvailable: { sleeper: 0, thirdAC: 0, secondAC: 30, firstAC: 20 } },
    { trainId: 104, trainName: 'Hyderabad Express', source: 'Hyderabad', destination: 'Mumbai', departureTime: '09:30', arrivalTime: '16:30', travelDate: new Date('2024-10-22'), classType: ['Sleeper'], fare: 600, seatsAvailable: { sleeper: 80, thirdAC: 0, secondAC: 0, firstAC: 0 } },
    { trainId: 105, trainName: 'Amritsar Junction', source: 'Amritsar', destination: 'Delhi', departureTime: '17:00', arrivalTime: '20:00', travelDate: new Date('2024-10-23'), classType: ['2AC'], fare: 900, seatsAvailable: { sleeper: 0, thirdAC: 0, secondAC: 40, firstAC: 0 } },
    { trainId: 106, trainName: 'Ektangaon Express', source: 'Ektangaon', destination: 'Delhi', departureTime: '18:00', arrivalTime: '22:00', travelDate: new Date('2024-10-24'), classType: ['3AC'], fare: 700, seatsAvailable: { sleeper: 0, thirdAC: 50, secondAC: 0, firstAC: 0 } },
    { trainId: 107, trainName: 'Mathura Express', source: 'Mathura', destination: 'Delhi', departureTime: '07:00', arrivalTime: '09:00', travelDate: new Date('2024-10-25'), classType: ['Sleeper'], fare: 300, seatsAvailable: { sleeper: 60, thirdAC: 0, secondAC: 0, firstAC: 0 } },
    { trainId: 108, trainName: 'Pune Special', source: 'Pune', destination: 'Mumbai', departureTime: '15:00', arrivalTime: '17:00', travelDate: new Date('2024-10-23'), classType: ['2AC'], fare: 800, seatsAvailable: { sleeper: 0, thirdAC: 0, secondAC: 30, firstAC: 0 } },
    { trainId: 109, trainName: 'Bhopal Train', source: 'Bhopal', destination: 'Delhi', departureTime: '20:00', arrivalTime: '07:00', travelDate: new Date('2024-10-24'), classType: ['3AC'], fare: 600, seatsAvailable: { sleeper: 0, thirdAC: 40, secondAC: 0, firstAC: 0 } },
    { trainId: 110, trainName: 'Kolkata Express', source: 'Kolkata', destination: 'Mumbai', departureTime: '22:00', arrivalTime: '12:00', travelDate: new Date('2024-10-26'), classType: ['1AC'], fare: 1800, seatsAvailable: { sleeper: 0, thirdAC: 0, secondAC: 0, firstAC: 20 } },
    { trainId: 111, trainName: 'Delhi Sari', source: 'Delhi', destination: 'Mumbai', departureTime: '11:00', arrivalTime: '17:00', travelDate: new Date('2024-10-25'), classType: ['Sleeper'], fare: 500, seatsAvailable: { sleeper: 90, thirdAC: 0, secondAC: 0, firstAC: 0 } },
    { trainId: 112, trainName: 'Varanasi Express', source: 'Varanasi', destination: 'Delhi', departureTime: '16:00', arrivalTime: '22:00', travelDate: new Date('2024-10-21'), classType: ['3AC'], fare: 750, seatsAvailable: { sleeper: 0, thirdAC: 30, secondAC: 0, firstAC: 0 } },
    { trainId: 113, trainName: 'Chennai Local', source: 'Chennai', destination: 'Hyderabad', departureTime: '12:00', arrivalTime: '18:00', travelDate: new Date('2024-10-23'), classType: ['2AC'], fare: 900, seatsAvailable: { sleeper: 0, thirdAC: 0, secondAC: 50, firstAC: 0 } },
    { trainId: 114, trainName: 'Surat Express', source: 'Surat', destination: 'Mumbai', departureTime: '09:00', arrivalTime: '11:00', travelDate: new Date('2024-10-27'), classType: ['Sleeper'], fare: 400, seatsAvailable: { sleeper: 80, thirdAC: 0, secondAC: 0, firstAC: 0 } },
    { trainId: 115, trainName: 'Agra Express', source: 'Agra', destination: 'Delhi', departureTime: '13:00', arrivalTime: '15:00', travelDate: new Date('2024-10-28'), classType: ['3AC'], fare: 500, seatsAvailable: { sleeper: 0, thirdAC: 60, secondAC: 0, firstAC: 0 } },
    { trainId: 116, trainName: 'Indore Special', source: 'Indore', destination: 'Mumbai', departureTime: '08:00', arrivalTime: '12:00', travelDate: new Date('2024-10-22'), classType: ['2AC'], fare: 850, seatsAvailable: { sleeper: 0, thirdAC: 0, secondAC: 40, firstAC: 0 } },
];
mongoose.connect('mongodb://localhost:27017/Railway', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Database connection successful');
    return Train.insertMany(trains);
})
.then(() => {
    console.log(`${trains.length} trains inserted into the database.`);
})
.catch(err => {
    console.error('Error inserting trains:', err);
})
.finally(() => {
    mongoose.connection.close();
});      
