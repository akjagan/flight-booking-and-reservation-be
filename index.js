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
const config = require("./config/keys");

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

// CORS Configuration - Dynamic setup for local development and deployment
const allowedOrigins = [
  "http://localhost:5174", // Local development
  "https://flightbooking-frontend11.netlify.app", // Production frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: Origin '${origin}' is not allowed`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies or credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

// Apply CORS middleware
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
console.log("Login route loaded from login.js");

app.use("/api/booking", bookingRoute);
console.log("Booking route loaded from routeSelection.js");

app.use("/api/register", registerRoute);
console.log("Register route loaded from register.js");

app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
);

// Preflight (OPTIONS) request handler
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200); // Respond to OPTIONS requests
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

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
