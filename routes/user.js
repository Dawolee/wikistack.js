const express = require('express');
const Promise = require('bluebird');
const models = require('../models');
const Page = models.Page;
const User = models.User;
let router = express.Router();

router.get('/', (req, res, next) => {
  User.findAll()
  .then(arr => {
    console.log(arr);
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
    console.log(json);
    console.log(json[0].dataValues.title);
    res.render('wikipage.html', {
      pageTitle: json[0].dataValues.title,
      pageContent: json[0].dataValues.content,
      authorName: json[1].dataValues.name
    });
  })
  // })
  // .then((json) => {
  //   console.log(json.dataValues);
  //   res.render('../views/wikipage.html', {
  //     pageTitle: json.dataValues.title,
  //     pageContent: json.dataValues.content
  //   });
  // })
  .catch(next);
})

module.exports = router;

