const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const path = require('path');
//routes 
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

//modules
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const { where } = require('sequelize');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log('Connection to database was successful');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index' , {articles: articles, categories: categories});
        });
    });
});

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {   
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('index', { articles: [article], categories: categories });
            });
        }
         else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {   
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', { articles: category.articles, categories: categories });
            });
        }
         else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});



app.listen(8080, () => {
    console.log('Server is running on port 8080');
    }
);
