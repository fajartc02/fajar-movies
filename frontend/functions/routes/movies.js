const express = require('express');
const router = express.Router();

const { createMovie, getMovies, getMovieById, bookingMovie, getBookings, purchaseBookMovie } = require('../controllers/controllerMovie')


router.get('/', getMovies)
router.get('/getOne/:_id', getMovieById)
router.post('/', createMovie)
router.post('/booking/:transactionId', bookingMovie)
router.get('/booking/:transactionId', getBookings)
router.post('/purchase/:transactionId', purchaseBookMovie)


module.exports = router