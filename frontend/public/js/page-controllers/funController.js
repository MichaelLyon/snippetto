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
      // console.log('example: ',obj2.data);

		})
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
}])
