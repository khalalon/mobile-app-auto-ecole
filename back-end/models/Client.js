const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define("Client", {
  cin: { type: DataTypes.INTEGER, primaryKey: true },
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  dateNaissance: DataTypes.DATEONLY,
  sexe: DataTypes.STRING,
  telephone: DataTypes.STRING,
});

module.exports = Client;
