const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category'); 

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // slug is a URL-friendly version of the title
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false 
    }
});

// One-to-Many relationship
Category.hasMany(Article); // One Category has many Articles
Article.belongsTo(Category); // One Article belongs to one Category

// Article.sync({force: true}); // Uncomment this line to recreate the table

module.exports = Article;