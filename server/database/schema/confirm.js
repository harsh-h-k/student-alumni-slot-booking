const mongoose = require('mongoose')

const confirmSchema = mongoose.Schema({
    username:String,
    bookingDate : String,
    bookingSlot : String
})

module.exports = confirmSchema