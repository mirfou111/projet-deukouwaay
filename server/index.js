const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')

const authRoute = require("./routes/auth.js")

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use("/auth", authRoute)

//Mongoose SET-UP
const port = 3003
mongoose.connect(process.env.MONGO_URL,
    {dbName : "Deukouwaay",
    //The options bellow are deprecated, we don't need to specified them since nodejs include it by default
    // useNewUrlParser: true,
    // UseUnifiedTopology: true
    })
    .then(()=>{
    app.listen(port, ()=>console.log(`Server PORT : ${port}`))
}).catch((err)=>console.log(err))