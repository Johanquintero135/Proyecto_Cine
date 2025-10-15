
import { ticketsDB, screeningsDB, getNextId } from '../data/moviesData.js';

// GET 
export const getAllTickets = (req, res) => {
  try {
    let result = [...ticketsDB];

    //Filtrar por screeningId
    if (req.query.screeningId) {
      const screeningId = parseInt(req.query.screeningId);
      result = result.filter(t => t.screeningId === screeningId);
    }

    // Filtrar por rango de precios
    if (req.query.minPrice) {
      const minPrice = parseFloat(req.query.minPrice);
      result = result.filter(t => t.price >= minPrice);
    }

    if (req.query.maxPrice) {
      const maxPrice = parseFloat(req.query.maxPrice);
      result = result.filter(t => t.price <= maxPrice);
    }

    // Paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResult = result.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      count: result.length,
      page,
      limit,
      data: paginatedResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// GET 
export const getTicketById = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID must be a valid number'
      });
    }

    const ticket = ticketsDB.find(t => t.id === id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: `Ticket with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// POST
export const createTicket = (req, res) => {
  try {
    let { screeningId, seatNumber, price, purchaseDate } = req.body;

    // Convertir tipos
    screeningId = parseInt(screeningId);
    seatNumber = parseInt(seatNumber);
    price = parseFloat(price);

    // Validacion
    if (!screeningId || !seatNumber || !price || !purchaseDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: screeningId, seatNumber, price, purchaseDate'
      });
    }

    const screeningExists = screeningsDB.find(s => s.id === screeningId);
    if (!screeningExists) {
      return res.status(400).json({
        success: false,
        message: `Screening with ID ${screeningId} does not exist`
      });
    }

    if (seatNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Seat number must be positive'
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be positive'
      });
    }

    if (isNaN(Date.parse(purchaseDate))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid purchaseDate format'
      });
    }

    const seatTaken = ticketsDB.find(
      t => t.screeningId === screeningId && t.seatNumber === seatNumber
    );

    if (seatTaken) {
      return res.status(400).json({
        success: false,
        message: `Seat ${seatNumber} is already taken for this screening`
      });
    }

    const newTicket = {
      id: getNextId(ticketsDB),
      screeningId,
      seatNumber,
      price,
      purchaseDate
    };

    ticketsDB.push(newTicket);

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      data: newTicket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// PUT 
export const updateTicket = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID must be a valid number'
      });
    }

    const ticketIndex = ticketsDB.findIndex(t => t.id === id);
    if (ticketIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Ticket with ID ${id} not found`
      });
    }

    const { screeningId, seatNumber, price, purchaseDate } = req.body;

    // Validar screeningId si se proporciona
    if (screeningId !== undefined) {
      const screeningExists = screeningsDB.find(s => s.id === screeningId);
      if (!screeningExists) {
        return res.status(400).json({
          success: false,
          message: `Screening with ID ${screeningId} does not exist`
        });
      }
    }

    const updatedTicket = {
      ...ticketsDB[ticketIndex],
      screeningId: screeningId ?? ticketsDB[ticketIndex].screeningId,
      seatNumber: seatNumber ?? ticketsDB[ticketIndex].seatNumber,
      price: price ?? ticketsDB[ticketIndex].price,
      purchaseDate: purchaseDate ?? ticketsDB[ticketIndex].purchaseDate
    };

    ticketsDB[ticketIndex] = updatedTicket;

    res.status(200).json({
      success: true,
      message: `Ticket with ID ${id} updated successfully`,
      data: updatedTicket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//  DELETE 
export const deleteTicket = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID must be a valid number'
      });
    }

    const index = ticketsDB.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Ticket with ID ${id} not found`
      });
    }

    ticketsDB.splice(index, 1);

    res.status(200).json({
      success: true,
      message: `Ticket with ID ${id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
