const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Client = sequelize.define(
    "Client",
    {
      cin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nom: {
        type: DataTypes.STRING,
      },
      prenom: {
        type: DataTypes.STRING,
      },
      dateNaissance: {
        type: DataTypes.DATEONLY,
      },
      sexe: {
        type: DataTypes.STRING,
      },
      telephone: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "clients",
      timestamps: true,
    }
  );

  return Client;
};