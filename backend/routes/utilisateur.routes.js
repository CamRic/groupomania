const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/utilisateur.controller')
const auth = require('../middleware/auth')

// get all users
router.get('/', userCtrl.findAll)
// get one user
router.get('/:id', userCtrl.findOneById)
// create one user
router.post('/signup', userCtrl.create)
// connection
router.post('/login', userCtrl.login)
// deleting one user
router.delete('/:id', /* auth middleware, */ userCtrl.deleteUser)
// updating one user
router.put('/:id',/* auth middleware, */ userCtrl.updateOne)

module.exports = router