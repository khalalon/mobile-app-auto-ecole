const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Database connection
const Client = require("./Client"); // Import Client model

const Examen = sequelize.define("Examen", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientCin: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Client,
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
    type: DataTypes.DATE,
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
    type: DataTypes.ENUM("CODE", "MANOEUVRE", "PARC"),
    allowNull: false,
  },
});

// Define relationship
Client.hasMany(Examen, { foreignKey: "clientCin" });
Examen.belongsTo(Client, { foreignKey: "clientCin" });

module.exports = Examen;
