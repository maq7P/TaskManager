const ApiError = require("../error/ApiError");
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require("../models/task.model");
const Priority = require("../models/priority.model");
const {secret} = require('../config.json');
const {Op} = require('sequelize')
const sequelize = require('sequelize')
const Status = require("../models/status.model");
const {addToDate, today} = require('../utils')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        secret,
        {expiresIn: '24h'}
    )
}

class taskController {
    /* TEST METHOD*/
    async taskAdd(req, res, next) {
        const {
            title,
            description,
            start_time,
            end_time,
            priority_id,
            responsible_id
        } = req.body

        let priority_title = await Priority.findOne({where: {id: priority_id}})
        priority_title = priority_title.dataValues.title

        let responsible_title = await User.findOne({where: {id: responsible_id}})
        responsible_title = responsible_title.dataValues.title

        let creator_title = await User.findOne({where: {id: req.user.id}})
        creator_title = creator_title.dataValues.title

        let status_title = await Status.findOne({where: {id: 1}})
        status_title = status_title.dataValues.title

        const task = await Task.create({
            title,
            description,
            start_time,
            end_time,
            priority_id,
            creator_id: req.user.id,
            responsible_id,
            priority_title,
            creator_title,
            responsible_title,
            status_title
        })
        return res.json({message: 'Success add task', data: task, status: 1})
    }

    async getAll(req, res, next) {
        if (req.query.id) {
            const tasks = await Task.findAll({where: {responsible_id: req.query.id}})
            return res.json(tasks)
        }
        const tasks = await Task.findAll()
        res.json(tasks)
    }

    async getUserTasks(req, res, next) {
        const id = req.user.id
        const tasks = await Task.findAll({where: {responsible_id: id}, order: [['end_time', 'ASC']]})

        res.json(tasks)
    }

    async getUserTasksToday(req, res, next) {
        const id = req.user.id
        const nowDay = today()

        const tasks = await Task.findAll({
            where: {
                end_time: {
                    [Op.between]: [nowDay, nowDay]
                },
                responsible_id: req.query.id ? req.query.id : id
            },
            order: [['end_time', 'ASC']]
        })

        res.json(tasks)
    }

    async getUserTasksCurrentWeek(req, res, next) {
        const id = req.user.id
        const nowDay = today()

        console.log(nowDay)
        let currentDayOfWeek = new Date(nowDay).getDay()
        if (currentDayOfWeek === 0) currentDayOfWeek = 7

        const lastDayOfWeek = addToDate(nowDay, 0, 7 - currentDayOfWeek).slice(0, 10);

        const tasks = await Task.findAll({
            where: {
                end_time: {
                    [Op.between]: [nowDay, lastDayOfWeek]
                },
                responsible_id: req.query.id ? req.query.id : id,
            },
            order: [['end_time', 'ASC']]
        })

        res.json(tasks)
    }

    async getUserTasksFuture(req, res, next) {
        const id = req.user.id
        const nowDay = today()

        let currentDayOfWeek = new Date(nowDay).getDay()
        if (currentDayOfWeek === 0) currentDayOfWeek = 7

        const dayOfNewWeek = addToDate(nowDay, 0, 7 - currentDayOfWeek + 1).slice(0, 10);
        const bigDate = '2200-00-00'
        const tasks = await Task.findAll({
            where: {
                end_time: {
                    [Op.between]: [dayOfNewWeek, bigDate]
                },
                responsible_id: req.query.id ? req.query.id : id,
            },
            order: [['end_time', 'ASC']]
        })

        res.json(tasks)
    }

    async updateStatus(req, res, next) {
        const id = req.query.id
        const resId = req.query.resId
        const status_id = req.query.status_id
        const status_title = req.query.status_title

        const tasks = await Task.update(
            {status_id, status_title},
            {where: {
                [Op.and]: [
                    {responsible_id: resId},
                    {id}
                ]
            }}
            )

        res.json(tasks)
    }
    async updateTask(req, res, next) {
        const {
            id,
            title,
            description,
            start_time,
            end_time,
            priority_id,
            responsible_id
        } = req.body

        let priority_title = await Priority.findOne({where: {id: priority_id}})
        priority_title = priority_title.dataValues.title

        let responsible_title = await User.findOne({where: {id: responsible_id}})
        responsible_title = responsible_title.dataValues.title

        let creator_title = await User.findOne({where: {id: req.user.id}})
        creator_title = creator_title.dataValues.title

        let status_title = await Status.findOne({where: {id: 1}})
        status_title = status_title.dataValues.title

        const task = await Task.update({
            title,
            description,
            start_time,
            end_time,
            priority_id,
            creator_id: req.user.id,
            responsible_id,
            priority_title,
            creator_title,
            responsible_title,
            status_title
        }, {where: {id}
        })

        //WE NEED GET ID TASK
        const thatTask = await Task.findOne({
            where: {id}
        })
        return res.json({message: 'Success update task', data: thatTask, status: 1})
    }
    async deleteTask(req, res, next) {
        const id = req.query.id

        const status = await Task.destroy({where: {id}})

        return res.json({message: 'Success delete task', status: 1})
    }





}
module.exports = new taskController