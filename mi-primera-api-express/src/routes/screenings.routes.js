import express from 'express';
import {
  getAllScreenings,
  getScreeningById,
  createScreening,
  updateScreening,
  deleteScreening
} from '../controllers/screenings.controller.js';

const router = express.Router();

// GET 
router.get('/', getAllScreenings);

// GET.
router.get('/:id', getScreeningById);

// POST 
router.post('/', createScreening);

// PUT 
router.put('/:id', updateScreening);

// DELETE
router.delete('/:id', deleteScreening);

export default router;