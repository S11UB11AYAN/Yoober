const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes')
connectDB();


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.get('/', (req, res) => {
  res.send("Testing");
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);

module.exports = app;
