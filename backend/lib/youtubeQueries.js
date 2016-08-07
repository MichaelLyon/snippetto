var knex = require('../db/knex');
var async = require('async')

module.exports = {
  addVideo: function(user_id, videoId, videoTitle) {
    return knex.raw(`insert into youtube_videos values (default, ${user_id}, '${videoId}', '${videoTitle}')`)
  },
  getFavoritedRank: function() {
    return knex.raw(`select video_title, video_id, count(video_title) as favorites
      from youtube_videos y
      join users u on y.user_id = u.user_id
      group by video_title, video_id
      order by favorites desc`)
  },
  getVideoFavoriteUsers: function(video_id) {
    return knex.raw(`select distinct username
      from users u
      join youtube_videos y on u.user_id = y.user_id
      where y.video_id = '${video_id}'`)
  }
}
