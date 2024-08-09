const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // slug is a URL-friendly version of the title
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Category.sync({force: true}); // Uncomment this line to recreate the table

module.exports = Category;