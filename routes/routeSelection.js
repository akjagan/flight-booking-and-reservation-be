const express = require("express");
const router = express.Router();
const bus = require("../models/Buses");

// POST /booking
router.post("/", async (req, res) => {
  console.log("POST /booking endpoint hit"); // Debug log
  console.log("Request Body:", req.body);

  const { startCity, destination } = req.body;

  // Input validation
  if (!startCity || !destination) {
    console.error("Validation Error: Missing 'startCity' or 'destination'");
    return res.status(400).json({
      status: false,
      message: "Both 'startCity' and 'destination' are required.",
    });
  }

  try {
    console.log(
      `Searching for buses from '${startCity}' to '${destination}'...`
    );

    // Query the database for a matching bus
    const matchingBus = await bus.findOne({ startCity, destination });

    if (!matchingBus) {
      console.warn(
        `No bus found for startCity: '${startCity}', destination: '${destination}'`
      );
      return res.status(404).json({
        status: false,
        message: `No bus found from '${startCity}' to '${destination}'.`,
      });
    }

    // Log success and respond with bus details
    console.log("Matching bus found:", matchingBus);
    return res.status(200).json({
      status: true,
      message: "Bus found successfully.",
      data: matchingBus,
    });
  } catch (error) {
    // Log error and respond with an error message
    console.error("Error occurred while fetching bus details:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

module.exports = router;

// const express = require('express')
// const router = express.Router();
// const bus = require("../models/Buses");

// router.post('/', async(req, res) => {
//     // res.json({ status: true, message: "bus selected" })
//     await bus.findOne({ "startCity": req.body.startCity, "destination": req.body.destination }).exec((err, bus) => {
//         if (err) {
//             res.json({ status: false, message: "error while searching with ID"})
//         }
//         else {
//             res.json({ status: true, bus: bus })
//         }

//     })

// })

// // router.post("/", (req, res) => {
// //     bus.findOne({ _id: req.body.bId }, (err, bus) => {
// //         if (err) {
// //             res.json({ status: false, message: "error while searching with ID"})
// //         }
// //         else {
// //             res.json({ status: true, bus: bus })
// //         }

// //     })
// // })
// module.exports = router;
