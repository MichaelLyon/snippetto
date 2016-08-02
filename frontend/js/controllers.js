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


.controller('apiController', ['$http', function($http) {
    var getReddit = function() {
        var requestString = 'https://www.reddit.com/r/webdev/top/.json';
        request = new XMLHttpRequest();
        request.onload = proccessResults;
        request.open("get", requestString, true);
        request.send();
    };

    var proccessResults = function() {
        //console.log(this.responseText);
        var results = JSON.parse(this.responseText);
        console.log(results);
        $http.redditResults = results.data.children[0].data.author;
    };

    getReddit();

}])
