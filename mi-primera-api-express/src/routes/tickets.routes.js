import express from 'express';
import {getAllTickets,getTicketById,createTicket,updateTicket,deleteTicket} from '../controllers/tickets.controller.js';

const router = express.Router();

// GET /api/tickets - List all tickets (with optional filters)
// Query params: ?screeningId=1&minPrice=10&maxPrice=20&page=1&limit=10
router.get('/', getAllTickets);

// GET /api/tickets/:id - Get ticket by ID
router.get('/:id', getTicketById);

// POST /api/tickets - Create new ticket
router.post('/', createTicket);

// PUT /api/tickets/:id - Update ticket
router.put('/:id', updateTicket);

// DELETE /api/tickets/:id - Delete ticket
router.delete('/:id', deleteTicket);

export default router;