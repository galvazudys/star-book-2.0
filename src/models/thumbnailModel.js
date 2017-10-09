const thumbnail = require('./schema/thumbnailSchema');
const Creator = require('./arrayModelCreator');
const db = require('./thumbnailsDB');

const thumbnailModel = Creator('thumbnail', thumbnail);
thumbnailModel.setDb(db);

module.exports = thumbnailModel;
