const { initializeDatabase } = require("../config/database");
const ClientModel = require("./Client");
const ExamModel = require("./Exam");

let models = {};
let initialized = false;

async function setupDatabase() {
  console.log("Setting up database");
  const sequelize = await initializeDatabase();

  if (!initialized) {
    // Initialize models
    console.log("Initializing Client model");
    models.Client = ClientModel(sequelize);
    console.log("Client model initialized:", typeof models.Client, models.Client.name);

    console.log("Initializing Exam model");
    models.Exam = ExamModel(sequelize);
    console.log("Exam model initialized:", typeof models.Exam, models.Exam.name);

    // Define relationships
    console.log("Defining model relationships");
    try {
      models.Client.hasMany(models.Exam, { foreignKey: "clientCin", as: "exams" });
      models.Exam.belongsTo(models.Client, { foreignKey: "clientCin", as: "client" });
      console.log("Relationships defined successfully");
    } catch (error) {
      console.error("Error defining relationships:", error.message, error.stack);
      throw error;
    }

    // Sync database (use migrations in production)
    console.log("Syncing database");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");

    initialized = true; // Prevent re-initialization in Lambda
  }

  return { sequelize, ...models };
}

module.exports = { setupDatabase };