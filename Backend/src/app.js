const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./db/db');
connectDB();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.get('/', (req, res) => {
  res.send("Testing");
})

module.exports = app;
