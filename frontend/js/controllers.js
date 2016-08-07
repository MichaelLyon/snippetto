angular.module('myApp.controllers', [])

.controller('redditController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var reddit = this;
	$http.post('http://localhost:3000/reddit/subredditList').then(function(data) {
		reddit.redditSubList = data.data.data.children;
	})
	this.getSub = function(name) {
		$rootScope.subreddit = name;
	}
}])

.controller('redditSubController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var redditSub = this;

	$http.post(`http://localhost:3000/reddit/subreddit/${$rootScope.subreddit}`).then(function(data) {
		redditSub.redditResults = data.data.data.children;
	})
}])


.controller('homeController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
}])


.controller('weatherController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var lat = $rootScope.currentPosition.lat
	var lng = $rootScope.currentPosition.lng

	function timeConverter(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
		var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
		var sec = a.getSeconds();
		var mdy = month + ' ' + date + ' ' + year
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
		return mdy;
	}
	var self = this
	$http.post('http://localhost:3000/weather/getWeather', $rootScope.currentPosition).then(function(data) {
		self.weatherData = data.data
		self.city = data.data.name
		self.desc = data.data.weather[0].description
		self.temp = Math.ceil(data.data.main.temp) + '°'
		self.weatherImg = data.data.weather[0].icon
			// console.log('root: ',$rootScope.currentPosition.lat);

		$http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&units=imperial&cnt=5&APPID=c98ec93f5a134adb4a37ca10c015d4e5`).then(function(obj) {
      console.log(obj.data.list[0].dt);
			self.day1 = timeConverter(obj.data.list[0].dt)
			self.day2 = timeConverter(obj.data.list[1].dt)
			self.day3 = timeConverter(obj.data.list[2].dt)
			self.min_temp1 = Math.ceil(obj.data.list[0].temp.min) + '°'
			self.max_temp1 = Math.ceil(obj.data.list[0].temp.max) + '°'
			self.min_temp2 = Math.ceil(obj.data.list[1].temp.min) + '°'
			self.max_temp2 = Math.ceil(obj.data.list[1].temp.max) + '°'
			self.min_temp3 = Math.ceil(obj.data.list[2].temp.min) + '°'
			self.max_temp3 = Math.ceil(obj.data.list[2].temp.max) + '°'
			self.day1_icon = obj.data.list[0].weather[0].icon
			self.day2_icon = obj.data.list[1].weather[0].icon

			self.day3_icon = obj.data.list[2].weather[0].icon
		})
	})
}])

.controller('trafficController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var selfTraffic = this;
	//User Origin var
	var origin1 = new google.maps.LatLng($rootScope.currentPosition);
	//Google maps objects for displaying/finding directions/showing traffic
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var trafficLayer = new google.maps.TrafficLayer();
	//The map object
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	//What's being sent to backend
	var serverObject = {};

	serverObject.origin1 = origin1;
	serverObject.userId = $rootScope.user_id;

	this.trafficSwitch = false;

	//Controls the Traffic view and form input to save addresses
	if ($rootScope.user_id) {
		this.trafficSwitch = true;
	}

	var mapOptions = {
		zoom: 15,
		center: origin1,
		mapTypeId: google.maps.MapTypeId.MAP
	}

	//Setting the map objects
	directionsDisplay.setMap(map);
	trafficLayer.setMap(map);

	$http.post('http://localhost:3000/traffic', serverObject).then(function(data) {
		selfTraffic.durationToDestination = data.data.durationToWork.text;
		calculateAndDisplayRoute(directionsService, directionsDisplay);

		function calculateAndDisplayRoute(directionsService, directionsDisplay) {
			directionsService.route({
				origin: origin1,
				destination: data.data.destinationCords,
				travelMode: 'DRIVING'
			}, function(response, status) {
				if (status === 'OK') {
					directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		}
	})

	this.workAddGet = function(address) {
		address.id = $rootScope.user_id;
		$rootScope.workAddress = address;
		$http.post('http://localhost:3000/traffic/setAddress', $rootScope.workAddress).then(function(some) {
		})
	}
}])

.controller('funController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var foo = this
	$http.get('http://localhost:3000/fun/getFun').then(function(obj) {
		foo.qoute = obj.data.quoteText
		foo.author = obj.data.quoteAuthor
		$http.get('http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(function(obj2) {
			foo.word = obj2.data.word
			foo.definition = obj2.data.definitions[0].text
			foo.pof = obj2.data.definitions[0].partOfSpeech
			foo.example = obj2.data.examples[0].text
      console.log('example: ',obj2.data);
			$http.get('http://api.adviceslip.com/advice').then(function(obj3) {
				foo.advice = obj3.data.slip.advice
        console.log('advice: ', foo.advice);
				$http.get('https://api.chucknorris.io/jokes/random').then(function(obj4) {
					foo.chuckNorris = obj4.data.value
          console.log('chuck: ',foo.chuckNorris);
				})
			})
		})
	})

  this.toggleVisibility = function (id) {
    console.log(id);
    var e = document.getElementById(id);
		if (e.style.display == 'block')
			e.style.display = 'none';
		else
			e.style.display = 'block';
  }
}])
