const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Session = sequelize.define("Session", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  seance: DataTypes.STRING,
  dateSeance: DataTypes.DATE,
  fraisPaye: DataTypes.DECIMAL(10, 2),
});

module.exports = Session;
