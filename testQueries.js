const mongoose = require("mongoose");
const Bus = require("./models/Buses"); // Adjust the path to your Buses model if needed
require("dotenv").config();

// MongoDB Connection
const DB_URL = process.env.MongoURI;
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB Connected for Test Queries"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit if the connection fails
  });

// Test Query Function
const testQueries = async () => {
  try {
    // Example Query: Fetch buses from 'Chennai' to 'Coimbatore' on '10/12/2024'
    const results = await Bus.find({
      startCity: "Chennai",
      destination: "Coimbatore",
      departureDate: "10/12/2024",
    });

    console.log("Query Results:", results);

    if (results.length === 0) {
      console.log("No buses found for the given criteria.");
    }
  } catch (error) {
    console.error("Error during test query execution:", error.message);
  } finally {
    // Close MongoDB connection
    mongoose.connection.close();
  }
};

// Execute the test queries
testQueries();
