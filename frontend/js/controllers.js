angular.module('myApp.controllers', [])


.controller('loginController', ['$http', '$stateProvider', function($http, $stateProvider) {
  console.log('this is the login controller');
}])


.controller('homeController', ['$http', '$stateProvider', function($http, $stateProvider) {
  console.log('this is the home page');
}])
