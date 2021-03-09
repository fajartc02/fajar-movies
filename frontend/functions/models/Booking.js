const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    transactionId: { type: Number, required: true },
    movieId: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    totalAmount: { type: Number, default: 0 },
    paymentStatus: { type: Boolean }
})

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;