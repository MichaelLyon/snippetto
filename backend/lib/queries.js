var knex = require('../db/knex');

module.exports = {
  createNewUser: function(username) {
    return knex.raw(`insert into users values (default, '${username}')`)
  },
  checkForExistingUser: function(username) {
    return knex.raw(`select username from users where username = '${username}'`)
  }
}
