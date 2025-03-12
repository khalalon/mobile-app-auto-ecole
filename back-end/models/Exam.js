const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Exam = sequelize.define("Exam", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  examen: DataTypes.STRING,
  dateExamen: DataTypes.DATE,
  fraisPaye: DataTypes.DECIMAL(10, 2),
});

module.exports = Exam;
