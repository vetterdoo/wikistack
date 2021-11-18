const express = require('express');
const router = express.Router();

const { Page } = require("../models");
const {addPage} = require("../views");

router.get('/', (req, res) => {
    res.send(`got to GET /wiki`);
});

router.post('/', (req, res) => {
    res.send(`got to POST /wiki`);
});

router.get('/add', (req, res) => {
    res.send(addPage());
});


router.post('/', async (req, res, next) => {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
  
    try {
      const page = await Page.create({
        title: req.body.title,
        content: req.body.textArea
      });

      page.save();
  
      // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
      res.redirect('/');
    } catch (error) { next(error) }
  });




module.exports = router;