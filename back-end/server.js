const express = require("express");
const { setupDatabase } = require("./models/index");

const app = express();
app.use(express.json()); // Parse JSON bodies

// Routes (we’ll define these below)
const clientsRouter = require("./routes/clients");
const examensRouter = require("./routes/examens");

async function startServer() {
  try {
    // Initialize database and models
    const { sequelize, Client, Exam } = await setupDatabase();
    console.log("Server setup complete.");

    // Attach models to app.locals for use in routes (optional)
    app.locals.models = { Client, Exam };

    // Use route handlers
    app.use("/clients", clientsRouter);
    app.use("/examens", examensRouter);

    // Basic route for testing
    app.get("/", (req, res) => {
      res.send("Server is running!");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();