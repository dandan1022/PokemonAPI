const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pokemon = sequelize.define(
  'Pokemon',
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true, // can be unassigned
    },
  },
  {
    tableName: 'pokemons',
    timestamps: true,
  }
);

module.exports = Pokemon;
