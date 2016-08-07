var knex = require('../db/knex');
var async = require('async')

module.exports = {
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
	resetUserPrefs: function(id) {
		return knex.raw(`delete from nyt_sections where user_id = ${id}`)
	},
	saveArticle: function(user_id, image, section, title, url, abstract) {
		return knex.raw(`insert into saved_articles values (${user_id}, '${image}', '${section}', '${title}', '${url}', '${abstract}')`)
	},
	getSavedArticles: function(id) {
		return knex.raw(`select * from saved_articles where user_id = ${id}`)
	},
	deleteArticle: function(id, title) {
		return knex.raw(`delete from saved_articles where user_id = ${id} and title = '${title}'`)
	}
}
