const Sequelize = require('sequelize');
const conection = new Sequelize('guiapress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conection;