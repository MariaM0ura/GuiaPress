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
    res.render('index');
    }
);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
    }
);
