const sequelize = require("../config/database");
const Client = require("./Client");
const Exam = require("./Exam");
const Session = require("./Session");

// Ensure relationships are established
Client.hasMany(Exam, { foreignKey: "clientCin" });
Exam.belongsTo(Client, { foreignKey: "clientCin" });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Apply schema updates
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = { Client, Exam, syncDatabase };
