import { screeningsDB, moviesDB, getNextId } from '../data/moviesData.js';

// GET /api/screenings - List all screenings with optional filtering
export const getAllScreenings = (req, res) => {
  try {
    let result = [...screeningsDB];
    
    // Filter by movieId
    if (req.query.movieId) {
      const movieId = parseInt(req.query.movieId);
      result = result.filter(s => s.movieId === movieId);
    }
    
    // Filter by room
    if (req.query.room) {
      result = result.filter(s => 
        s.room.toLowerCase().includes(req.query.room.toLowerCase())
      );
    }
    
    // Pagination
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

// GET /api/screenings/:id - Get screening by ID
export const getScreeningById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'ID must be a valid number'
      });
    }
    
    const screening = screeningsDB.find(s => s.id === id);
    
    if (!screening) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Screening with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      success: true,
      data: screening
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// POST /api/screenings - Create new screening
export const createScreening = (req, res) => {
  try {
    const { movieId, room, schedule, availableSeats } = req.body;
    
    // Validation
    if (!movieId || !room || !schedule || availableSeats === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'All fields are required: movieId, room, schedule, availableSeats'
      });
    }
    
    // Validate movieId exists
    const movieExists = moviesDB.find(m => m.id === movieId);
    if (!movieExists) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: `Movie with ID ${movieId} does not exist`
      });
    }
    
    if (typeof availableSeats !== 'number' || availableSeats < 0) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Available seats must be a non-negative number'
      });
    }
    
    const newScreening = {
      id: getNextId(screeningsDB),
      movieId,
      room,
      schedule,
      availableSeats
    };
    
    screeningsDB.push(newScreening);
    
    res.status(201).json({
      success: true,
      message: 'Screening created successfully',
      data: newScreening
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// PUT /api/screenings/:id - Update screening
export const updateScreening = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'ID must be a valid number'
      });
    }
    
    const screeningIndex = screeningsDB.findIndex(s => s.id === id);
    
    if (screeningIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Screening with ID ${id} not found`
      });
    }
    
    const { movieId, room, schedule, availableSeats } = req.body;
    
    // Validate movieId if provided
    if (movieId !== undefined) {
      const movieExists = moviesDB.find(m => m.id === movieId);
      if (!movieExists) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: `Movie with ID ${movieId} does not exist`
        });
      }
    }
    
    if (availableSeats !== undefined && (typeof availableSeats !== 'number' || availableSeats < 0)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Available seats must be a non-negative number'
      });
    }
    
    // Update only provided fields
    screeningsDB[screeningIndex] = {
      ...screeningsDB[screeningIndex],
      ...(movieId && { movieId }),
      ...(room && { room }),
      ...(schedule && { schedule }),
      ...(availableSeats !== undefined && { availableSeats })
    };
    
    res.status(200).json({
      success: true,
      message: 'Screening updated successfully',
      data: screeningsDB[screeningIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// DELETE /api/screenings/:id - Delete screening
export const deleteScreening = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'ID must be a valid number'
      });
    }
    
    const screeningIndex = screeningsDB.findIndex(s => s.id === id);
    
    if (screeningIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Screening with ID ${id} not found`
      });
    }
    
    const deletedScreening = screeningsDB.splice(screeningIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'Screening deleted successfully',
      data: deletedScreening
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};