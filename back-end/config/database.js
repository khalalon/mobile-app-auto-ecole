const { Sequelize } = require("sequelize");
const AWS = require("aws-sdk");

const secretsManager = new AWS.SecretsManager();

async function getDatabaseConfig() {
  const secret = await secretsManager
    .getSecretValue({ SecretId: process.env.SECRET_ARN })
    .promise();
  return JSON.parse(secret.SecretString);
}

exports.handler = async (event) => {
  const dbConfig = await getDatabaseConfig();

  const sequelize = new Sequelize(dbConfig.PG_DATABASE, dbConfig.PG_USER, dbConfig.PG_PASSWORD, {
    host: dbConfig.PG_HOST,
    dialect: "postgres",
    logging: false,
  });

  try {
    await sequelize.authenticate();
    return { statusCode: 200, body: JSON.stringify({ message: "Database Connected!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
