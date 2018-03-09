const express = require('express');
const nunjucks = require('nunjucks');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const models = require('./models');

const app = express();
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index');
})

models.db.sync({force: true})
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));
