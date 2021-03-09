const Movie = require('../models/Movie');
const Booking = require('../models/Booking');
const { splitterArray, gettingError, gettingSuccess, dateFormat } = require('../functions/index')
const axios = require('axios')

module.exports = {
    createMovie: (req, res) => {
        let {
            title,
            description,
            genres,
            cast,
            dateReleased,
            priceTicket,
            thumbnail,
            ratings
        } = req.body

        let newMovie = {
            title,
            description,
            genres: genres.includes(',') ? splitterArray(genres, ',') : genres,
            cast: cast.includes(',') ? splitterArray(cast, ',') : cast,
            dateReleased: dateFormat(dateReleased),
            priceTicket,
            thumbnail,
            ratings: ratings ? ratings : 0.0
        }

        Movie.create(newMovie)
            .then((result) => {
                gettingSuccess(res, 'Success to create Movie', result, 201)
            }).catch((err) => {
                gettingError(res, 'Error To Create Movie', err, 406)
            });
    },
    getMovies: (req, res) => {
        let query = {}
        let { keywords, isAll } = req.query
        if (keywords) {
            query['$or'] = [
                { title: { $regex: new RegExp(req.query['keywords'], "i") } },
                { description: { $regex: new RegExp(req.query['keywords'], "i") } },
                { genres: { $regex: new RegExp(req.query['keywords'], "i") } },
                { ratings: `${parseFloat(req.query['keywords'])}` },
                { cast: { $regex: new RegExp(req.query['keywords'], "i") } },
                { priceTicket: `${parseFloat(req.query['keywords'])}` }
            ]
            Movie.find(query).sort({ ratings: 'desc' })
                .then((result) => {
                    gettingSuccess(res, 'Success to Get Movies', result, 200)
                }).catch((err) => {
                    gettingError(res, 'Error To Get Movies', err, 406)
                });
        } else if (isAll === 'true') {
            Movie.find(query).sort({ ratings: 'desc' })
                .then((result) => {
                    gettingSuccess(res, 'Success to Get Movies', result, 200)
                }).catch((err) => {
                    gettingError(res, 'Error To Get Movies', err, 406)
                });
        } else {
            query.dateReleased = {
                $gte: dateFormat(new Date(new Date().getFullYear(), 0, 01)),
                $lte: dateFormat(new Date(new Date().getFullYear(), 11, 31)),
            }
            Movie.find(query).sort({ ratings: 'desc' }).limit(11)
                .then((result) => {
                    gettingSuccess(res, 'Success to Get Movies', result, 200)
                }).catch((err) => {
                    gettingError(res, 'Error To Get Movies', err, 406)
                });
        }
    },
    getMovieById: (req, res) => {
        Movie.findById(req.params)
            .then((result) => {
                gettingSuccess(res, 'Success to Get Movie By Id', result, 200)
            }).catch((err) => {
                gettingError(res, 'Error To Get Movie By Id', err, 406)
            });
    },
    bookingMovie: (req, res) => {
        Movie.find({ _id: req.body.movieId })
            .then((resMovie) => {
                if (resMovie.length > 0) {
                    Booking.find({ transactionId: req.params.transactionId })
                        .then(async(resBooking) => {
                            if (resBooking.length === 0) {
                                let newBook = {
                                    transactionId: req.params.transactionId,
                                    movieId: req.body.movieId,
                                    totalAmount: resMovie[0].priceTicket,
                                    paymentStatus: false
                                }
                                Booking.create(newBook)
                                    .then((resCreateBook) => {
                                        gettingSuccess(res, 'Success to Booking Movies', resCreateBook, 200)
                                    }).catch((err) => {
                                        gettingError(res, 'Error To Book Movies', err, 406)
                                    });
                            } else {
                                let newBook = {
                                    movieId: req.body.movieId,
                                    totalAmount: resMovie[0].priceTicket
                                }
                                let doc = await Booking.findOne({ transactionId: req.params.transactionId })
                                doc.movieId = newBook.movieId
                                doc.totalAmount = resMovie[0].priceTicket

                                await doc.save(function(err, data) {
                                    if (err) {
                                        gettingError(res, 'Error To Book Movies', err, 206);
                                    } else {
                                        gettingSuccess(res, 'Success to update Booking Movies', data, 201)
                                    }
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                            gettingError(res, 'Error To Book Movies', err, 406);
                        });
                }
            }).catch((err) => {
                gettingError(res, 'Error To Book Movies', err, 406);
            });
    },
    getBookings: (req, res) => {
        let paymentStatus = false
        Booking.find({ transactionId: req.params.transactionId, paymentStatus: paymentStatus })
            .populate('movieId')
            .then((result) => {
                gettingSuccess(res, 'Success to Booking Movies', result, 200)
            }).catch((err) => {
                gettingError(res, 'Error To Book Movies', err, 406);
            });
    },
    purchaseBookMovie: async(req, res) => {
        let doc = await Booking.findOne({ transactionId: req.params.transactionId }).populate('movieId')
        doc.paymentStatus = true
            // console.log(doc);
        await doc.save(function(err, data) {
            if (err) {
                gettingError(res, 'Error To Book Movies', err, 206);
            } else {
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.KEY_MOVIE}&query=${doc.movieId[0].title}&page=1`)
                    .then((result) => {
                        console.log(result.data);
                        let id = result.data.results[0].id
                        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.KEY_MOVIE}&language=en-US`)
                            .then((resultMovie) => {
                                if (resultMovie.data.homepage) {
                                    Booking.deleteOne({ transactionId: req.params.transactionId })
                                        .then((result) => {
                                            console.log(result)
                                        }).catch((err) => {
                                            console.log(err)
                                        });
                                    gettingSuccess(res, 'Success to purchase Movies', resultMovie.data.homepage, 206)
                                } else {
                                    Booking.deleteOne({ transactionId: req.params.transactionId })
                                        .then((result) => {
                                            console.log(result)
                                        }).catch((err) => {
                                            console.log(err)
                                        });
                                    let data = 'NotFound'
                                    gettingSuccess(res, 'Success to purchase Movies', data, 200)
                                }
                            }).catch((err) => {
                                Booking.deleteOne({ transactionId: req.params.transactionId })
                                    .then((result) => {
                                        console.log(result)
                                    }).catch((err) => {
                                        console.log(err)
                                    });
                                let data = 'NotFound'
                                gettingSuccess(res, 'Success to purchase Movies', data, 200)
                            });
                    }).catch((err) => {
                        Booking.deleteOne({ transactionId: req.params.transactionId })
                            .then((result) => {
                                console.log(result)
                            }).catch((err) => {
                                console.log(err)
                            });
                        let data = 'NotFound'
                        gettingSuccess(res, 'Success to purchase Movies', data, 200)
                    });
                // gettingSuccess(res, 'Success to update Purchase Movie', data, 201)
            }
        })
    }
}