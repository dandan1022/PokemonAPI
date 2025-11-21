const { Pokemon, Team } = require('../models');

async function ensureTeamHasSpace(teamId) {
  if (!teamId) return; // unassigned is allowed
  const count = await Pokemon.count({ where: { teamId } });
  if (count >= 6) {
    const error = new Error('Team already has 6 Pokémon');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  // POST /pokemon
  createPokemon: async (req, res) => {
    try {
      const { name, type, teamId } = req.body;

      if (teamId) {
        const team = await Team.findByPk(teamId);
        if (!team) return res.status(400).json({ error: 'Team not found' });
        await ensureTeamHasSpace(teamId);
      }

      const pokemon = await Pokemon.create({ name, type, teamId: teamId || null });
      res.status(201).json(pokemon);
    } catch (err) {
      console.error(err);
      res
        .status(err.statusCode || 500)
        .json({ error: 'Failed to create Pokémon', details: err.message });
    }
  },

  // GET /pokemon
  getAllPokemon: async (req, res) => {
    try {
      const pokemons = await Pokemon.findAll();
      res.json(pokemons);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
  },

  // GET /pokemon/:id
  getPokemonById: async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = await Pokemon.findByPk(id);
      if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });
      res.json(pokemon);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
  },

  // PUT /pokemon/:id
  updatePokemon: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, teamId } = req.body;

      const pokemon = await Pokemon.findByPk(id);
      if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });

      if (teamId !== undefined) {
        if (teamId === null) {
          pokemon.teamId = null;
        } else {
          const team = await Team.findByPk(teamId);
          if (!team) return res.status(400).json({ error: 'Team not found' });
          await ensureTeamHasSpace(teamId);
          pokemon.teamId = teamId;
        }
      }

      pokemon.name = name ?? pokemon.name;
      pokemon.type = type ?? pokemon.type;

      await pokemon.save();
      res.json(pokemon);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ error: 'Failed to update Pokémon', details: err.message });
    }
  },

  // DELETE /pokemon/:id
  deletePokemon: async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = await Pokemon.findByPk(id);
      if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });

      await pokemon.destroy();
      res.json({ message: 'Pokémon deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete Pokémon' });
    }
  },
};
