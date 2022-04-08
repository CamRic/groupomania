const { Sequelize, DataTypes, Model, Deferrable } = require('sequelize')
const dbConfig = require('../config/db.config')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => console.log('Connected to database'))
    .catch(() => console.error('Unable to connect to database'))
    

module.exports = sequelize