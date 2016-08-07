angular.module('myApp.trafficController', [])

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
  serverObject.currentTime = (Date.now() / 1000);

	this.trafficSwitch = false;
	// this.trafficAddNewAddress = false;
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
		selfTraffic.durationToDestination = data.data.durationInTraffic.text;
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

	this.showSaveNewAddress = function(address){
		this.trafficAddNewAddress = true;
	}

	this.workAddGet = function(address) {
		if($rootScope.user_id){
			address.id = $rootScope.user_id;
		}else{ //TODO : REMOVE THIS
			address.id = 12; //REMOVE
		}//REMOVE
		$rootScope.workAddress = address;
		$http.post('http://localhost:3000/traffic/setAddress', $rootScope.workAddress).then(function(some) {
			this.trafficAddNewAddress = false;
			console.log(some);
		})
	}

}])
