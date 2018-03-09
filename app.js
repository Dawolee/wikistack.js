const express = require('express');
const nunjucks = require('nunjucks');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/views/index.html');
})


app.listen(3000, console.log('Server up on port 3000'));
