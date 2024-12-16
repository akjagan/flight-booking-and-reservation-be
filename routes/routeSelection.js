const express = require("express");
const router = express.Router();
const Bus = require("../models/Buses");

// POST /booking: Fetch buses based on startCity and destination
router.post("/", async (req, res) => {
  console.log("POST /booking endpoint hit");
  console.log("Request Body:", req.body);

  const { startCity, destination } = req.body;

  // Validate inputs
  if (!startCity || !destination) {
    console.error("Validation Error: Missing required fields.");
    return res.status(400).json({
      status: false,
      message: "Fields 'startCity' and 'destination' are required.",
    });
  }

  try {
    console.log(
      `Searching for buses from '${startCity}' to '${destination}'...`
    );

    // Query the database for matching buses
    const matchingBuses = await Bus.find({
      startCity: { $regex: new RegExp(`^${startCity}$`, "i") },
      destination: { $regex: new RegExp(`^${destination}$`, "i") },
    });

    if (!matchingBuses || matchingBuses.length === 0) {
      console.warn(
        `No buses found for startCity: '${startCity}' and destination: '${destination}'`
      );

      return res.status(404).json({
        status: false,
        message: `No buses found from '${startCity}' to '${destination}'.`,
      });
    }

    console.log("Matching buses found:", matchingBuses);
    return res.status(200).json({
      status: true,
      message: "Buses found successfully.",
      buses: matchingBuses,
    });
  } catch (error) {
    console.error("Error occurred while fetching bus details:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

// POST /book-ticket: Book tickets for a specific bus
router.post("/book-ticket", async (req, res) => {
  console.log("POST /book-ticket endpoint hit");
  console.log("Request Body:", req.body);

  const { busId, seatsToBook } = req.body;

  // Validate inputs
  if (!busId || !seatsToBook || seatsToBook < 1) {
    console.error("Validation Error: Missing or invalid fields.");
    return res.status(400).json({
      status: false,
      message: "Bus ID and valid number of seats to book are required.",
    });
  }

  try {
    // Find the bus by ID
    const bus = await Bus.findById(busId);
    if (!bus) {
      console.warn(`Bus not found with ID: '${busId}'`);
      return res.status(404).json({
        status: false,
        message: "Bus not found.",
      });
    }

    // Check if there are enough seats available
    if (bus.availableSeats < seatsToBook) {
      console.warn(`Not enough seats available for bus ID: '${busId}'`);
      return res.status(400).json({
        status: false,
        message: `Not enough seats available. Only ${bus.availableSeats} seat(s) left.`,
      });
    }

    // Deduct available seats and save the updated bus
    bus.availableSeats -= seatsToBook;
    await bus.save();

    console.log(
      `Successfully booked ${seatsToBook} seat(s) for bus ID: '${busId}'`
    );
    return res.status(200).json({
      status: true,
      message: `Successfully booked ${seatsToBook} seat(s) for bus '${bus.companyName}'.`,
      bus,
    });
  } catch (error) {
    console.error("Error occurred while booking tickets:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Bus = require("../models/Buses");

// // POST /booking
// router.post("/", async (req, res) => {
//   console.log("POST /booking endpoint hit");
//   console.log("Request Body:", req.body);

//   const { startCity, destination } = req.body; // Removed 'departureDate'

//   // Validate inputs
//   if (!startCity || !destination) {
//     console.error("Validation Error: Missing required fields.");
//     return res.status(400).json({
//       status: false,
//       message: "Fields 'startCity' and 'destination' are required.",
//     });
//   }

//   try {
//     console.log(
//       `Searching for buses from '${startCity}' to '${destination}'...`
//     );

//     // Query the database for matching buses
//     const matchingBuses = await Bus.find({
//       startCity: { $regex: new RegExp(`^${startCity}$`, "i") },
//       destination: { $regex: new RegExp(`^${destination}$`, "i") },
//     });

//     if (!matchingBuses || matchingBuses.length === 0) {
//       console.warn(
//         `No buses found for startCity: '${startCity}' and destination: '${destination}'`
//       );

//       return res.status(404).json({
//         status: false,
//         message: `No buses found from '${startCity}' to '${destination}'.`,
//       });
//     }

//     console.log("Matching buses found:", matchingBuses);
//     return res.status(200).json({
//       status: true,
//       message: "Buses found successfully.",
//       buses: matchingBuses,
//     });
//   } catch (error) {
//     console.error("Error occurred while fetching bus details:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// });

// module.exports = router;
