angular.module('myApp.funController', [])

.controller('funController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var foo = this
	$http.get('https://snippetto.herokuapp.com/fun/getFun').then(function(obj) {
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
