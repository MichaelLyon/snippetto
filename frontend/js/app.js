angular.module('myApp', ['ui.router', 'myApp.controllers', 'myApp.services'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('')//login
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
    .state('news', {
      url: '/news',
      templateUrl: '/views/news.html',
      controller: 'newsController',
      controllerAs: 'news'
    })
    .state('reddit',{
      url:'/reddit',
      templateUrl:'/views/reddit.html',
      controller:'redditController',
      controllerAs: 'reddit'
    })
    .state('members', {
      url: '/members',
      templateUrl: '/views/members.html',
      controller: 'membersController',
      controllerAs: 'members'
    })

}])
