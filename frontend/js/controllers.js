angular.module('myApp.controllers', [])


.controller('loginController', ['$http', function($http) {
  console.log('this is the login controller');

}])

.controller('homeController', ['$http', function($http) {
  console.log('this is the home page');
}])
