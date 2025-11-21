const express = require('express');
const router = express.Router();
const {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainerController');

router.post('/', createTrainer);
router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

module.exports = router;
