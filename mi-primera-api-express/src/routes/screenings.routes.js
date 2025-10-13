import express from 'express';
import {
  getAllScreenings,
  getScreeningById,
  createScreening,
  updateScreening,
  deleteScreening
} from '../controllers/screenings.controller.js';

const router = express.Router();

// GET /api/screenings - List all screenings (with optional filters)
// Query params: ?movieId=1&room=IMAX&page=1&limit=10
router.get('/', getAllScreenings);

// GET /api/screenings/:id - Get screening by ID
router.get('/:id', getScreeningById);

// POST /api/screenings - Create new screening
router.post('/', createScreening);

// PUT /api/screenings/:id - Update screening
router.put('/:id', updateScreening);

// DELETE /api/screenings/:id - Delete screening
router.delete('/:id', deleteScreening);

export default router;