import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movies.controller.js';

const router = express.Router();

// GET

router.get('/', getAllMovies);

// GET 
router.get('/:id', getMovieById);

// POST 
router.post('/', createMovie);

// PUT 
router.put('/:id', updateMovie);

// DELETE 
router.delete('/:id', deleteMovie);

export default router;