const sequelize = require("../config/database");
const Client = require("./Client");
const Exam = require("./Exam");
const Session = require("./Session");
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // This updates the tables if needed
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
};

module.exports = { syncDatabase, Client, Exam, Session };
