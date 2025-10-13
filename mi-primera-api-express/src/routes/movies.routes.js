import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movies.controller.js';

const router = express.Router();

// GET /api/movies - List all movies (with optional filters)
// Query params: ?genre=Action&minRating=8&page=1&limit=10
router.get('/', getAllMovies);

// GET /api/movies/:id - Get movie by ID
router.get('/:id', getMovieById);

// POST /api/movies - Create new movie
router.post('/', createMovie);

// PUT /api/movies/:id - Update movie
router.put('/:id', updateMovie);

// DELETE /api/movies/:id - Delete movie
router.delete('/:id', deleteMovie);

export default router;