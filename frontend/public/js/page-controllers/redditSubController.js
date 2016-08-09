angular.module('myApp.redditSubController', [])

.controller('redditSubController', ['$http', '$rootScope', '$state', '$stateParams', function($http, $rootScope, $state, $stateParams) {
	var redditSub = this;
	this.name = $rootScope.subreddit
	$http.post(`https://snippetto.herokuapp.com/reddit/subreddit/${$rootScope.subreddit}`).then(function(data) {
		redditSub.redditResults = data.data.data.children;
	})
}])
