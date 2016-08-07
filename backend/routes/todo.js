var express = require('express');
var router = express.Router();
var request = require('request')
var Todo = require('../lib/todoQueries')


router.post('/new', function(req, res, next) {
  console.log(req.body);
  Todo.addTask(req.body.user_id, req.body.task, req.body.priority, req.body.dueDate, req.body.time, req.body.description).then(function() {
    res.sendStatus(200)
  })
});


router.post('/show', function(req, res, next) {
  Todo.getList(req.body.user_id).then(function(list) {
    res.send(list.rows)
  })
});

router.post('/edit', function(req, res, next) {
  Todo.todoEdit(req.body.user_id, req.body.task_id, req.body.task, req.body.priority, req.body.due_date, req.body.time, req.body.description).then(function(list) {
    res.sendStatus(200)
  })
});

router.post('/delete', function(req, res, next) {
  Todo.todoDelete(req.body.task_id).then(function(list) {
    res.sendStatus(200)
  })
});

router.get('/showTask/:user_id/:task_id', function(req, res, next) {
  console.log(req.params);
  Todo.getTask(req.params.user_id, req.params.task_id).then(function(task) {
    res.send(task.rows[0])
  })
});





module.exports = router;
