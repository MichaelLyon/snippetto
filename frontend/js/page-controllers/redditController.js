angular.module('myApp.redditController', [])

.controller('redditController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var reddit = this;
	$http.post('https://snippetto.herokuapp.com/reddit/subredditList').then(function(data) {
		reddit.redditSubList = data.data.data.children;
	})
	this.getSub = function(name) {
		$rootScope.subreddit = name;
	}
}])
