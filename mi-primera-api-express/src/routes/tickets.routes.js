import express from 'express';
import {getAllTickets,getTicketById,createTicket,updateTicket,deleteTicket} from '../controllers/tickets.controller.js';

const router = express.Router();

// GET 

router.get('/', getAllTickets);

// GET 
router.get('/:id', getTicketById);

// POST 
router.post('/', createTicket);

// PUT 
router.put('/:id', updateTicket);

// DELETE 
router.delete('/:id', deleteTicket);

export default router;