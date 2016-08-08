exports.up = function(knex, Promise) {
  return knex.schema.createTable("saved_articles", function(table){
    table.integer('user_id');
    table.string('image');
    table.string('section');
    table.string('title');
    table.string('url');
    table.string('abstract');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("saved_articles")
};
