const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");

router.get("/", (req, res) => {
  res.send("Register Here");
});

// POST /api/register
router.post("/", async (req, res) => {
  try {
    // Hash the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new User instance
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      mobile: req.body.mobile,
      gender: req.body.gender,
      dob: moment(req.body.dob).format("YYYY-MM-DD"),
    });

    // Save the user to the database
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

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
