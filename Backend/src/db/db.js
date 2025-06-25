const mongoose = require('mongoose');
const {DB_NAME} = require('../constants')

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB connected !!! DB Host: ${connectionInstance.connection.host}`)
  }
  catch (error) {
    console.log("MONGODB CONNECTION ERROR: ", error)
    process.exit(1)
  }
}

module.exports = connectDB;
