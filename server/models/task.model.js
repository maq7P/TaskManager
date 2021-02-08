const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Task = sequelize.define('task',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    start_time: {type: DataTypes.STRING, allowNull: false},
    end_time: {type: DataTypes.STRING, allowNull: false},
    priority_id: {type: DataTypes.STRING, allowNull: false},
    status_id: {type: DataTypes.STRING, allowNull: false, defaultValue: 1},
    creator_id: {type: DataTypes.STRING, primaryKey: true},
    responsible_id: {type: DataTypes.STRING},
    priority_title: {type: DataTypes.STRING, allowNull: false},
    creator_title: {type: DataTypes.STRING, allowNull: false},
    responsible_title: {type: DataTypes.STRING, allowNull: false},
    status_title: {type: DataTypes.STRING, allowNull: false},
})

module.exports = Task;