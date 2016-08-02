angular.module('myApp.controllers', [])

.controller('loginController', ['$http', '$state', '$rootScope', function($http, $state, $rootScope) {
  var self = this

  if (window.location.href.includes('code')) {
    $state.go('home')
  }
}])

.controller('homeController', ['$http', '$rootScope', function($http, $rootScope) {
  if (window.location.href.includes('code')) {
    var startingIndex = window.location.search.indexOf('code=') + 5
    $rootScope.code = window.location.search.substring(startingIndex, window.location.search.length)
    $http.post(`https://www.googleapis.com/oauth2/v4/token?code=${$rootScope.code}&client_id=709501805031-d87qamtke60go50st3tiv2lu235fpcfb.apps.googleusercontent.com&client_secret=Srv4Ep2JLkXSZnHdi_HGmYFY&redirect_uri=http://localhost:8000&grant_type=authorization_code`).then(function(response) {
      $rootScope.accessToken = response.data.access_token
      var postObj = {
        accessToken: $rootScope.accessToken
      }
      console.log(postObj);
      $http.post('http://localhost:3000/google/oauth', postObj).then(function(data) {
        console.log(data.data);
        console.log('access token sent successfully');
      })
    })
  }




}])


.controller('newsController', ['$http', function($http) {
    var self = this
    $http.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6acc556fbac84c2aa266476c82b9d4f2').then(function(data) {
        self.stories = data.data.results;
    })
}])


.controller('redditController', ['$http', '$rootScope', function($http, $rootScope) {
  var reddit = this;
  $http.get('https://www.reddit.com/r/webdev/top/.json').then(function(data){
    // console.log(data.data.data.children);
    reddit.redditResults = data.data.data.children;
  })
}])
