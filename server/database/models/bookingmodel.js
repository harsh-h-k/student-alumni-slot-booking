const mongoose = require('mongoose')
const bookingSchema = require('../schema/booking')

const booking = mongoose.model("booking",bookingSchema)

module.exports = booking