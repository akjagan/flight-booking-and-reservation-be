const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const loggedInPage = require("./routes/loggedInUser");
const bookingRoute = require("./routes/routeSelection");
const config = require("./config/keys"); // Adjust the path to your config file

const app = express();

// Load environment variables
require("dotenv").config();
require("./auth/auth"); // Initialize authentication strategies

// Database configuration
const DB_URL = process.env.MongoURI || config.MongoURI; // Use environment variable or config file

// Connect to MongoDB
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process if the connection fails
  });

// CORS Configuration - Secure Setup
const allowedOrigins = [
  "https://flightbooking-frontend11.netlify.app",
  "http://localhost:5174",
]; // Your frontend URL(s)

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));


// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Flight Booking API" });
});

// Routes
app.use("/api", loginRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/register", registerRoute);
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;

// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const passport = require("passport");
// const cors = require("cors");
// const registerRoute = require("./routes/register");
// const loginRoute = require("./routes/login");
// const loggedInPage = require("./routes/loggedInUser");
// const bookingRoute = require("./routes/routeSelection");
// const config = require("./config/keys"); // Adjust the path to your config file

// const app = express();

// // Load environment variables
// require("dotenv").config();
// require("./auth/auth"); // Initialize authentication strategies

// // Database configuration
// const DB_URL = process.env.MongoURI || config.MongoURI; // Use environment variable or config file

// // Connect to MongoDB
// mongoose
//   .connect(DB_URL)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1); // Exit the process if the connection fails
//   });

// // Middleware
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());

// // Root Route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to the Flight Booking API" });
// });

// // Routes
// app.use("/api", loginRoute);
// app.use("/booking", bookingRoute);
// app.use("/api/register", registerRoute);
// app.use(
//   "/user",
//   passport.authenticate("jwt", { session: false }),
//   loggedInPage
// );

// // Handle 404 errors
// app.use((req, res) => {
//   res.status(404).json({ message: "Not Found" });
// });

// // Server Start
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });

// module.exports = app;

// const express = require('express');
// const path = require("path");
// const cookieParser = require('cookie-parser');
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const passport = require("passport");
// const cors = require("cors");
// const registerRoute = require("./routes/register");
// const login = require("./routes/login");
// const loggedInPage = require("./routes/loggedInUser");
// const bookingRoute = require("./routes/routeSelection");
// const config = require("./config/keys"); // Adjust the path to your config file

// const app = express();

// // Login and Register
// require('./auth/auth');
// require("dotenv").config();

// // const registerRoute = require("./routes/register");

// //DB config
// const DB_URL = require("./config/keys").MongoURI;

// //connect to mongo
// // mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   mongoose.connect(process.env.MongoURI)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.error("MongoDB connection error:", err));

//     // MIddleware
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors())

// // Root Route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to the Flight Booking API" });
// });

// //Routes
// app.use('/api', login);
// app.use('/booking', bookingRoute);
// app.use('/api/register', registerRoute);
// app.use("/user", passport.authenticate('jwt', { session: false }), loggedInPage);

// // Handle 404 errors
// app.use((req, res, next) => {
//   res.status(404).json({ messag:"Not Found" })

// })

// //server Start
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });

// module.exports = app;
