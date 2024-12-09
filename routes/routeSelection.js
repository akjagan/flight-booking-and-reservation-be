const express = require("express");
const router = express.Router();
const Bus = require("../models/Buses");

// POST /booking
router.post("/", async (req, res) => {
  console.log("POST /booking endpoint hit");
  console.log("Request Body:", req.body);

  const { startCity, destination } = req.body; // Removed 'departureDate'

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

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const dayjs = require("dayjs");
// const Bus = require("../models/Buses");

// // POST /booking
// router.post("/", async (req, res) => {
//   console.log("POST /booking endpoint hit");
//   console.log("Request Body:", req.body);

//   const { startCity, destination, departureDate } = req.body;

//   // Validate inputs
//   if (!startCity || !destination || !departureDate) {
//     console.error("Validation Error: Missing required fields.");
//     return res.status(400).json({
//       status: false,
//       message:
//         "Fields 'startCity', 'destination', and 'departureDate' are required.",
//     });
//   }

//   try {
//     console.log(
//       `Searching for buses from '${startCity}' to '${destination}' for date '${departureDate}'...`
//     );

//     // Ensure the date format is MM/DD/YYYY
//     const standardizedDate = dayjs(departureDate, "MM/DD/YYYY", true).format(
//       "MM/DD/YYYY"
//     );

//     if (!dayjs(standardizedDate, "MM/DD/YYYY").isValid()) {
//       console.error("Invalid date format provided:", departureDate);
//       return res.status(400).json({
//         status: false,
//         message: "Invalid date format. Please use 'MM/DD/YYYY'.",
//       });
//     }

//     // Convert to DD/MM/YYYY for MongoDB comparison
//     const mongoDBDateFormat = dayjs(standardizedDate, "MM/DD/YYYY").format(
//       "DD/MM/YYYY"
//     );

//     console.log("Converted Date for MongoDB:", mongoDBDateFormat);

//     // Query the database for matching buses
//     const matchingBuses = await Bus.find({
//       startCity: { $regex: new RegExp(`^${startCity}$`, "i") },
//       destination: { $regex: new RegExp(`^${destination}$`, "i") },
//       date: mongoDBDateFormat, // Use the converted date format
//     });

//     if (!matchingBuses || matchingBuses.length === 0) {
//       console.warn(
//         `No buses found for startCity: '${startCity}', destination: '${destination}', date: '${mongoDBDateFormat}'`
//       );

//       return res.status(404).json({
//         status: false,
//         message: `No buses found from '${startCity}' to '${destination}' on '${mongoDBDateFormat}'.`,
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

// const express = require("express");
// const router = express.Router();
// const dayjs = require("dayjs");
// const Bus = require("../models/Buses"); // Ensure this points to your Mongoose schema

// // POST /booking
// router.post("/", async (req, res) => {
//   console.log("POST /booking endpoint hit"); // Debug log
//   console.log("Request Body:", req.body);

//   const { startCity, destination, departureDate } = req.body;

//   // Validate inputs
//   if (!startCity || !destination || !departureDate) {
//     console.error("Validation Error: Missing required fields.");
//     return res.status(400).json({
//       status: false,
//       message:
//         "Fields 'startCity', 'destination', and 'departureDate' are required.",
//     });
//   }

//   try {
//     console.log(
//       `Searching for buses from '${startCity}' to '${destination}' for date '${departureDate}'...`
//     );

//     // Attempt to parse and standardize the date format
//     const parsedDate = dayjs(departureDate, ["DD/MM/YYYY", "MM/DD/YYYY"], true);
//     if (!parsedDate.isValid()) {
//       console.error("Invalid date format provided:", departureDate);
//       return res.status(400).json({
//         status: false,
//         message:
//           "Invalid date format. Please use 'DD/MM/YYYY' or 'MM/DD/YYYY'.",
//       });
//     }

//     const standardizedDate = parsedDate.format("DD/MM/YYYY");
//     console.log("Standardized Date:", standardizedDate);

//     // Query the database for matching buses
//     const matchingBuses = await Bus.find({
//       startCity: { $regex: new RegExp(`^${startCity}$`, "i") }, // Case-insensitive match
//       destination: { $regex: new RegExp(`^${destination}$`, "i") }, // Case-insensitive match
//       date: standardizedDate, // Match the standardized date
//     });

//     if (!matchingBuses || matchingBuses.length === 0) {
//       console.warn(
//         `No buses found for startCity: '${startCity}', destination: '${destination}', date: '${standardizedDate}'`
//       );

//       return res.status(404).json({
//         status: false,
//         message: `No buses found from '${startCity}' to '${destination}' on '${standardizedDate}'.`,
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

// const express = require("express");
// const router = express.Router();
// const dayjs = require("dayjs");
// const Bus = require("../models/Buses"); // Ensure this points to your Mongoose schema

// // POST /booking
// router.post("/", async (req, res) => {
//   console.log("POST /booking endpoint hit"); // Debug log
//   console.log("Request Body:", req.body);

//   const { startCity, destination, departureDate } = req.body;

//   // Validate inputs
//   if (!startCity || !destination || !departureDate) {
//     console.error("Validation Error: Missing required fields.");
//     return res.status(400).json({
//       status: false,
//       message:
//         "Fields 'startCity', 'destination', and 'departureDate' are required.",
//     });
//   }

//   try {
//     console.log(
//       `Searching for buses from '${startCity}' to '${destination}' for date '${departureDate}'...`
//     );

//     // Validate and format the date
//     const formattedDate = dayjs(departureDate, "DD/MM/YYYY").isValid()
//       ? dayjs(departureDate, "DD/MM/YYYY").format("DD/MM/YYYY")
//       : null;

//     if (!formattedDate) {
//       console.error("Invalid date format provided:", departureDate);
//       return res.status(400).json({
//         status: false,
//         message: "Invalid date format. Please use 'DD/MM/YYYY'.",
//       });
//     }

//     console.log("Formatted Date:", formattedDate);

//     // Query the database for matching buses
//     const matchingBuses = await Bus.find({
//       startCity: { $regex: new RegExp(`^${startCity}$`, "i") }, // Case-insensitive match
//       destination: { $regex: new RegExp(`^${destination}$`, "i") }, // Case-insensitive match
//       date: formattedDate, // Match the formatted date
//     });

//     if (!matchingBuses || matchingBuses.length === 0) {
//       console.warn(
//         `No buses found for startCity: '${startCity}', destination: '${destination}', date: '${formattedDate}'`
//       );

//       return res.status(404).json({
//         status: false,
//         message: `No buses found from '${startCity}' to '${destination}' on '${formattedDate}'.`,
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

// const express = require("express");
// const router = express.Router();
// const dayjs = require("dayjs");
// const Bus = require("../models/Buses");

// // POST /booking
// router.post("/", async (req, res) => {
//   console.log("POST /booking endpoint hit"); // Debug log
//   console.log("Request Body:", req.body);

//   const { startCity, destination, date } = req.body;

//   // Validate inputs
//   if (!startCity || !destination || !date) {
//     console.error("Validation Error: Missing required fields.");
//     return res.status(400).json({
//       status: false,
//       message: "Fields 'startCity', 'destination', and 'date' are required.",
//     });
//   }

//   try {
//     console.log(
//       `Searching for buses from '${startCity}' to '${destination}' on '${date}'...`
//     );

//     // Format the date to match the database format (assuming DD/MM/YYYY format in DB)
//     const formattedDate = dayjs(date).format("DD/MM/YYYY");

//     // Find buses matching the criteria in the database
//     const matchingBuses = await Bus.find({
//       startCity,
//       destination,
//       date: new RegExp(`^${formattedDate}$`, "i"), // Match exactly
//     });

//     if (!matchingBuses || matchingBuses.length === 0) {
//       console.warn(
//         `No buses found for startCity: '${startCity}', destination: '${destination}', date: '${formattedDate}'`
//       );
//       return res.status(404).json({
//         status: false,
//         message: `No buses found from '${startCity}' to '${destination}' on '${formattedDate}'.`,
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
