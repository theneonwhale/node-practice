const express = require('express');
const router = express.Router();
const { articles } = require('../model/data.json');
const fs = require('fs/promises');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Main page' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact me' });
});

router.get('/blog', function (req, res, next) {
  res.render('blog', { title: 'Blog', articles });
});

router.post('/contact', async (req, res, next) => {
  try {
    console.log(req.body);
    await fs.writeFile(
      path.join(__dirname, '..', 'model', 'message.json'),
      JSON.stringify(req.body, null, 2),
    );
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
