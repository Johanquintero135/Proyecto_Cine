import { screeningsDB, moviesDB, getNextId } from '../data/moviesData.js';

// GET
export const getAllScreenings = (req, res) => {
  try {
    let result = [...screeningsDB];
    
    // Filtrar por movieId
    if (req.query.movieId) {
      const movieId = parseInt(req.query.movieId);
      result = result.filter(s => s.movieId === movieId);
    }
    
    // Filtrar por habitación
    if (req.query.room) {
      result = result.filter(s => 
        s.room.toLowerCase().includes(req.query.room.toLowerCase())
      );
    }
    
    // Paginacion
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

// POST 
export const createScreening = (req, res) => {
  try {
    const { movieId, room, schedule, availableSeats } = req.body;
    
    // Validacion
    if (!movieId || !room || !schedule || availableSeats === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'All fields are required: movieId, room, schedule, availableSeats'
      });
    }
    
    // Validar que movieId existe
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

// PUT 
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
    
    // Validar movieId si se proporciona
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
    
    // Actualizar solo los campos proporcionados
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

// DELETE 
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