import user from './models/userModel';
import controller from './controllers/controller';
import view from './views/view';
import thumbnailModel from './models/thumbnailModel';
import statusModel from './models/statusModel';

window.onload = () => {
  controller.setModel(user);
  controller.setView(view);
  controller.setThumbModel(thumbnailModel);
  controller.setStatusModel(statusModel);

  controller.renderThumbnail();

  window.seeUser = function seeUser(userID) {
    controller.renderSelectedUser(userID);
  };
  window.goHome = () => {
    controller.renderThumbnail();
  };
  window.openForm = () => {
    controller.renderThumbnailForm(() => {
      const form = document.getElementById('thumbnailForm');
      form.addEventListener('submit', e => {
        e.preventDefault();
        let profID;
        let cardID;
        let thumbnailForm = {
          name: e.target[0].value,
          userName: e.target[1].value,
          image: e.target[2].value,
          profileId: 'x'
        };
        controller.addThumbnail(thumbnailForm, (error, result) => {
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
        controller.addUser(userForm, (err, result) => {
          if (err) throw err;
          profID = result.result.id;
        });
        thumbnailForm.profileId = profID;
        userForm.cardId = cardID;
        controller.updateThumbnail(cardID, thumbnailForm, (err, result) => {
          if (err) throw err;
          controller.updateUser(profID, userForm, (err, user) => {
            if (err) throw err;
            controller.renderThumbnail();
          });
        });
      });
    });
  };

  window.deleteUser = e => {
    const id = e.parentNode.id;
    controller.readUser(id, (err, user) => {
      if (err) throw err;
      controller.readThumbnail(user.cardId, (err, thumb) => {
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
          controller.updateUser(id, defaultUser, (err, result) => {
            if (err) throw err;
            controller.renderThumbnail();
          });
        } else {
          controller.deleteUser(id, (err, result) => {
            if (err) throw err;
            controller.deleteThumbnail(thumb.id, (err, data) => {
              if (err) throw err;
              controller.renderThumbnail();
            });
          });
        }
      });
    });
    controller.deleteUser(id, (error, result) => {
      if (error) throw error;
      controller.renderUsers();
    });
  };
  window.updateThumbnail = id => {
    controller.renderThumbnailUpdate(id, (err, thumb) => {
      const form = document.getElementById('thumbnailForm');
      form.addEventListener('submit', e => {
        e.preventDefault();
        let thumbForm = {
          name: e.target[0].value,
          userName: e.target[1].value,
          image: e.target[2].value,
          profileId: thumb.profileId
        };
        controller.updateThumbnail(id, thumbForm, (err, data) => {
          if (err) throw err;
          controller.renderSelectedUser(thumb.profileId);
        });
      });
    });
  };
  window.deleteThumbnail = id => {
    controller.readThumbnail(id, (error, data) => {
      if (error) throw err;
      controller.readUser(data.profileId, (err, user) => {
        if (err) throw err;
        if (!user.deleted) {
          const defaultThumbnail = {
            name: 'No Name',
            userName: 'only User form',
            image:
              'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png',
            profileId: user.id,
            deleted: true
          };
          controller.updateThumbnail(id, defaultThumbnail, (err, data) => {
            if (err) throw err;
            controller.renderSelectedUser(user.id);
          });
        } else {
          controller.deleteThumbnail(id, (err, result) => {
            if (err) throw err;
            controller.deleteUser(user.id, (err, result) => {
              if (err) throw err;
              controller.renderThumbnail();
            });
          });
        }
      });
    });
  };

  window.updateUser = e => {
    const id = e.parentNode.id;
    controller.readUser(id, (error, user) => {
      if (error) throw error;
      controller.renderUserUpdateForm(user, () => {
        const form = document.getElementById('userAction');
        form.addEventListener('submit', e => {
          e.preventDefault();
          const userForm = {
            name: e.target[0].value,
            userName: e.target[1].value,
            email: e.target[2].value,
            age: parseInt(e.target[3].value),
            location: e.target[4].value,
            hobies: e.target[5].value,
            cardId: 'x',
            image: e.target[6].value
          };
          controller.updateUser(id, userForm, (error, newUser) => {
            if (error) throw error;
            controller.renderSelectedUser(id);
          });
        });
      });
    });
  };
  window.addStatus = id => {
    let msg = document.getElementById('textarea1').value;
    controller.readUser(id, (err, user) => {
      if (err) throw err;
      const status = {
        profileId: id,
        message: msg,
        userName: user.userName
      };
      controller.addStatus(status, (error, result) => {
        if (error) throw error;

        user.status.push(result.result.id);
        controller.updateUser(id, user, (er, data) => {
          if (er) throw er;
          controller.renderSelectedUser(id);
        });
        // result.result.id
      });
    });
  };
  window.deleteStatus = id => {
    controller.removeStatus(id, (err, data) => {
      if (err) throw err;
      controller.renderSelectedUser(data.object[0].profileId);
    });
  };
};
