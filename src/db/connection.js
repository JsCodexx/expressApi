const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event handlers for Mongoose connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Graceful exit on process termination
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed on app termination");
    process.exit(0);
  });
});

module.exports = mongoose.connection;
