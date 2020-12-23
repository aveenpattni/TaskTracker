const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Define Constants
const PORT = process.env.PORT || 8000;

// Express App set up
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
// app.use("/api", require("./routes/api.js"));

// Route setup
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
  console.log("Stop with Ctrl+C");
})