const mongoose = require('mongoose')
const confirmSchema = require('../schema/booking')

const confirm = mongoose.model("confirm",confirmSchema)

module.exports = confirm