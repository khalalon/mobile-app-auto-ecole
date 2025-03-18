const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Examen = sequelize.define("Examen", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientCin: {
      type: DataTypes.INTEGER, 
      allowNull: false,
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

  return Examen;
};