angular.module('myApp.controllers', [])


.controller('loginController', ['$http', function($http) {
  console.log('this is the login controller');

}])

.controller('homeController', ['$http', function($http) {
  console.log('this is the home page');
}])

.controller('apiController', ['$http', function($http){
  console.log('api');
  var getReddit = function() {
  var requestString = "https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=TYPE&state=RANDOM_STRING&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING";
  request = new XMLHttpRequest();
  request.onload = proccessResults;
  request.open("get", requestString, true);
  request.send();
};

var proccessResults = function() {
  var results = JSON.parse(this.responseText);
  console.log(results);
  redditResults = results;
};

getReddit();

}])
