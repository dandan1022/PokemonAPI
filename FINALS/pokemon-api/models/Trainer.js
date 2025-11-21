const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Trainer = sequelize.define(
  'Trainer',
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: 'trainers',
    timestamps: true,
  }
);

module.exports = Trainer;
