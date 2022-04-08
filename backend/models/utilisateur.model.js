const sequelize = require('./db')
const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topics: {
        type: DataTypes.JSON,
        defaultValue: {"topics": []}
    },
    posts: {
        type: DataTypes.JSON,
        defaultValue: {"posts": []}
    },
    favorites: {
        type: DataTypes.JSON,
        defaultValue: {"favorites": []}
    }
}, {
    sequelize,
    modelName: 'User'
})