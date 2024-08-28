const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // slug is a URL-friendly version of the title
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Category.sync({force: true}); // Uncomment this line to recreate the table


module.exports = User;