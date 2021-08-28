const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    username:String,
    bookingDate : String,
    bookingSlot : String,
})

module.exports = bookingSchema