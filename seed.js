const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

// Define your schema for buses
const BusSchema = new mongoose.Schema({
  CompanyName: String,
  busType: String,
  busNumber: String,
  startCity: String,
  destination: String,
  totalSeats: Number,
  availableSeats: Number,
  pricePerSeat: Number,
  date: String,
});

const Bus = mongoose.model("Bus", BusSchema);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Load JSON file from routes.json in the root directory
    const jsonData = fs.readFileSync("routes.json", "utf-8");
    const buses = JSON.parse(jsonData);

    // Delete existing data
    await Bus.deleteMany({});
    console.log("Existing bus data cleared");

    // Insert new data
    await Bus.insertMany(buses);
    console.log("Bus data seeded successfully");
    process.exit(0); // Exit the process after successful seeding
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
};

// Execute the seeding logic
connectDB().then(seedData);
