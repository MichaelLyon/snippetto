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

      // console.log('example: ',obj2.data);

		})

	$http.get('http://api.adviceslip.com/advice').then(function(obj3) {
		foo.advice = obj3.data.slip.advice


	})
	$http.get('https://api.chucknorris.io/jokes/random').then(function(obj4) {
		foo.chuckNorris = obj4.data.value
	})

	$http.get('http://catfacts-api.appspot.com/api/facts?number=100').then(function(catObj) {

		foo.catFact = catObj.data.facts[Math.ceil(Math.random()*100)]	;
	})



	$http.get('http://jservice.io/api/random').then(function(triviaObj) {
		foo.triviaAnswer = (triviaObj.data[0].answer).split('').reverse().join('');
		foo.triviaQuestion = triviaObj.data[0].question;
	})

	$http.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC').then(function(giffObj) {
		foo.randomGiff = giffObj.data.data[Math.floor(Math.random()*24)+1].embed_url;
		console.log(foo.randomGiff);
		//<iframe src="//giphy.com/embed/3o6Zt8esE7mxFelmdG" width="480" height="720" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
	})

	$http.get('http://pokeapi.co/api/v2/pokemon/'+(Math.floor(Math.random()*152)+1)+'/').then(function(pokemonObj) {
		console.log(pokemonObj.data);
		foo.pokemonName = pokemonObj.data.name;
		foo.pokemonImage = pokemonObj.data.sprites.front_default;
	})

	$http.get('http://itsthisforthat.com/api.php?json').then(function(startUpObj) {
		console.log(startUpObj);
		foo.startUpThat = startUpObj.data.that;
		foo.startUpThis = startUpObj.data.this;
	})

this.makeCallMath = function(){
	$http.get('http://numbersapi.com/'+(Math.ceil(Math.random()*1000))+'/math').then(function(mathObj) {
		foo.mathFact = mathObj.data
	})
}
	this.toggleVisibility = function (id) {
    console.log(id);

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
