const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.locals.controller.renderThumbnail();
});
router.get('/thumbnail/create', (req, res) => {
  res.locals.controller.renderThumbnailForm(() => {});
});
router.post('/thumbnail/create', (req, res) => {
  let formObj = req.body;
  console.log(formObj);
  let profID;
  let cardID;
  formObj.profileId = 'x';
  res.locals.controller.addThumbnail(formObj, (error, result) => {
    if (error) throw error;
    cardID = result.result.id;
  });
  let userForm = {
    name: 'please edit name',
    userName: 'lease edit userName',
    email: 'example@example.com',
    age: parseInt('99'),
    location: 'please edit your location',
    hobies: 'please add some hobbies',
    cardId: 'x',
    image: 'http://lorempixel.com/640/480'
  };
  res.locals.controller.addUser(userForm, (err, result) => {
    if (err) throw err;
    profID = result.result.id;
  });
  formObj.profileId = profID;
  userForm.cardId = cardID;
  res.locals.controller.updateThumbnail(cardID, formObj, (err, result) => {
    if (err) throw err;
    res.locals.controller.updateUser(profID, userForm, (err, user) => {
      if (err) throw err;
      res.locals.controller.renderThumbnail();
    });
  });
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    res.locals.controller.renderSelectedUser(id);
  }
});

module.exports = router;
