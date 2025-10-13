// Movies Database
export let moviesDB = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    duration: 142,
    rating: 9.3
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: 'Action',
    duration: 152,
    rating: 9.0
  },
  {
    id: 3,
    title: 'Inception',
    genre: 'Sci-Fi',
    duration: 148,
    rating: 8.8
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    genre: 'Crime',
    duration: 154,
    rating: 8.9
  },
  {
    id: 5,
    title: 'Forrest Gump',
    genre: 'Drama',
    duration: 142,
    rating: 8.8
  }
];

// Screenings Database
export let screeningsDB = [
  {
    id: 1,
    movieId: 1,
    room: 'Sala Premium 1',
    schedule: '2025-10-13T14:00:00',
    availableSeats: 45
  },
  {
    id: 2,
    movieId: 1,
    room: 'Sala Premium 1',
    schedule: '2025-10-13T19:30:00',
    availableSeats: 32
  },
  {
    id: 3,
    movieId: 2,
    room: 'Sala IMAX',
    schedule: '2025-10-13T15:00:00',
    availableSeats: 78
  },
  {
    id: 4,
    movieId: 3,
    room: 'Sala 3D',
    schedule: '2025-10-13T17:00:00',
    availableSeats: 56
  },
  {
    id: 5,
    movieId: 4,
    room: 'Sala 2',
    schedule: '2025-10-13T20:00:00',
    availableSeats: 41
  }
];

// Tickets Database
export let ticketsDB = [
  {
    id: 1,
    screeningId: 1,
    seatNumber: 15,
    price: 12.50,
    purchaseDate: '2025-10-10'
  },
  {
    id: 2,
    screeningId: 1,
    seatNumber: 16,
    price: 12.50,
    purchaseDate: '2025-10-10'
  },
  {
    id: 3,
    screeningId: 3,
    seatNumber: 25,
    price: 18.00,
    purchaseDate: '2025-10-11'
  },
  {
    id: 4,
    screeningId: 2,
    seatNumber: 10,
    price: 15.00,
    purchaseDate: '2025-10-12'
  },
  {
    id: 5,
    screeningId: 4,
    seatNumber: 32,
    price: 16.50,
    purchaseDate: '2025-10-12'
  }
];

// Helper function to get next ID
export const getNextId = (database) => {
  if (database.length === 0) return 1;
  return Math.max(...database.map(item => item.id)) + 1;
};