angular.module('myApp.youtubeController', [])


.controller('youtubeController', ['$http', '$rootScope', '$sce', '$state', function($http, $rootScope, $sce, $state) {
  this.view = 'search'
    var self = this
    $http.get('https://snippetto.herokuapp.com/youtube/getTopVideos').then(function(data) {
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
      $http.post('https://snippetto.herokuapp.com/youtube/search', postObj).then(function(data) {
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
      $http.post('https://snippetto.herokuapp.com/youtube/addToFavorites', {user_id: $rootScope.user_id, videoId: videoId, videoTitle: videoTitle}).then(function() {
      })
    }

    this.changeView = function(view) {
      this.view = view
    }

    this.getFavoritedVideos = function() {
      $http.get('https://snippetto.herokuapp.com/youtube/getFavorites').then(function(data) {
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
      $http.get('https://snippetto.herokuapp.com/youtube/getVideoFavoriteUsers/' + videoId).then(function(data) {
        self.favoritedUsers = data.data
      })
    }
}])
