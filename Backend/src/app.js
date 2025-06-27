const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
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
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
