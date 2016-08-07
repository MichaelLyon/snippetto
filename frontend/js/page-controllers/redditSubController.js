angular.module('myApp.redditSubController', [])

.controller('redditSubController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var redditSub = this;

	$http.post(`https://snippetto.herokuapp.com/reddit/subreddit/${$rootScope.subreddit}`).then(function(data) {
		redditSub.redditResults = data.data.data.children;
	})
}])
