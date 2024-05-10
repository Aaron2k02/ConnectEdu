const express = require("express");
const cors = require("cors");
const stripe = require("./routes/stripe");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/course.route.js");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/stripe", stripe);

// Mount course routes
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to ConnectEdu API....");
});

app.get("/products", (req, res) => {
    res.send([2, 3, 4]);
});

const port = process.env.PORT || 5000;

// Define connect function before calling it
const connect = async () => {
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

// Call connect function after it's defined
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connect();
});

