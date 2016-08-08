exports.up = function(knex, Promise) {
  return knex.schema.createTable("todo_list", function(table){
    table.increments('task_id');
    table.integer('user_id');
    table.string('task');
    table.integer('priority');
    table.string('due_date');
    table.string('time');
    table.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("todo_list")
};
