angular.module('myApp.controllers', [])

.controller('loginController', ['$http', '$state', '$rootScope', function($http, $state, $rootScope) {
    var self = this

    if (window.location.href.includes('code')) {
        $state.go('members')
    }
}])

.controller('homeController', ['$http', '$rootScope', function($http, $rootScope) {


}])

.controller('newsController', ['$http', '$rootScope', function($http, $rootScope) {
    var self = this
    console.log($rootScope);
    if ($rootScope.username) {
        self.showPrefs = true
    } else {
        self.showPrefs = false
    }
    $http.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6acc556fbac84c2aa266476c82b9d4f2').then(function(data) {
        self.stories = data.data.results;
    })

    this.gatherPreferences = function() {
        if ($rootScope.user_id) {
            var postObj = {
                user_id: $rootScope.user_id
            }
        } else {
            var postObj = {}
        }
        var preferences = document.getElementsByClassName('news-checkbox')
        for (var i = 0; i < preferences.length; i++) {
            if (preferences[i].checked) {
                postObj[preferences[i].name] = preferences[i].name
            }
        }
        $http.post('http://localhost:3000/news/setPreferences', postObj).then(function() {
            console.log('post successful');
        })
    }
    // Image replacement function -- not working yet
    // function imgError(image) {
    //   image.onerror = "";
    //   image.src = "../images/Snippetto.png";
    //   console.log('hit');
    //   return true;
    // }
}])

.controller('redditController', ['$http', '$rootScope', function($http, $rootScope) {
    var reddit = this;
    $http.post('http://localhost:3000/reddit/subredditList').then(function(data) {
        console.log(data);
        reddit.redditSubList = data.data.data.children;
    })
    this.getSub = function(name) {
        $rootScope.subreddit = name;
    }
}])

.controller('redditSubController', ['$http', '$rootScope', function($http, $rootScope) {
    var redditSub = this;
    $http.post(`http://localhost:3000/reddit/subreddit/${$rootScope.subreddit}`).then(function(data) {
        console.log(data);
        redditSub.redditResults = data.data.data.children;
    })
}])


.controller('membersController', ['$http', '$rootScope', function($http, $rootScope) {
    if (window.location.href.includes('code')) {
        var startingIndex = window.location.search.indexOf('code=') + 5
        $rootScope.code = window.location.search.substring(startingIndex, window.location.search.length)
        $http.post(`https://www.googleapis.com/oauth2/v4/token?code=${$rootScope.code}&client_id=709501805031-d87qamtke60go50st3tiv2lu235fpcfb.apps.googleusercontent.com&client_secret=Srv4Ep2JLkXSZnHdi_HGmYFY&redirect_uri=http://localhost:8000&grant_type=authorization_code`).then(function(response) {
            $rootScope.accessToken = response.data.access_token
            var postObj = {
                accessToken: $rootScope.accessToken
            }
            $http.post('http://localhost:3000/google/oauth', postObj).then(function(data) {
                $rootScope.username = data.data.email
                $http.post('http://localhost:3000/google/new', {
                    username: $rootScope.username
                }).then(function(data) {
                    $rootScope.user_id = data.data.user_id
                    if (data.data.firstTimeUser) {
                        $rootScope.firstTimeUser = true
                    }
                })
            })
        })
    }
}])


.controller('weatherController', ['$http', '$rootScope', function($http, $rootScope) {

}])

.controller('trafficController', ['$http', '$rootScope', function($http, $rootScope) {
    var traffic = this;
    // $http.post('http://localhost:3000/traffic/getTraffic').then(function(data){
    //   console.log(data);
    //   // traffic.redditSubList = data.data.data.children;
    // })
    this.workAddGet = function(address) {
        $rootScope.workAddress = address;
        $http.post('http://localhost:3000/setAddress/' + address.street + '/' + address.city + '/' + address.state + '/' + address.zip).then(function() {

        })
        console.log($rootScope.workAddress);
    }
}])

.controller('calendarController', ['$http', '$rootScope', function($http, $rootScope) {

}])

.controller('twitterController', ['$http', '$rootScope', function($http, $rootScope) {

}])

.controller('funController', ['$http', '$rootScope', function($http, $rootScope) {

}])
