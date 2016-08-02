angular.module('myApp', ['ui.router', 'myApp.controllers'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('login')
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'loginController',
      controllerAs: 'login'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/views/home.html',
      controller: 'homeController',
      controllerAs: 'home'
    })
    .state('api',{
      url:'/api',
      templateUrl:'/views/api.html',
      controller:'apiController',
      controllerAs: 'api'
    })
}])

// .controller('loginController', ['$http', function($http) {
//   console.log('this is the login controller');
// }])
//
//
// .controller('homeController', ['$http', function($http) {
//   console.log('this is the home controller');
// }])
