const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "top_secret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// const express = require("express");
// const passport = require("passport");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const router = express.Router();

// router.post("/login", async (req, res, next) => {
//     const { email, password } = req.body;
//     try {
//         User.findOne({ email: email }, (err, doc) => {
//             console.log(doc);
//             if (err) { } else {
//                 if (!doc) { } else {
//                     bcrypt.compare(password, doc.password, function (err, response) {
//                         console.log(response);
//                         const token = jwt.sign({ doc }, "top_secret")
//                         res.status(200).json({ token });
//                     })
//                 }
//             }

//         })
//     } catch (error) { }

// });
// module.exports = router;
