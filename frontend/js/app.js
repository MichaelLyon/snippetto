angular.module('myApp', ['ui.router', 'myApp.controllers', 'myApp.services'])

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
        .state('news', {
            url: '/news',
            templateUrl: '/views/news.html',
            controller: 'newsController',
            controllerAs: 'news'
        })
        .state('api', {
            url: '/api',
            templateUrl: '/views/api.html',
            controller: 'apiController',
            controllerAs: 'api'
        })
        .state('sign_ups', {
            url: '/signup',
            templateUrl: '/views/sign_ups.html',
            controller: 'signupController',
            controllerAs: 'sign_up'
        })
}])
