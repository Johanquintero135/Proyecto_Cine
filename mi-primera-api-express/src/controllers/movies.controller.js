import { moviesDB, getNextId } from '../data/moviesData.js';

// GET /api/movies - List all movies with optional filtering and pagination
export const getAllMovies = (req, res) => {
  try {
    let result = [...moviesDB];
    
    // Query string filtering by genre
    if (req.query.genre) {
      result = result.filter(movie => 
        movie.genre.toLowerCase() === req.query.genre.toLowerCase()
      );
    }
    
    // Query string filtering by rating
    if (req.query.minRating) {
      const minRating = parseFloat(req.query.minRating);
      result = result.filter(movie => movie.rating >= minRating);
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

// GET /api/movies/:id - Get movie by ID
export const getMovieById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'ID must be a valid number'
      });
    }
    
    const movie = moviesDB.find(m => m.id === id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Movie with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// POST /api/movies - Create new movie
export const createMovie = (req, res) => {
  try {
    const { title, genre, duration, rating } = req.body;
    
    // Validation
    if (!title || !genre || !duration || !rating) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'All fields are required: title, genre, duration, rating'
      });
    }
    
    if (typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Duration must be a positive number'
      });
    }
    
    if (typeof rating !== 'number' || rating < 0 || rating > 10) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Rating must be a number between 0 and 10'
      });
    }
    
    const newMovie = {
      id: getNextId(moviesDB),
      title,
      genre,
      duration,
      rating
    };
    
    moviesDB.push(newMovie);
    
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: newMovie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// PUT /api/movies/:id - Update movie
export const updateMovie = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'ID must be a valid number'
      });
    }
    
    const movieIndex = moviesDB.findIndex(m => m.id === id);
    
    if (movieIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Movie with ID ${id} not found`
      });
    }
    
    const { title, genre, duration, rating } = req.body;
    
    // Validation
    if (duration !== undefined && (typeof duration !== 'number' || duration <= 0)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Duration must be a positive number'
      });
    }
    
    if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 10)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Rating must be a number between 0 and 10'
      });
    }
    
    // Update only provided fields
    moviesDB[movieIndex] = {
      ...moviesDB[movieIndex],
      ...(title && { title }),
      ...(genre && { genre }),
      ...(duration && { duration }),
      ...(rating !== undefined && { rating })
    };
    
    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: moviesDB[movieIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// DELETE /api/movies/:id - Delete movie
export const deleteMovie = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'ID must be a valid number'
      });
    }
    
    const movieIndex = moviesDB.findIndex(m => m.id === id);
    
    if (movieIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Movie with ID ${id} not found`
      });
    }
    
    const deletedMovie = moviesDB.splice(movieIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
      data: deletedMovie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};