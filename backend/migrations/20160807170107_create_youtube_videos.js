exports.up = function(knex, Promise) {
  return knex.schema.createTable("youtube_videos", function(table){
    table.increments('id');
    table.integer('user_id');
    table.string('video_id');
    table.string('video_title');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("youtube_videos")
};
