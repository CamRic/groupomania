const sql = require('./db')
const bcrypt = require('bcrypt')

// constructor
const Utilisateur = function(utilisateur) {
    this.user_id = null
    this.email = utilisateur.email
    this.password = utilisateur.password
    this.first_name = utilisateur.first_name
    this.last_name = utilisateur.last_name
    this.role = "user"
    this.topics = null
    this.posts = null
    this.favorites = null
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
Utilisateur.getOneById = (user_id, result) => {
    let query = `SELECT * FROM user WHERE user_id = ` + user_id + `;`

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

Utilisateur.getOneByEmail = (userEmail, result) => {
    let query = `SELECT * FROM user WHERE email = '${userEmail}';`

    sql.query(query, (err, res) => {
        console.log(res)
        if (err) {
            console.log('error' + err)
            result(null, err)
            return
        }
        if (res.length === 0) {
            console.log('no user found')
            result(null, res)
            return
        }
        if (res.length) {
            console.log('utilisateur: ', res[0])
            result(null, res)
        }
    })
}

    // create one user
Utilisateur.createOne = (newUser, result) => {
    let query = `INSERT INTO user SET ?`

    sql.query(query, newUser, (err, res) => {
        if (err) {
            console.log('error: ' + err)
            result(null, err)
            return
        }
        result(null, { ...newUser })
        console.log('Created user: ', { ...newUser })
    })
}

    // delete one user
Utilisateur.deleteOne = (userId, result) => {
    let query = `DELETE FROM user WHERE user_id = ?`
    console.log(query)

    sql.query(query, userId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found'}, null)
            return
        }
        console.log('delete user: id= ', userId)
        result(null, res)
    })
}

    // update one user
Utilisateur.updateById = (id, user, result) => {
    let query = 'UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ? WHERE user_id = ?'

    sql.query(query,
        [user.email, user.password, user.first_name, user.last_name, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not_found'}, null)
                return
            }
            console.log('updated user: ' ,{ id: id, ...user })
            result(null, { id: id, ...user })
        })
}

module.exports = Utilisateur