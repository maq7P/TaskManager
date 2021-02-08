const jwt = require('jsonwebtoken')
const {secret} = require('../config.json')

module.exports = function(req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1] //Bearer token
        console.log(token)
        if(!token){
            res.status(401).json({message: 'Пользователь не авторизован'})
        }

        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    }catch(e){
        res.status(401).json({message: 'Пользователь не авторизован'})
    }
}