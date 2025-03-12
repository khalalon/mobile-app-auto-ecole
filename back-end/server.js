require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { syncDatabase } = require("./models/index");
  
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins (for development only)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Sync database on startup
syncDatabase();

// Routes
app.use("/clients", require("./routes/clients"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
