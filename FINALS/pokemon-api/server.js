const express = require('express');
const { sequelize } = require('./models');

const trainerRoutes = require('./routes/trainerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');
const pokedexRoutes = require('./routes/pokedexRoutes'); // ⬅️ new

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/trainers', trainerRoutes);
app.use('/teams', teamRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/pokedex', pokedexRoutes); // ⬅️ mount Pokédex routes here

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Pokemon Team Management API is running' });
});

// Sync DB and start server
sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
