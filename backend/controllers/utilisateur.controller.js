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
    console.log(userId)
    Utilisateur.getOneById(userId, (err, data) => {
        if (err) {
            res.status(500).send({
                err
            })
        }
        else res.send(data)
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
                last_name: req.body.last_name,
                role: req.body.role
            })
            Utilisateur.createOne(user, (err, data) => {
                if (err) {
                    res.status(500).send({message: err.message})
                } else {
                    res.send(data)
                }
            })
        })
        .catch(error => res.status(500).json({ error: "erreur serveur"}))

}

// loging
exports.login = (req, res) => {
    // is email valid?
    console.log(req.body.email)
    var loguser;
    Utilisateur.getOneByEmail(req.body.email, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            if (data.length) {
                console.log('data received')
                console.log('body pass: ' + req.body.password)
                console.log('data pass: ' + data[0].password)
                bcrypt.compare(req.body.password, data[0].password)
                    .then(valid => {
                        if (!valid) { // si mot de passe invalide
                            return res.status(401).json({ error: 'Mot de passe non valide'})
                        }
                        console.log("valide mdp")
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
/*
if (!validEmail) {
    res.status(401).json({ error: 'Email invalide'})
} else {
    // si email valide, comparaison des mdp
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
*/