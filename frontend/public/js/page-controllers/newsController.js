angular.module('myApp.newsController', [])



.controller('newsController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var self = this
  this.currentArticles = true
	this.main = true
	this.saved = false
	this.currentSection = 'home'
	this.prefTabs = false
	if ($rootScope.username) {
		$http.post('https://snippetto.herokuapp.com/news/getPreferences', {
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
		self.stories = data.data.results.map(function(elem) {
      if (elem.multimedia[0]) {
        return elem
      } else {
        elem.multimedia.push({url: 'images/dog-black-small.png'})
        return elem
      }
    });
	})

	this.updateNewsPage = function(section) {
		$http.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=6acc556fbac84c2aa266476c82b9d4f2`).then(function(data) {
      self.stories = data.data.results.map(function(elem) {
        if (elem.multimedia[0]) {
          return elem
        } else {
          elem.multimedia.push({url: 'images/dog-black-small.png'})
          return elem
        }
      });
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
		var preferences = document.getElementsByClassName('custom-control-input')
		for (var i = 0; i < preferences.length; i++) {
			if (preferences[i].checked) {
				postObj[preferences[i].name] = preferences[i].name
			}
		}
		$http.post('https://snippetto.herokuapp.com/news/setPreferences', postObj).then(function() {
			$state.reload()
		})
	}

	this.showSectionSelections = function() {
		self.showPrefs = true
	}

	this.saveArticle = function(img, section, title, url, abstract, event) {
		document.getElementById(event.target.id).className += ' saved-article'
		var postObj = {
			user_id: $rootScope.user_id,
			image: img,
			section: section,
			title: title,
			url: url,
			abstract: abstract.replace(/'/, '')
		}
		$http.post('https://snippetto.herokuapp.com/news/save', postObj).then(function() {
			console.log('post successful');
		})
	}

	this.deleteArticle = function(article) {
		var postObj = {
			user_id: $rootScope.user_id,
			title: article
		}
		$http.post('https://snippetto.herokuapp.com/news/deleteArticle', postObj).then(function() {
			self.getSavedArticles()
		})
	}

	this.getSavedArticles = function() {
		self.searchPage = false
    self.prefTabs = false
		$http.post('https://snippetto.herokuapp.com/news/retrieveArticles', {
			user_id: $rootScope.user_id
		}).then(function(data) {
			self.stories = data.data
      console.log(self.stories);
		})
		this.main = false
		this.saved = true
	}

	this.getCurrentArticles = function() {
		self.searchPage = false
    self.currentArticles = true
		$state.reload()
	}

	this.switchToSearh = function() {
		self.searchPage = true
	}

	this.searchArticles = function(search) {
		$http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a04d3cbd56d94daba43213c5277372a6&q=' + search + '&sort=newest').then(function(data) {
			self.searchArticleResults = data.data.response.docs.map(function(elem) {
				if (elem.multimedia[0]) {
					elem.multimedia[0].url = 'images/dog-black-small.png'
					elem.pub_date = elem.pub_date.toString().substring(0, 10)
					return elem
				} else {
					elem.multimedia.push({url: 'images/dog-black-small.png'})
					elem.pub_date = elem.pub_date.toString().substring(0, 10)
					return elem
				}
			})
		})
	}





}])
