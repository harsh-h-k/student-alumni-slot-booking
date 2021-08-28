// MODULES
const express = require('express')
const app = express()

const cors =  require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = 5000

// LOCAL IMPORTS 
const confiq_URL = require('./database/config')
const router = require('./routes/routes')


// APP.USE 
app.use(express())
// app.use(express.json());
// app.use(express.urlencoded({extended:false, useNewUrlParser : true, useUnifiedTopology : true}))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// CONNECTION TO DATABASE
mongoose.connect(confiq_URL)
.then(()=>{
    console.log('Database connected')
})
.catch((error)=>{
    console.log(`ERROR in connecting to database ${error}`)
})

// ROUTES
app.get("/",(req,res)=>{
    res.status(200).send("Student-Alumni portal")
})

// MAIN ROUTES IN ROUTES FOLDER
app.use("/",router)

// SERVER STARTED AT 
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})