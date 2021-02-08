const {Sequelize} = require('sequelize')
const config = require('./config.json');
const { host, port, user, password, name } = config.database;

//connect to db
let sequelize
if (process.env.NODE_ENV !== 'production'){
    sequelize = new Sequelize(
        name, user, password, {
            host: host,
            dialect: 'mysql',
            operatorsAliases: 0,
            timezone: "+03:00" //Msc zone
        }
    );
} else {
    sequelize = new Sequelize(
        process.env.DATABASE_NAME_DB_CONFIG,
        process.env.USER_NAME_DB_CONFIG,
        process.env.USER_PASSWORD_DB_CONFIG, {
            host: process.env.HOST_DB_CONFIG,
            dialect: process.env.DIALECT_DB_CONFIG,
            protocol: process.env.PROTOCOL_DB_CONFIG,
            logging: true,
            dialectOptions: {
                ssl: true
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    );
}
module.exports = sequelize

