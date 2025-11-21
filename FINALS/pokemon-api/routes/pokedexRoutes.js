const express = require('express');
const router = express.Router();
const gen1Pokemon = require('../data/gen1Pokemon');

// GET /pokedex - all Gen 1
router.get('/', (req, res) => {
  res.json(gen1Pokemon);
});

// IMPORTANT: put name route BEFORE id route

// GET /pokedex/name/:name - by name (case-insensitive)
router.get('/name/:name', (req, res) => {
  const nameParam = req.params.name.toLowerCase();
  const pokemon = gen1Pokemon.find((p) => p.name.toLowerCase() === nameParam);
  if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });
  res.json(pokemon);
});

// GET /pokedex/:id - by numeric ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pokemon = gen1Pokemon.find((p) => p.id === id);
  if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });
  res.json(pokemon);
});

module.exports = router;
