const Utilisateur = require('../models/utilisateur.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
exports.findOneById = (req, res) => {
    const userId = req.params.id
    Utilisateur.getOneById(userId, (err, data) => {
        if (err) {
            res.status(500).send({
                err
            })
        }
        else res.status(201).send(data)
    })
}

// create one user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({message: 'Error request contains no content'})
    }
    // create new user
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Utilisateur({
                email: req.body.email,
                password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            })
            Utilisateur.createOne(user, (err, data) => {
                if (err) {
                    res.status(500).send({message: err.message})
                } else {
                    res.status(201).send({message: 'user created: ' + user.email})
                }
            })
        })
        .catch(error => res.status(500).json({ error: "erreur serveur"}))

}

// loging
exports.login = (req, res) => {
    // is email valid?
    Utilisateur.getOneByEmail(req.body.email, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            if (data.length) {
                bcrypt.compare(req.body.password, data[0].password)
                    .then(valid => {
                        if (!valid) { // si mot de passe invalide
                            return res.status(401).json({ error: 'Mot de passe non valide'})
                        }
                        res.status(200).json({
                            userId: data[0].user_id,
                            token: jwt.sign(
                                {userId: data[0].user_id},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn: '2h'}
                            )
                        })
                    })
                    .catch(error => res.status(500).json({ error }))
            }
            else {
                console.log('data not found')
                res.status(401).json({ error: 'Email invalide'})
            }
        }
    })
}

// deleting one user
exports.deleteUser = (req, res) => {
    
    /* comparing tokens userid and request user id */

    Utilisateur.deleteOne(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == 'not_found') res.status(404).send({message: `user(${req.params.id}) not found`})
            else res.status(500).send({message: `Could not delete user(${req.params.id})`})
        } else {
            res.send({message: 'user was deleted successfully!'})
        }

    })

}

// updating one user
exports.updateOne = (req, res) => {
    // valide request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' })
    }
    console.log(req.body)
    Utilisateur.updateById(req.params.id, new Utilisateur(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `user(${req.params.id}) not found`})
            } else {
                res.status(500).send({ message: `error updating user(${req.params.id})`})
            }
        } else {
            res.send(data)
        }
    })
}