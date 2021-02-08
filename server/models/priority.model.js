const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Priority = sequelize.define('priority',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
})

module.exports = Priority;