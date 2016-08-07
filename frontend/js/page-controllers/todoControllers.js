angular.module('myApp.todoControllers', [])

.controller('todoController', ['$http', '$rootScope', '$state', 'testService', function($http, $rootScope, $state, testService) {
	var self = this

	$http.post('https://snippetto.herokuapp.com/todo/show', {
		user_id: $rootScope.user_id
	}).then(function(list) {
		self.todoList = list.data
	})

	this.addTask = function() {
		console.log(self.time);
		console.log(self.dueDate);
		var postObj = {
			user_id: $rootScope.user_id,
			task: self.task,
			priority: self.priority,
			dueDate: self.dueDate.toString().substring(0, 15),
			time: self.time.toString().substring(16, 24),
			description: self.description
		}
		console.log(postObj);
		$http.post('https://snippetto.herokuapp.com/todo/new', postObj).then(function() {
			$state.reload()
		})
	}

	this.delete = function(task_id) {
		$http.post('https://snippetto.herokuapp.com/todo/delete', {
			task_id: task_id
		}).then(function() {
			$state.reload()
		})
	}

}])


.controller('showTaskController', ['$http', '$rootScope', '$state', '$stateParams', function($http, $rootScope, $state, $stateParams) {
	$rootScope.header = 'views/header.html';
	var self = this
	$http.get(`https://snippetto.herokuapp.com/todo/showTask/${$stateParams.user_id}/${$stateParams.task_id}`).then(function(task) {
		console.log(task.data);
		self.task = task.data.task
		self.task_id = task.data.task_id
		self.user_id = task.data.user_id
		self.priority = task.data.priority
		self.due_date = task.data.due_date
		self.time = task.data.time
		self.description = task.data.description
	})

	this.edit = function() {
		var postObj = {
			user_id: $stateParams.user_id,
			task_id: $stateParams.task_id,
			task: self.task,
			priority: self.priority,
			due_date: self.due_date,
			time: self.time,
			description: self.description
		}
		$http.post('https://snippetto.herokuapp.com/todo/edit', postObj).then(function() {
			$state.go('todo')
		})
	}
}])
