const sql = require('./db')
const bcrypt = require('bcrypt')

// constructor
const Utilisateur = function(utilisateur) {
    this.user_id = utilisateur.user_id
    this.email = utilisateur.email
    this.password = utilisateur.password
    this.first_name = utilisateur.first_name
    this.last_name = utilisateur.last_name
    this.acces_level = utilisateur.role
    this.user_topics = utilisateur.topics
    this.user_posts = utilisateur.posts
    this.favorites = utilisateur.favorites
}

// queries
    // get all users
Utilisateur.getAll = (result) => {
    let query = 'SELECT * FROM user;'

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ' + err)
            result(null, err)
            return
        }
        console.log('utilisateurs: ', res)
        result(null, res)
    })
}

    // get one user
Utilisateur.getOne = (user_id, result) => {
    console.log(user_id)
    let query = `SELECT * FROM user WHERE user_id = ` + user_id + `;`
    console.log('query: ' + query)

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error' + err)
            result(null, err)
            return
        }
        if (res.length) {
            console.log('utilisateur: ', res[0])
            result(null, res)
        }
        //result({kind: "not_found"}, null)
    })
}

    // create one user

module.exports = Utilisateur