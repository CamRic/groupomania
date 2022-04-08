const express = require('express')

// routes objects
const userRoutes = require('./routes/utilisateur.routes')

// app
const app = express()



// set headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

// request?
app.use((req, res, next) => {
    console.log('request received!')
    next()
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routes
app.use('/user', userRoutes)

module.exports = app