angular.module('myApp.redditSubController', [])

.controller('redditSubController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var redditSub = this;

	$http.post(`http://localhost:3000/reddit/subreddit/${$rootScope.subreddit}`).then(function(data) {
		redditSub.redditResults = data.data.data.children;
	})
}])
