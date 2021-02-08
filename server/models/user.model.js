const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: true, defaultValue: ''},
    surname: { type: DataTypes.STRING, allowNull: true, defaultValue: ''},
    patronymic: { type: DataTypes.STRING, allowNull: true, defaultValue: ''},
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    title: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'EMPLOYEE'}
})

module.exports = User;