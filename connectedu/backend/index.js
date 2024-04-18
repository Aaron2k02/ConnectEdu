const express = require("express");
const stripe = require("./routes/stripe")

const app = express();

require("dotenv").config();

app.use(express.json());

app.use("/api/stripe", stripe);