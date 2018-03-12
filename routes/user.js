const express = require('express');
const Promise = require('bluebird');
const models = require('../models');
const Page = models.Page;
const User = models.User;
let router = express.Router();

router.get('/', (req, res, next) => {
  User.findAll()
  .then(arr => {
    res.render('userIndex', {users: arr});
  });
});

router.get('/:id', (req, res, next) => {
  let p1 = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });
  let p2 = User.find({
    where: {
      id: req.params.id
    }
  });

  Promise.all([p1, p2])
  .then(json => {
    let pageAry = json[0];
    const authorName = json[1].dataValues.name;

    pageAry = pageAry.map(function(pageObj) { 
      return {
        pageTitle: pageObj.dataValues.title,
        pageContent: pageObj.dataValues.content
      }
    });

    console.log(pageAry);
    console.log(authorName);

    res.render('wikipage.html', { authorName: authorName, pages: pageAry });
  })
  .catch(next);
})

module.exports = router;

