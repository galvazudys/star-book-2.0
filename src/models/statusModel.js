const schema = require('./schema/statusSchema');
const Creator = require('./arrayModelCreator');
const db = require('./statusDB');

const status = Creator('status', schema);
status.setDb(db);

module.exports = status;
