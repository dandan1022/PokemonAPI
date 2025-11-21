const express = require('express');
const router = express.Router();
const {
  createPokemon,
  getAllPokemon,
  getPokemonById,
  updatePokemon,
  deletePokemon,
} = require('../controllers/pokemonController');

router.post('/', createPokemon);
router.get('/', getAllPokemon);
router.get('/:id', getPokemonById);
router.put('/:id', updatePokemon);
router.delete('/:id', deletePokemon);

module.exports = router;

