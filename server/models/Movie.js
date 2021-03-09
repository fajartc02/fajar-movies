const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: Array, required: true },
    ratings: { type: mongoose.Decimal128, required: true, default: 0 },
    cast: { type: Array, required: true },
    dateReleased: { type: Date, required: true },
    priceTicket: { type: mongoose.Decimal128, required: true, default: 0 },
    thumbnail: { type: String }
}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;