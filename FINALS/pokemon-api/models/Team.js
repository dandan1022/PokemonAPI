const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Team = sequelize.define(
  'Team',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trainerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'teams',
    timestamps: true,
  }
);

module.exports = Team;
