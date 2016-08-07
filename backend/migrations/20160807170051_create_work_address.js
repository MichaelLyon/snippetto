exports.up = function(knex, Promise) {
  return knex.schema.createTable("work_address", function(table){
    table.integer('user_id');
    table.string('street');
    table.string('city');
    table.string('state');
    table.integer('zip');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("work_address")
};
