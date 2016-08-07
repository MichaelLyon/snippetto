angular.module('myApp.loginController', [])

.controller('loginController', ['$http', '$state', '$rootScope', function($http, $state, $rootScope) {
	var self = this
  this.showLogin = true
	//Bool scope variable to control the navbar in index.html

	var loadingModal = document.getElementById('myModal');

	var loadingDone = false;
	this.loadingNow = false;

	if (window.location.href.includes('code')) {
		this.loadingNow = true;
		loadingModal.className = 'in';
    self.showLogin = false
	}
	var intervalID = window.setInterval(getPosition, 500);

	function getPosition() {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			$rootScope.currentPosition = pos;
      console.log(pos);
			loadingDone = true;
		})
		if (loadingDone === true) {
			clearIntervalAndSuch();
		}
	}

	function clearIntervalAndSuch() {
		clearInterval(intervalID);
		displayPage();
	}

	function displayPage() {
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
		loginAndSuch();
	}

	function loginAndSuch() {
		if (window.location.href.includes('code')) {
			$state.go('home')
		}
	}
}])
