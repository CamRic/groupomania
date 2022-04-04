const express = require('express')
const path = require('path')
const mysql  = require('mysql')

// app
const app = express()

// request?
app.use((req, res, next) => {
    console.log('request received!')
    next()
})

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routes

module.exports = app