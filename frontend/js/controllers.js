angular.module('myApp.controllers', [])

.controller('loginController', ['$http', '$state', '$rootScope', function($http, $state, $rootScope) {
  var self = this
  var startingIndex = window.location.search.indexOf('code=') + 5
  $rootScope.accessToken = window.location.search.substring(startingIndex, window.location.search.length)

  if (window.location.href.includes('code')) {
    console.log(window.location);
    $state.go('home')
  }
}])

.controller('homeController', ['$http', '$rootScope', function($http, $rootScope) {
    console.log('this is the home page');
    console.log($rootScope.accessToken);
}])


.controller('newsController', ['$http', function($http) {
    var self = this
    $http.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6acc556fbac84c2aa266476c82b9d4f2').then(function(data) {
        self.stories = data.data.results
    })
}])


.controller('redditController', ['$http', function($http) {
    var getReddit = function() {
        var requestString = 'https://www.reddit.com/r/webdev/top/.json';
        request = new XMLHttpRequest();
        request.onload = proccessResults;
        request.open("get", requestString, true);
        request.send();
    };

    var proccessResults = function() {
        //console.log(this.responseText);
        var results = JSON.parse(this.responseText);
        console.log(results);
        self.redditResults = results.data.children[0].data.author;
    };
    //comments
    getReddit();

}])
