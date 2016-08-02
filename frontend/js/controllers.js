angular.module('myApp.controllers', [])
//raw js here

.controller('loginController', ['$http', function($http) {
  console.log('this is the login controller');

}])

.controller('homeController', ['$http', function($http) {
  console.log('this is the home page');
}])


.controller('newsController', ['$http', function($http) {
  var self = this
  $http.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6acc556fbac84c2aa266476c82b9d4f2').then(function(data) {
    self.stories = data.data.results
  })
}])


.controller('apiController', ['$http', function($http){
  console.log('api');
  var clientID = 'e8ZJzbmcLGzGLmwXOkHOBxrqkQ8';

  var getReddit = function() {
  var requestString = "https://www.reddit.com/api/v1/authorize?client_id=" +clientID+"&response_type=code&state=1337&redirect_uri=https://reddit.com&duration=temporary&scope=mysubreddits";
  request = new XMLHttpRequest();
  request.onload = proccessResults;
  request.open("get", requestString, true);
  request.send();
};

  var proccessResults = function() {
    // console.log(this.responseText);
    var results = JSON.parse(JSON.stringify(this.responseText));
    console.log(results);
    redditResults = results;
  };

getReddit();

}])
