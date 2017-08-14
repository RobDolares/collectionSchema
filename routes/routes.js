const express = require('express');
const routes = express.Router();

const Sticker = require('../models/collection');

routes.get('/', (req, res) => {
  Sticker.find()
    // then show my collection
    .then(stickers => res.render('listCollection', { stickers: stickers }))
    // handle errors
    .catch(err => res.send('there was an error'));
});

routes.get('/stickerForm', (req, res) => {
  if (req.query.id) {
    Sticker.findById(req.query.id)
      // render form with this sticker
      .then(stickers => res.render('stickerForm', { stickers: stickers }));
  } else {
    res.render('stickerForm');
  }
});

routes.post('/saveSticker', (req, res) => {

    if (req.body.id) {
        Sticker.findByIdAndUpdate(req.body.id, req.body, { upsert: true })
          .then(() => res.redirect('/'))
      } else {
        new Sticker(req.body)
          .save()
          // then redirect to the homepage
          .then(() => res.redirect('/'))
          // catch validation errors
          .catch(err => {
            console.log(err.errors);
            res.render('stickerForm', {
              errors: err.errors,
              stickers: req.body
            });
          });
      }
    });

routes.get('/deleteSticker', (req, res) => {
  Sticker.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/'));
});

module.exports = routes;
