var knex = require('../db/knex');
var async = require('async')

module.exports = {
  createNewUser: function(username) {
    return knex.raw(`insert into users values (default, '${username}')`).then(function() {
      return knex.raw(`select * from users where username = '${username}'`)
    })
  },
  checkForExistingUser: function(username) {
    return knex.raw(`select * from users where username = '${username}'`)
  },
  createArrayForAsync: function(user_id, arr) {
    return arr.map(function(elem) {
      return function(callback) {
        return knex.raw(`insert into nyt_sections values (${user_id}, '${elem}')`).then(function() {
          callback(null, elem)
        })
      }
    })
  },
  series: function(seriesArray) {
    async.series(seriesArray, function(err, results) {
            if (err) {
                console.log(err);
            }
            if (results) {
              console.log(results);
            }
        })
  },
  saveAddresses: function(street,city,state,zip){
    return knex.raw(`insert into work_address values(default, '${street}', '${city}', '${state}', ${zip})`);
  }
}
