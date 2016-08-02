angular.module('myApp.controllers', [])
//raw js here

.controller('loginController', ['$http', function($http) {
  console.log('this is the login controller');

}])

.controller('homeController', ['$http', function($http) {
  console.log('this is the home page');
}])
