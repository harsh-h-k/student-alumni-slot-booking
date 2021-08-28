const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// DATABASE MODELS 
const booking = require('../database/models/bookingmodel')
const confirm = require('../database/models/confirmmodel')


// ROUTES

// GENERAL GET REQUEST 
// SHOWS ALL RECORDS FROM BOOKING COLLECTION
router.get("/show", async (req, res) => {
    await booking.find()
        .then((items) => res.status(200).json(items))
        .catch((err) => res.send(`ERROR : ${err}`))
})

// SHOWS ALL RECORDS FROM CONFIRM COLLECTION
router.get("/showConfirm", async (req, res) => {
    await confirm.find()
    .then((items)=> res.status(200).json(items))
    .catch((error)=> res.status(400).send(`Error : ${error}`))
    })

// GET REQUEST THAT ARE USER SPECIFIC
// SHOWS THE MATCHING RECORDS FROM BOOKING COLLECTION 
router.get("/showBookings/:username", async (req, res) => {
    const user = req.params.username
    await booking.find({ username : user})
        .then((items) => res.status(200).json(items))
        .catch((err) => res.send(`ERROR : ${err}`))
})

// SHOWS THE MATCHING RECORDS FROM CONFIRM COLLECTION 
router.get("/showConfirmBookings/:username", async (req, res) => {
    const user = req.params.username
    await confirm.find({ username: user })
        .then((items) => res.status(200).json(items))
        .catch((err) => res.send(`ERROR : ${err}`))
})

// POST REQUEST 
// POST REQUEST TO SAVE BOOKING DETAILS TO BOOKING COLLECTION

router.post("/addToBooking",async (req,res)=>{
    const newBooking = booking({
        username: req.body.username,
        bookingDate : req.body.startDate,
        bookingSlot : req.body.timeSlot,
    })
    await newBooking.save()
    .then(()=> res.status(200))
    .catch((err) => res.send(`ERROR : ${err}`))
})

// POST REQUEST TO SAVE CONFIRM REQUEST AND SAVE TO CONFIRM COLLECTION 
router.post("/confirm",async (req,res)=>{
    const newConfirm = confirm({
        username: req.body.username,
        bookingDate : req.body.bookingDate,
        bookingSlot : req.body.bookingSlot,
    })
    await newConfirm.save()
    .then(()=> res.status(200))
    .catch((err) => res.send(`ERROR : ${err}`))
})

// DELETE REQUEST by ID 
router.delete("/delete/:id", async (req,res) =>{
    const id = req.params.id;

    await booking.findByIdAndDelete({_id : id})
    .then(()=> res.status(200))
    .catch((error)=> res.status(400).send(`ERROR : ${err}`))
})


// EXPORTS 
module.exports = router
