// controllers/teamController.js
const { Team, Trainer, Pokemon } = require('../models');

module.exports = {
  // POST /teams
  createTeam: async (req, res) => {
    try {
      const { name, trainerId } = req.body;

      // check trainer exists
      const trainer = await Trainer.findByPk(trainerId);
      if (!trainer) {
        return res.status(400).json({ error: 'Trainer not found' });
      }

      const team = await Team.create({ name, trainerId });
      res.status(201).json(team);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create team' });
    }
  },

  // GET /teams
  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.findAll({
        include: [
          { model: Trainer, as: 'trainer' },
          { model: Pokemon, as: 'pokemons' },
        ],
      });
      res.json(teams);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  },

  // GET /teams/:id
  getTeamById: async (req, res) => {
    try {
      const { id } = req.params;
      const team = await Team.findByPk(id, {
        include: [
          { model: Trainer, as: 'trainer' },
          { model: Pokemon, as: 'pokemons' },
        ],
      });
      if (!team) return res.status(404).json({ error: 'Team not found' });
      res.json(team);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch team' });
    }
  },

  // GET /teams/trainer/:trainerId
  getTeamsByTrainer: async (req, res) => {
    try {
      const { trainerId } = req.params;
      const teams = await Team.findAll({
        where: { trainerId },
        include: { model: Pokemon, as: 'pokemons' },
      });
      res.json(teams);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch trainer teams' });
    }
  },

  // PUT /teams/:id
  updateTeam: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const team = await Team.findByPk(id);
      if (!team) return res.status(404).json({ error: 'Team not found' });

      team.name = name ?? team.name;
      await team.save();

      res.json(team);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update team' });
    }
  },

  // DELETE /teams/:id
  deleteTeam: async (req, res) => {
    try {
      const { id } = req.params;
      const team = await Team.findByPk(id);
      if (!team) return res.status(404).json({ error: 'Team not found' });

      // Unassign Pokémon from this team
      await Pokemon.update({ teamId: null }, { where: { teamId: id } });

      await team.destroy();
      res.json({ message: 'Team deleted, Pokémon unassigned' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete team' });
    }
  },
};
