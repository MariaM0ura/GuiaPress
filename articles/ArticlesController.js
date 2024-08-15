const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get('/articles', (req, res) => {
    res.send('Articles');
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories});
    })
});

router.get('/admin/articles', (req, res) => {
    Article.findAll().then(categories => {
        res.render('admin/articles/index', {categories: categories});
    })
});

router.post('/articles/save', (req, res) => {
    var title = req.body.title;
    var body = req.body.body;   
    var category = req.body.category;

    Article.create({
        title: title,
        slug: title,
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/articles');
    }); 
});

module.exports = router;