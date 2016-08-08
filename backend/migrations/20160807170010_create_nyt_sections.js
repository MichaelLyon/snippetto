exports.up = function(knex, Promise) {
  return knex.schema.createTable("nyt_sections", function(table){
    table.integer('user_id');
    table.string('section');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("nyt_sections")
};
