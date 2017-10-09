const schema = require('./schema/userSchema');
const Creator = require('./arrayModelCreator');
const database = require('./array_db');

const user = Creator('user', schema);
user.setDb(database);
module.exports = user;
