module.exports = {
  res: {},
  setRes(res) {
    this.res = res;
  },

  renderForm() {
    this.res.render('form');
  },
  renderUsers(users) {
    this.res.render('users', { users: users });
  },
  renderSelectedUser(user, status) {
    this.res.render('selectedUser', { user: user, status: status });
  },
  renderUpdateUser(user) {
    this.res.render('updateUser', { user: user });
  },
  renderUserThumbnails(thumbnails, status) {
    this.res.render('userThumbnails', {
      thumbnails: thumbnails,
      status: status
    });
  },
  renderThumbnailForm() {
    this.res.render('thumbnailForm');
  },
  renderUpdateThumbnailForm(thumbnail) {
    this.res.render('updateThumbnailForm', { thumbnail: thumbnail });
  }
};
