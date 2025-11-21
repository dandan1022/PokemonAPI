// controllers/trainerController.js
const { Trainer, Team } = require('../models');

module.exports = {
  // POST /trainers
  createTrainer: async (req, res) => {
    try {
      console.log('REQ HEADERS:', req.headers);
      console.log('REQ BODY:', req.body);

      const { name, email } = req.body;
      const trainer = await Trainer.create({ name, email });
      res.status(201).json(trainer);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'Failed to create trainer', details: err.message });
    }
  },

  // GET /trainers
  getAllTrainers: async (req, res) => {
    try {
      const trainers = await Trainer.findAll({
        include: { model: Team, as: 'teams' },
      });
      res.json(trainers);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch trainers' });
    }
  },

  // GET /trainers/:id
  getTrainerById: async (req, res) => {
    try {
      const { id } = req.params;
      const trainer = await Trainer.findByPk(id, {
        include: { model: Team, as: 'teams' },
      });
      if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
      res.json(trainer);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch trainer' });
    }
  },

  // PUT /trainers/:id
  updateTrainer: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const trainer = await Trainer.findByPk(id);
      if (!trainer) return res.status(404).json({ error: 'Trainer not found' });

      trainer.name = name ?? trainer.name;
      trainer.email = email ?? trainer.email;

      await trainer.save();
      res.json(trainer);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update trainer' });
    }
  },

  // DELETE /trainers/:id
  deleteTrainer: async (req, res) => {
    try {
      const { id } = req.params;
      const trainer = await Trainer.findByPk(id);
      if (!trainer) return res.status(404).json({ error: 'Trainer not found' });

      await trainer.destroy();
      res.json({ message: 'Trainer deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete trainer' });
    }
  },
};
