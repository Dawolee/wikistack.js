const express = require('express');
const models = require('../models');
const Page = models.Page;
const User = models.User;
const router = express.Router();


router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  const page = Page.build({
    title: req.body.pageTitle,
    content: req.body.pageContent,
    status: req.body.pageStatus
  });

  const user = User.build({
    name: req.body.authorName,
    email: req.body.authorEmail
  });

  page.save()
  .then(createdPage => res.redirect(createdPage.route))
  .catch(next);
});

router.get('/add', (req, res, next) => {
  res.render('../views/addpage.html');
});

router.get('/:path', (req, res, next) => {
  Page.find({
    where: {
      urlTitle: req.params.path
    }
  })
  .then((json) => {
    console.log(json.dataValues);
    res.render('../views/wikipage.html', {
      pageTitle: json.dataValues.title,
      pageContent: json.dataValues.content
    });
  })
  .catch(next);
});

module.exports = router;
