const ApiError = require("../error/ApiError");
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Status = require("../models/status.model");
const {secret} = require('../config.json');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        secret,
        {expiresIn: '24h'}
    )
}

class statusController {
    /* TEST DATA ********************************************************************/

    // {
    //     "title": "competed",
    // }

    /*******************************************************************************/
    async getAll(req, res, next){
        const status = await Status.findAll()
        return res.json({data: status})
    }
    async statusAdd(req, res, next){
        const {title} = req.body
        if(!title){
            next(ApiError.badRequest('Title is required'))
        }
        const status = await Status.create({
            title
        })
        return res.send({message:"Success new status added"})
    }
    async statusDel (req, res, next){
        const id = req.query.id
        const title = req.query.title
        if(!id && !title){
            return next(ApiError.badRequest('Need specify <id> or <title> in params'))
        }
        if(id){
            try{
                const status = await Status.destroy({where: {id}})
                if(status === 0){
                    return next(ApiError.badRequest('Not found such status'))
                }

                return res.send(`status with id: ${id} deleted successfully`)
            } catch(e) {return next(ApiError.badRequest(e.message))}

        }
        if(title){
            try{
                const status = await Status.destroy({where: {title}})
                if(status === 0){
                    return next(ApiError.badRequest('Not found such status'))
                }

                return res.send(`status with title: ${title} deleted successfully`)
            } catch(e) {return next(ApiError.badRequest(e.message))}
        }
    }


}
module.exports = new statusController