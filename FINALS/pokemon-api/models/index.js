const sequelize = require('../config/db');
const Trainer = require('./Trainer');
const Team = require('./Team');
const Pokemon = require('./Pokemon');

// Trainer 1 - N Team
Trainer.hasMany(Team, {
  foreignKey: 'trainerId',
  as: 'teams',
});

Team.belongsTo(Trainer, {
  foreignKey: 'trainerId',
  as: 'trainer',
});

// Team 1 - N Pokemon
Team.hasMany(Pokemon, {
  foreignKey: 'teamId',
  as: 'pokemons',
});

Pokemon.belongsTo(Team, {
  foreignKey: 'teamId',
  as: 'team',
});

module.exports = {
  sequelize,
  Trainer,
  Team,
  Pokemon,
};
