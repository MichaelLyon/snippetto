angular.module('myApp.youtubeController', [])


.controller('youtubeController', ['$http', '$rootScope', '$sce', '$state', function($http, $rootScope, $sce, $state) {
  this.view = 'search'
    var self = this
    $http.get('http://localhost:3000/youtube/getTopVideos').then(function(data) {
        self.videos = data.data.items.map(function(elem) {
            return {
              videoId: $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + elem.id),
              videoTitle: elem.snippet.title,
              originalVideoId: elem.id
            }
        })
        self.videosLoaded = true
    })

    this.searchVideos = function() {
      var postObj = {
        searchString: self.searchString
      }
      $http.post('http://localhost:3000/youtube/search', postObj).then(function(data) {
        console.log(data.data.items);
        self.searchVideoResults = data.data.items.map(function(elem) {
            return {
              videoId: $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + elem.id.videoId),
              videoTitle: elem.snippet.title,
              originalVideoId: elem.id.videoId
            }
        })
      })
    }

    this.addToFavorites = function(videoId, videoTitle, event) {
      document.getElementById(event.target.id).className += ' green'
      $http.post('http://localhost:3000/youtube/addToFavorites', {user_id: $rootScope.user_id, videoId: videoId, videoTitle: videoTitle}).then(function() {
      })
    }

    this.changeView = function(view) {
      this.view = view
    }

    this.getFavoritedVideos = function() {
      $http.get('http://localhost:3000/youtube/getFavorites').then(function(data) {
        self.favoritedVideos = data.data.map(function(elem) {
            return {
              videoId: $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + elem.video_id),
              videoTitle: elem.video_title,
              favorites: elem.favorites,
              originalVideoId: elem.video_id
            }
        })
      })
    }
    this.getVideoFavoriteUsers = function(videoId) {
      console.log(videoId);
      $http.get('http://localhost:3000/youtube/getVideoFavoriteUsers/' + videoId).then(function(data) {
        self.favoritedUsers = data.data
      })
    }
}])
