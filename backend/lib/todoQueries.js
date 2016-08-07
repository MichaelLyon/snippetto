var knex = require('../db/knex');
var async = require('async')

module.exports = {
	addTask: function(user_id, task, priority, dueDate, time, description) {
		return knex.raw(`insert into todo_list values (default, ${user_id}, '${task}', ${priority}, '${dueDate}', '${time}', '${description}')`)
	},
	getList: function(id) {
		return knex.raw(`select * from todo_list where user_id = ${id}`)
	},
	todoEdit: function(user_id, task_id, task, priority, due_date, time, description) {
		return knex.raw(`update todo_list set task = '${task}', priority = ${priority}, due_date = '${due_date}', time = '${time}', description = '${description}' where user_id = ${user_id} and task_id = ${task_id}`)
	},
	todoDelete: function(id) {
		return knex.raw(`delete from todo_list where task_id = ${id}`)
	},
	getTask: function(user_id, task_id) {
		return knex.raw(`select * from todo_list where user_id = ${user_id} and task_id = ${task_id}`)
	},
}
