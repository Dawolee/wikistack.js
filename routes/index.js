const express = require('express');
let router = express.Router();
const models = require('../models');
const userRouter = require('./user');
const wikiRouter = require('./wiki');
const Page = models.Page;
const User = models.User;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', (req, res, next) => {
  Page.findAll()
  .then(arr => {
    res.render('index', {pages: arr});
  });
});

module.exports = router;
