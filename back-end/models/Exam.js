const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Incorrect import
const Client = require("./Client"); // Importing function, not model instance

module.exports = (sequelize) => {
  const Examen = sequelize.define("Examen", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientCin: {
      type: DataTypes.STRING, // Type mismatch with Client.cin (INTEGER)
      allowNull: false,
      references: {
        model: Client, // References function, not model
        key: "cin",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    clientNom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateExamen: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    statutPaiement: {
      type: DataTypes.ENUM("Payé", "Non Payé"),
      allowNull: false,
    },
    coutExamen: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    typeExamen: {
      type: DataTypes.ENUM("Code", "Conduit", "Parc"),
      allowNull: false,
    },
  });

  // Define relationship (outside function scope)
  Client.hasMany(Examen, { foreignKey: "clientCin" });
  Examen.belongsTo(Client, { foreignKey: "clientCin" });

  module.exports = Examen; // Syntax error: reassigns export
};