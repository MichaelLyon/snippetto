angular.module('myApp.controllers', [])
    //raw js here
    //COMMENT FOR MERGE STUFF
    //more comment for merge


.controller('loginController', ['$http', '$state', function($http, $state) {
  //adding a comment in the login controller

  
  if (window.location.href.includes('code')) {
    $state.go('news')
  }
}])

.controller('homeController', ['$http', function($http) {
    console.log('this is the home page');
    //adding some shit
    //in the home controller
    //yo
}])


.controller('newsController', ['$http', function($http) {
    var self = this
    $http.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6acc556fbac84c2aa266476c82b9d4f2').then(function(data) {
        self.stories = data.data.results
    })
}])


.controller('redditController', ['$http', function($http) {
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
        self.redditResults = results.data.children[0].data.author;
    };
    //comments
    getReddit();

}])
