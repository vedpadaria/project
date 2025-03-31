const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const Train = require('./models/Train');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: false })); 

require("./db/connect");
const RailWayReservation = require("./models/signup");

app.use(cors());

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));


app.get("/RailWayReservation", (req, res) => {
    res.send("Welcome to RailwayReservation System");
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(static_path, 'signup.html')); // Ensure the correct file path
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        // Check if passwords match
        if (password !== cpassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        // Create new user
        const user = new RailWayReservation({
            FullName: req.body.fullName,
            Birthdate: req.body.birthdate,
            Username: req.body.username,
            PhoneNumber: req.body.phoneNumber,
            Password: password
        });

        // Save user to database
        await user.save();
        res.status(201).json({ message: "User registered successfully." });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: "Error registering user." });
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        console.log(req.body);  // Log the incoming request data

        const { username, password } = req.body;  // Match the keys used on the frontend

        if (!username || !password) {
            return res.status(400).send("Username and Password are required");
        }

        const user = await RailWayReservation.findOne({ Username: username });

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.Password === password) {
            res.status(200).send({ message: "Login successful", redirectUrl: "/home" });
          } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send("Server error");
    }
});

app.post('/search-trains', (req, res) => {
    const { source, destination, travelDate } = req.body;
 
    // Mock example of how to retrieve trains (replace with actual DB logic)
    const trains = [
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
 
    const filteredTrains = trains.filter(train => train.source === source && train.destination === destination);
 
    if (filteredTrains.length > 0) {
        res.status(200).json(filteredTrains);
    } else {
        res.status(404).json({ error: 'No trains available for the selected route.' });
    }
 });


// Route to book a ticket
app.post('/bookTicket', async (req, res) => {
    const { trainID, classType, passengers } = req.body;

    try {
        const train = await Train.findOne({ trainID });

        if (!train) {
            return res.status(404).send('Train not found');
        }

        const totalPrice = passengers.length * train.price; // Simplified price calculation
        const booking = new Booking({
            trainID,
            classType,
            passengers,
            totalPrice,
        });

        await booking.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).send('Error booking ticket');
    }
});

app.post('/bookTicket', (req, res) => {
    const { trainID, classType, passengers } = req.body;

    // Simulate train search and check if train exists
    const train = database.findTrainByID(trainID); // Assume this function checks if the train exists

    if (!train) {
        // Return error as JSON
        return res.status(404).json({ success: false, message: "Train not found" });
    }

    // Handle booking process...
    // If successful
    res.json({ success: true, message: "Booking successful", fare: totalFare });
});
app.get("/Home", (req, res) => {
    res.sendFile(path.join(static_path, "Home.html")); // Ensure this file exists
});

app.get("/Dashboard", (req, res) => {
    res.sendFile(path.join(static_path, "Dashboard.html")); // Ensure this file exists
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
