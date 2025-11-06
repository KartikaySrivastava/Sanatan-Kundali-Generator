// index.js

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow requests from different origins (like your React frontend)
app.use(express.json()); // Parse JSON bodies

// POST route for receiving form data
app.post("/", (req, res) => {
  const { name, dateOfBirth, timeOfBirth, gender, state, city } = req.body;

  console.log("Received data:", {
    name,
    dateOfBirth,
    timeOfBirth,
    gender,
    state,
    city,
  });

  // TODO: Implement any logic you need: saving to a database,
  // performing calculations, etc.

  // For now, just send a simple success response
  return res.status(200).json({
    message: "Data received successfully",
    receivedData: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on https://astrogpt-gallants.onrender.com${PORT}`);
});
