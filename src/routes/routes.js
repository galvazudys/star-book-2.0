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
router.get('/thumbnail/:id/update/form', (req, res) => {
  res.locals.controller.renderThumbnailUpdate(req.params.id, (err, result) => {
    if (err) throw err;
  });
});
router.post('/thumbnail/:id/update', (req, res) => {
  const id = req.params.id;
  let thumbnail = req.body;
  res.locals.controller.readThumbnail(id, (err, result) => {
    thumbnail.profileId = result.profileId;
    res.locals.controller.updateThumbnail(id, thumbnail, (err, data) => {
      if (err) throw err;
      res.locals.controller.renderSelectedUser(thumbnail.profileId);
    });
  });
});
router.get('/thumbnail/:id/delete', (req, res) => {
  const id = req.params.id;
  res.locals.controller.readThumbnail(id, (error, data) => {
    if (error) throw err;
    res.locals.controller.readUser(data.profileId, (err, user) => {
      if (err) throw err;
      if (!user.deleted) {
        const defaultThumbnail = {
          name: 'No Name',
          userName: 'only User form',
          image: 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png',
          profileId: user.id,
          deleted: true
        };
        res.locals.controller.updateThumbnail(
          id,
          defaultThumbnail,
          (err, data) => {
            if (err) throw err;
            res.locals.controller.renderSelectedUser(user.id);
          }
        );
      } else {
        res.locals.controller.deleteThumbnail(id, (err, result) => {
          if (err) throw err;
          res.locals.controller.deleteUser(user.id, (err, result) => {
            if (err) throw err;
            res.locals.controller.renderThumbnail();
          });
        });
      }
    });
  });
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    res.locals.controller.renderSelectedUser(id);
  }
});
router.get('/user/:id/delete', (req, res) => {
  const id = req.params.id;
  res.locals.controller.readUser(id, (err, user) => {
    if (err) throw err;
    res.locals.controller.readThumbnail(user.cardId, (err, thumb) => {
      if (err) throw err;
      if (!thumb.deleted) {
        const defaultUser = {
          name: 'please edit name',
          userName: 'lease edit userName',
          email: 'example@example.com',
          age: parseInt('99'),
          location: 'please edit your location',
          hobies: 'please add some hobbies',
          cardId: thumb.id,
          image: 'http://lorempixel.com/640/480',
          deleted: true
        };
        res.locals.controller.updateUser(id, defaultUser, (err, result) => {
          if (err) throw err;
          res.locals.controller.renderThumbnail();
        });
      } else {
        res.locals.controller.deleteUser(id, (err, result) => {
          if (err) throw err;
          res.locals.controller.deleteThumbnail(thumb.id, (err, data) => {
            if (err) throw err;
            res.locals.controller.renderThumbnail();
          });
        });
      }
    });
  });
});

module.exports = router;
