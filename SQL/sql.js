const Sequelize = require('sequelize');
const conection = new Sequelize('guiapress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timeZone: '-03:00'  
});

module.exports = conection;