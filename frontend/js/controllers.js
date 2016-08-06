angular.module('myApp.controllers', [])

.controller('loginController', ['$http', '$state', '$rootScope', function($http, $state, $rootScope) {
	var self = this

	//Bool scope variable to control the navbar in index.html
	$rootScope.header = 'views/header.html';

	var loadingModal = document.getElementById('myModal');

	var loadingDone = false;
	this.loadingNow = false;

	if (window.location.href.includes('code')) {
		this.loadingNow = true;
		loadingModal.className = 'in';
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

.controller('newsController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	$rootScope.header = 'views/header.html';
	var self = this
	this.main = true
	this.saved = false
	this.currentSection = 'home'
	this.prefTabs = false
	if ($rootScope.username) {
		$http.post('http://localhost:3000/news/getPreferences', {
			user_id: $rootScope.user_id
		}).then(function(prefs) {
			if (prefs.data.preferences) {
				self.prefTabs = true
				self.preferences = prefs.data.preferences
			} else {
				self.showPrefs = true
			}
		})
	}
	$http.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6acc556fbac84c2aa266476c82b9d4f2').then(function(data) {
		self.stories = data.data.results;
	})

	this.updateNewsPage = function(section) {
		$http.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=6acc556fbac84c2aa266476c82b9d4f2`).then(function(data) {
			self.stories = data.data.results
		})
		this.currentSection = section
	}

	this.gatherPreferences = function() {
		self.showPrefs = false
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
			$state.reload()
		})
	}

	this.showSectionSelections = function() {
		self.showPrefs = true
	}

	this.saveArticle = function(img, section, title, url, abstract) {
		var postObj = {
			user_id: $rootScope.user_id,
			image: img,
			section: section,
			title: title,
			url: url,
			abstract: abstract
		}
		$http.post('http://localhost:3000/news/save', postObj).then(function() {
			console.log('post successful');
		})
	}

	this.deleteArticle = function(article) {
		var postObj = {
			user_id: $rootScope.user_id,
			title: article
		}
		$http.post('http://localhost:3000/news/deleteArticle', postObj).then(function() {
			self.getSavedArticles()
		})
	}

	this.getSavedArticles = function() {
		$http.post('http://localhost:3000/news/retrieveArticles', {
			user_id: $rootScope.user_id
		}).then(function(data) {
			self.stories = data.data
		})
		this.main = false
		this.saved = true
	}

	this.getCurrentArticles = function() {
		$state.reload()
	}
}])

.controller('redditController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	$rootScope.header = 'views/header.html';
	var reddit = this;
	$http.post('http://localhost:3000/reddit/subredditList').then(function(data) {
		reddit.redditSubList = data.data.data.children;
	})
	this.getSub = function(name) {
		$rootScope.subreddit = name;
	}
}])

.controller('redditSubController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	$rootScope.header = 'views/header.html';
	var redditSub = this;

	$http.post(`http://localhost:3000/reddit/subreddit/${$rootScope.subreddit}`).then(function(data) {
		redditSub.redditResults = data.data.data.children;
	})
}])


.controller('homeController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	$rootScope.header = 'views/header.html';
}])


.controller('weatherController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	$rootScope.header = 'views/header.html';
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
	$rootScope.header = 'views/header.html';
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

.controller('todoController', ['$http', '$rootScope', '$state', 'testService', function($http, $rootScope, $state, testService) {
	$rootScope.header = 'views/header.html';
	var self = this

	$http.post('http://localhost:3000/todo/show', {
		user_id: $rootScope.user_id
	}).then(function(list) {
		self.todoList = list.data
	})

	this.addTask = function() {
		console.log(self.time);
		console.log(self.dueDate);
		var postObj = {
			user_id: $rootScope.user_id,
			task: self.task,
			priority: self.priority,
			dueDate: self.dueDate.toString().substring(0, 15),
			time: self.time.toString().substring(16, 24),
			description: self.description
		}
		console.log(postObj);
		$http.post('http://localhost:3000/todo/new', postObj).then(function() {
			$state.reload()
		})
	}

	this.delete = function(task_id) {
		$http.post('http://localhost:3000/todo/delete', {
			task_id: task_id
		}).then(function() {
			$state.reload()
		})
	}

}])
.controller('youtubeController', ['$http', '$rootScope', '$sce', '$state', function($http, $rootScope, $sce, $state) {
	$rootScope.header = 'views/header.html';
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
        self.videoResults = data.data.items.map(function(elem) {
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + elem.id.videoId)
        })
      })
    }

    this.addToFavorites = function(videoId, videoTitle) {
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
              videoTitle: elem.video_title
            }
        })
      })
    }
}])

.controller('funController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	$rootScope.header = 'views/header.html';
	var foo = this
	$http.get('http://localhost:3000/fun/getFun').then(function(obj) {
		foo.qoute = obj.data.quoteText
		foo.author = obj.data.quoteAuthor
		$http.get('http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(function(obj2) {
			foo.word = obj2.data.word
			foo.definition = obj2.data.definitions[0].text
			foo.pof = obj2.data.definitions[0].partOfSpeech
			foo.example = obj2.data.examples[1].text
			$http.get('http://api.adviceslip.com/advice').then(function(obj3) {
				foo.advice = obj3.data.slip.advice
				$http.get('https://api.chucknorris.io/jokes/random').then(function(obj4) {
					foo.chuckNorris = obj4.data.value
				})
			})
		})
	})

	this.toggle_visibility1 = function() {
		var e = document.getElementById('toggle_div1');
		if (e.style.display == 'block')
			e.style.display = 'none';
		else
			e.style.display = 'block';
	}
	this.toggle_visibility2 = function() {
		var e = document.getElementById('toggle_div2');
		if (e.style.display == 'block')
			e.style.display = 'none';
		else
			e.style.display = 'block';
	}
	this.toggle_visibility3 = function() {
		var e = document.getElementById('toggle_div3');
		if (e.style.display == 'block')
			e.style.display = 'none';
		else
			e.style.display = 'block';
	}
	this.toggle_visibility4 = function() {
		var e = document.getElementById('toggle_div4');
		if (e.style.display == 'block')
			e.style.display = 'none';
		else
			e.style.display = 'block';
	}
}])



.controller('showTaskController', ['$http', '$rootScope', '$state', '$stateParams', function($http, $rootScope, $state, $stateParams) {
	$rootScope.header = 'views/header.html';
	var self = this
	$http.get(`http://localhost:3000/todo/showTask/${$stateParams.user_id}/${$stateParams.task_id}`).then(function(task) {
		console.log(task.data);
		self.task = task.data.task
		self.task_id = task.data.task_id
		self.user_id = task.data.user_id
		self.priority = task.data.priority
		self.due_date = task.data.due_date
		self.time = task.data.time
		self.description = task.data.description
	})

	this.edit = function() {
		var postObj = {
			user_id: $stateParams.user_id,
			task_id: $stateParams.task_id,
			task: self.task,
			priority: self.priority,
			due_date: self.due_date,
			time: self.time,
			description: self.description
		}
		$http.post('http://localhost:3000/todo/edit', postObj).then(function() {
			$state.go('todo')
		})
	}
}])


//   document.getElementById('button').onclick = function() {
//       this.__toggle = !this.__toggle;
//       var target = document.getElementById('hidden_content');
//       if( this.__toggle) {
//           target.style.height = target.scrollHeight+"px";
//           this.firstChild.nodeValue = "Hide content";
//       }
//       else {
//           target.style.height = 0;
//           this.firstChild.nodeValue = "Show content";
//       }
//   }
// }])
