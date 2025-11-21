// routes/teamRoutes.js
const express = require('express');
const router = express.Router();

const {
  createTeam,
  getAllTeams,
  getTeamById,
  getTeamsByTrainer,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController'); // ⬅️ IMPORTANT: teamController

// POST /teams
router.post('/', createTeam);

// GET /teams
router.get('/', getAllTeams);

// GET /teams/:id
router.get('/:id', getTeamById);

// GET /teams/trainer/:trainerId
router.get('/trainer/:trainerId', getTeamsByTrainer);

// PUT /teams/:id
router.put('/:id', updateTeam);

// DELETE /teams/:id
router.delete('/:id', deleteTeam);

module.exports = router;
