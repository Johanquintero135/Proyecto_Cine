import express from 'express';
import moviesRouter from './src/routes/movies.routes.js';
import screeningsRouter from './src/routes/screenings.routes.js';
import ticketsRouter from './src/routes/tickets.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Rutas modulares
app.use('/api/movies', moviesRouter);
app.use('/api/screenings', screeningsRouter);
app.use('/api/tickets', ticketsRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Cinema API - Routing Avanzado',
    student: 'JOHAN ALEJANDRO QUINTERO BARROS',
    ficha: '3147235',
    version: '1.0.0',
    endpoints: {
      movies: '/api/movies',
      screenings: '/api/screenings',
      tickets: '/api/tickets'
    }
  });
});

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎬 Cinema API running on http://localhost:${PORT}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   - Movies:      http://localhost:${PORT}/api/movies`);
  console.log(`   - Screenings:  http://localhost:${PORT}/api/screenings`);
  console.log(`   - Tickets:     http://localhost:${PORT}/api/tickets`);
});

export default app;