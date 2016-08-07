angular.module('myApp.weatherController', [])


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
