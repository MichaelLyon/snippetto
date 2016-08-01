angular.module('myApp.controllers', [])


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
