angular.module('myApp.funController', [])

.controller('funController', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
	var foo = this
	this.quoteFun = function () {
		$http.get('https://snippetto.herokuapp.com/fun/getQuote').then(function(obj) {
			console.log(obj);
			if (obj.data.quoteText.length > 0) {
				foo.quote = obj.data.quoteText
			}  else {
				foo.quote = 'If I have seen further, it is by standing on the shoulders of giants.'
			}
			foo.author = obj.data.quoteAuthor
		})
	}

		$http.get('https://snippetto.herokuapp.com/fun/getWord').then(function(obj2) {
			foo.word = obj2.data.word
			foo.definition = obj2.data.definitions[0].text
			foo.pof = obj2.data.definitions[0].partOfSpeech
			foo.example = obj2.data.examples[0].text
			console.log('example: ',obj2.data);

		})


		this.adviceFun = function () {
			$http.get('https://snippetto.herokuapp.com/fun/getAdvice').then(function(obj3) {
				foo.advice = obj3.data.slip.advice
				console.log('advice: ', foo.advice);
			})
		}

		this.chuckFun = function () {
			$http.get('https://snippetto.herokuapp.com/fun/getChuck').then(function(obj4) {
				foo.chuckNorris = obj4.data.value
				console.log('chuck: ',foo.chuckNorris);
			})
		}


  this.toggleVisibility = function (id) {
    var e = document.getElementById(id);
		if (e.style.display == 'block')
			e.style.display = 'none';
		else
			e.style.display = 'block';
  }


	this.cat = function (){
		$http.get('https://snippetto.herokuapp.com/fun/getCat').then(function(data) {
			foo.catFact = data.data.facts[Math.floor(Math.random() * 100)]
		})
	}

	this.math = function () {
		$http.get('https://snippetto.herokuapp.com/fun/getNumber').then(function(data) {
			foo.mathFact = data.data
		})
	}

	this.trivia = function () {
		$http.get('https://snippetto.herokuapp.com/fun/getTrivia').then(function(data) {

			foo.triviaQuestion = data.data[0].question
			foo.triviaAnswer = data.data[0].answer.split('').reverse().join('')

		})
	}

	this.startUp = function () {
		$http.get('https://snippetto.herokuapp.com/fun/getStartUp').then(function(data) {

			foo.startUpThat = data.data.that
			foo.startUpThis = data.data.this
		})
	}

}])
