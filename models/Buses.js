const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true, // Assuming company name is mandatory
    },
    busType: {
      type: String,
      required: true, // Assuming bus type is mandatory
    },
    busNumber: {
      type: String,
      required: true, // Assuming bus number is mandatory
    },
    startCity: {
      type: String,
      required: true, // Start city is mandatory
    },
    destination: {
      type: String,
      required: true, // Destination is mandatory
    },
    totalSeats: {
      type: Number,
      required: true, // Total seats should be a number
      min: 1, // Minimum total seats should be at least 1
    },
    availableSeats: {
      type: Number,
      required: true, // Available seats should be a number
      min: 0, // Minimum available seats should be 0
    },
    pricePerSeat: {
      type: Number,
      required: true, // Price per seat should be a number
      min: 0, // Minimum price should be 0
    },
    departureTime: {
      type: String,
      required: true, // Assuming departure time is mandatory
    },
    arrivalTime: {
      type: String,
      required: true, // Assuming arrival time is mandatory
    },
    departureDate: {
      type: Date,
      required: true, // Assuming departure date is mandatory
    },
    arrivalDate: {
      type: Date,
      required: true, // Assuming arrival date is mandatory
    },
  },
  { collection: "buses" }
);

const Bus = mongoose.model("Bus", BusSchema);
module.exports = Bus;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const BusSchema = new Schema({
//     companyName: {
//         type: String
//     },
//     busType: {
//         type: String
//     },
//     busNumber: {
//         type: String
//     },
//     startCity: {
//         type: String
//     },
//     destination: {
//         type: String
//     },
//     totalSeats: {
//         type: String
//     },
//     availableSeats: {
//         type: String
//     },
//     pricePerSeat: {
//         type: String
//     },
//     departureTime: {
//         type: String
//     },
//     arrivalTime: {
//         type: String
//     },
//     departureDate: {
//         type: Date
//     },
//     arrivalDate: {
//         type: Date
//     }
//     }, { collection: 'buses' });

// const Bus = mongoose.model("Bus", BusSchema);
// module.exports = Bus;
