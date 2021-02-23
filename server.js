const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Sequelize = require("sequelize");
const cors = require("cors");

// Define Constants
const PORT = process.env.PORT || 8000;

// Express App set up
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
// Log requests to the console
app.use(logger('dev'));
app.use(cors());
// Set up routes
app.use("/api/login", require("./routes/login.js"));
app.use("/api/signup", require("./routes/signup.js"));
app.use("/api/tasks", require("./routes/tasks.js"));
app.use("/api/task", require("./routes/task.js"));
app.use("/api/auth", require("./routes/auth.js"));

// Route setup
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
  console.log("Stop with Ctrl+C");
})