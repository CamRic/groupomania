const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/utilisateur.controller')

// get all users
router.get('/', userCtrl.findAll)
// get one user
router.get('/:id', userCtrl.findOne)

module.exports = router