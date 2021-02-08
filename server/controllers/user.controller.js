const ApiError = require("../error/ApiError");
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {secret} = require('../config.json');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        secret,
        {expiresIn: '24h'}
    )
}

class userController {
    // That block will use with full name and all params
    async registration(req, res, next){
        const {login, password, role, name, surname} = req.body

        if(!login || !password){
            return next(ApiError.badRequest('Некоректные данные регистрации сотрудника'))
        }

        //check for the existence of a user in system
        const candidate = await User.findOne({where: {login}})
        if(candidate){
            return next(ApiError.badRequest('Такой сотрудник уже зарегистрирован'))
        }
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({
            name,
            surname,
            login,
            password: hashPassword,
            role,
            title: `${name} ${surname}`
        })
        const token = generateJwt(user.id, user.login, user.role)

        return res.json({
            token,
            status: 1,
            message: 'success registration'
        })
    }

    async login(req, res, next){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if(!user) {
            return next(ApiError.internal('Такой сотрудник не зарегистрирован в сестеме'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)

        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role)

        return res.json({
            token,
            person: {
                id: user.id,
                login: user.login,
                role: user.role,
                title: `${user.name} ${user.surname}`
            }
        })
    }

    //Rewrite token and send on client
    async auth(req, res, next){
        const token = generateJwt( req.user.id, req.user.login, req.user.role)
        res.json(token)
    }

    //info about me
    async me(req, res, next){
        res.json({
            id: req.user.id,
            login: req.user.login,
            role: req.user.role
        })
    }

    /* TEST METHOD*/
    async userAdd(req, res, next){
        const {name, surname, patronymic, login, password} = req.body

        /*TEST DATA*******************************************************************/

        // {
        //     "name": "amdin",
        //     "surname": "amdin",
        //     "patronymic": "amdin",
        //     "login": "amdin",
        //     "password": "amdin"
        // }

        /*******************************************************************************/
        const user = await User.create({
            name,
            surname,
            patronymic,
            login,
            password
        })
        return res.json({ready: req.body})
    }

    async getAll(req, res, next){
        const user = await User.findAll()
        res.json(user)
    }

    async getEmployees(req, res, next){
        const user = await User.findAll({where: {role: 'EMPLOYEE'}})
        res.json(user)
    }
    async getTeamLeads(req, res, next){
        const user = await User.findAll({where: {role: 'TEAM_LEAD'}})
        res.json(user)
    }

}
module.exports = new userController