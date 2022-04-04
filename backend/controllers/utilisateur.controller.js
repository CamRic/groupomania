const Utilisateur = require('../models/utilisateur.model')

// send all users datas
exports.findAll = (req, res) => {
    Utilisateur.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            })
        }
        else res.send(data)
    })
}

// send one user datas
exports.findOne = (req, res) => {
    console.log(req)
    const userId = req.params.id
    console.log(userId)
    Utilisateur.getOne(userId, (err, data) => {
        if (err) {
            res.status(500).send({
                err
            })
        }
        else res.send(data)
    })
}