const { Sequelize } = require("sequelize");
const AWS = require("aws-sdk");
require("dotenv").config();

const secretsManager = new AWS.SecretsManager({ region: process.env.AWS_REGION || "us-east-1" });
let sequelize;
let dbPromise = null;

async function getDatabaseConfig() {
  try {
    console.log("Fetching secret from Secrets Manager:", process.env.SECRET_ARN);
    const startTime = Date.now();
    const secret = await Promise.race([
      secretsManager.getSecretValue({ SecretId: process.env.SECRET_ARN }).promise(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Secrets Manager timeout after 10s")), 10000))
    ]);
    console.log(`Secret retrieved successfully in ${Date.now() - startTime} ms`);
    const config = JSON.parse(secret.SecretString);
    
    // Split PG_HOST if it includes a port
    let host = config.PG_HOST;
    let port = config.PG_PORT || 5432;
    if (host.includes(":")) {
      [host, port] = host.split(":");
      port = parseInt(port, 10);
    }
    
    return {
      PG_USER: config.PG_USER,
      PG_PASSWORD: config.PG_PASSWORD,
      PG_DATABASE: config.PG_DATABASE,
      PG_HOST: host,
      PG_PORT: port
    };
  } catch (error) {
    console.error("Failed to retrieve secret:", error.message, error.stack);
    throw new Error(`Failed to retrieve database config: ${error.message}`);
  }
}

async function initializeDatabase() {
  if (!sequelize) {
    if (!dbPromise) {
      dbPromise = (async () => {
        const dbConfig = await getDatabaseConfig();
        console.log("Initializing Sequelize with host:", dbConfig.PG_HOST, "and port:", dbConfig.PG_PORT);
        const sequelizeStart = Date.now();
        sequelize = new Sequelize(dbConfig.PG_DATABASE, dbConfig.PG_USER, dbConfig.PG_PASSWORD, {
          host: dbConfig.PG_HOST,
          port: dbConfig.PG_PORT,
          dialect: "postgres",
          logging: console.log, // Enable logging for debugging
          pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
        });
        try {
          console.log("Attempting database authentication");
          await sequelize.authenticate();
          console.log(`Database connection established successfully in ${Date.now() - sequelizeStart} ms`);
          return sequelize;
        } catch (error) {
          console.error("Database authentication failed:", error.message, error.stack);
          throw error;
        }
      })();
    }
    return dbPromise;
  }
  return sequelize;
}

module.exports = { initializeDatabase };