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
  getNewsPreferences: function(id) {
    return knex.raw(`select * from nyt_sections where user_id = ${id}`)
  },
  saveAddresses: function(street,city,state,zip){
    return knex.raw(`insert into work_address values(default, '${street}', '${city}', '${state}', ${zip})`);
  },
  saveAddress: function(addressObj) {
    return knex.raw(`insert into work_address values (${addressObj.id}, '${addressObj.street}', '${addressObj.city}', '${addressObj.state}', ${addressObj.zip})`);
  },
  selectUser: function(id) {
    return knex.raw(`select * from work_address where user_id = ${id}`);
  },
  updateAddress: function(addressObj) {
    return knex.raw(`update work_address set street = '${addressObj.street}', city = '${addressObj.city}', state = '${addressObj.state}', zip = ${addressObj.zip} where user_id = ${addressObj.id}`);
  },
  resetUserPrefs: function(id) {
    return knex.raw(`delete from nyt_sections where user_id = ${id}`)
  }
}
