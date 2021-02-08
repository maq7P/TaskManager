const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Status = sequelize.define('status',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: true},
})

module.exports = Status;