const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || '3000';
const controller = require('./src/controllers/controller');
const user = require('./src/models/userModel');
const view = require('./src/views/view');
const thumbnailModel = require('./src/models/thumbnailModel');
const statusModel = require('./src/models/statusModel');
const handler = require('./src/routes/routes');

controller.setModel(user);
controller.setThumbModel(thumbnailModel);
controller.setStatusModel(statusModel);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use((req, res, next) => {
  view.setRes(res);
  controller.setView(view);
  res.locals.controller = controller;
  next();
});
console.log(handler);
app.use(handler);

app.listen(PORT, () => {
  console.log('server running' + PORT);
});
