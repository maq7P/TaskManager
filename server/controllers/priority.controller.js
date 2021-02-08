const ApiError = require("../error/ApiError");
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Priority = require("../models/priority.model");
const {secret} = require('../config.json');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        secret,
        {expiresIn: '24h'}
    )
}

class priorityController {
    /* TEST DATA ********************************************************************/
    // {
    //     "title": "high",
    // }
    /*******************************************************************************/
    async getAll(req, res, next){
        const priority = await Priority.findAll()
        return res.json({data: priority})
    }
    async priorityAdd(req, res, next){
        const {title, color} = req.body
        if(!title){
            next(ApiError.badRequest('Title is required'))
        }

        const priority = await Priority.create({
            title,
            color
        })
        return res.send({message: "Success new priority added"})
    }
    async priorityDel (req, res, next){
        const id = req.query.id
        const title = req.query.title
        if(!id && !title){
            return next(ApiError.badRequest('Need specify <id> or <title> in params'))
        }
        if(id){
            try{
                const status = await Priority.destroy({where: {id}})
                if(status === 0){
                    return next(ApiError.badRequest('Not found such status'))
                }

                return res.send(`priority with id: ${id} deleted successfully`)
            } catch(e) {return next(ApiError.badRequest(e.message))}

        }
        if(title){
            try{
                const status = await Priority.destroy({where: {title}})
                if(status === 0){
                    return next(ApiError.badRequest('Not found such status'))
                }

                return res.send(`priority with title: ${title} deleted successfully`)
            } catch(e) {return next(ApiError.badRequest(e.message))}
        }
    }


}
module.exports = new priorityController