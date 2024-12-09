const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");

// GET /api/register - Health Check
router.get("/", (req, res) => {
  console.log("Register health check endpoint hit");
  res.status(200).send("Register Here");
});

// POST /api/register - Register a New User
router.post("/", async (req, res) => {
  try {
    console.log("Register endpoint hit");
    console.log("Request body:", req.body);

    const { name, email, password, mobile, gender } = req.body;

    // Input validation
    if (!name || !email || !password || !mobile || !gender) {
      console.error("Validation Error: Missing fields");
      return res.status(400).json({
        status: false,
        message:
          "All fields (name, email, password, mobile, gender, dob) are required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("User already exists with email:", email);
      return res.status(409).json({
        status: false,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      gender,
      // dob: moment(dob).format("YYYY-MM-DD"),
    });

    await user.save();

    console.log("User registered successfully:", user);
    return res.status(201).json({
      status: true,
      message: "User registered successfully.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        // dob: user.dob,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const moment = require("moment");

// router.get("/", (req, res) => {
//   res.send("Register Here");
// });

// // POST /api/register
// router.post("/", async (req, res) => {
//   try {
//     // Hash the password
//     const hashPassword = await bcrypt.hash(req.body.password, 10);

//     // Create a new User instance
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashPassword,
//       mobile: req.body.mobile,
//       gender: req.body.gender,
//       dob: moment(req.body.dob).format("YYYY-MM-DD"),
//     });

//     // Save the user to the database
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const moment = require("moment");
// const bodyParser = require("body-parser");

// router.get("/", (req, res) => {
//   res.send("Register Here");
// });

// // Body-Parser
// const jsonParser = bodyParser.json();
// router.post("/", jsonParser, async (req, res) => {
//   try {
//     // Hash the password
//     const hashPassword = await bcrypt.hash(req.body.password, 10);

//     // Create a new User instance
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashPassword,
//       mobile: req.body.mobile,
//       gender: req.body.gender,
//       dob: moment(req.body.dob).format("YYYY-MM-DD"),
//     });

//     // Save the user to the database
//     user.save((err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//       } else {
//         res.status(201).json(result);
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
