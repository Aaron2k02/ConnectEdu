const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const courseRoutes = require("./routes/course.route.js");
const authRoute = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");
const roleRoutes = require("./routes/userRole.route.js");
const reviewRoutes = require("./routes/review.route.js");
const ordersRoutes = require("./routes/order.route.js");
const questionAnswerRoutes = require("./routes/questionAnswer.route.js");
const otpRoutes= require("./routes/otp.route.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware for error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    // Set response status and send error message as plain text
    res.status(errorStatus).send(errorMessage);
});


// API End-point
// app.use("/api/stripe", stripeRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);
app.use('/api/userRoles', roleRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/questionAnswer', questionAnswerRoutes);
app.use("/api/otp",otpRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to ConnectEdu API....");
});

app.get("/products", (req, res) => {
    res.send([2, 3, 4]);
});

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
