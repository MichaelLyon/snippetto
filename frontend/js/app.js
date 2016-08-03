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
    .state('reddit_sub',{
      url:'/reddit_sub',
      templateUrl:'/views/reddit_subSelected.html',
      controller:'redditSubController',
      controllerAs: 'redditSub'
    })
    .state('members', {
      url: '/members',
      templateUrl: '/views/members.html',
      controller: 'membersController',
      controllerAs: 'members'
    })
    .state('weather', {
      url: '/weather',
      templateUrl: '/views/weather.html',
      controller: 'weatherController',
      controllerAs: 'weather'
    })
    .state('traffic', {
      url: '/traffic',
      templateUrl: '/views/traffic.html',
      controller: 'trafficController',
      controllerAs: 'traffic'
    })
    .state('calendar', {
      url: '/calendar',
      templateUrl: '/views/calendar.html',
      controller: 'calendarController',
      controllerAs: 'calendar'
    })
    .state('twitter', {
      url: '/twitter',
      templateUrl: '/views/twitter.html',
      controller: 'twitterController',
      controllerAs: 'twitter'
    })
    .state('fun', {
      url: '/fun',
      templateUrl: '/views/fun.html',
      controller: 'funController',
      controllerAs: 'fun'
    })
}])
