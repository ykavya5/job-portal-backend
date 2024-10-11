// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(process.env.MONGOOSE_URI_STRING);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process if there's an error
  }
};

module.exports = connectDB;