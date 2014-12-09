magic_mirror.controller('WeatherCtrl', ['$scope', '$timeout', '$http',
function WeatherCtrl($scope, $timeout, $http) {
	var weather = "loading forecast..."; // initialise the time variable
  $scope.tickInterval = 300000 //ms

  var iconTable = {
		'01d':'wi-day-sunny',
		'02d':'wi-day-cloudy',
		'03d':'wi-cloudy',
		'04d':'wi-cloudy-windy',
		'09d':'wi-showers',
		'10d':'wi-rain',
		'11d':'wi-thunderstorm',
		'13d':'wi-snow',
		'50d':'wi-fog',
		'01n':'wi-night-clear',
		'02n':'wi-night-cloudy',
		'03n':'wi-night-cloudy',
		'04n':'wi-night-cloudy',
		'09n':'wi-night-showers',
		'10n':'wi-night-rain',
		'11n':'wi-night-thunderstorm',
		'13n':'wi-night-snow',
		'50n':'wi-night-alt-cloudy-windy'
	}

  var tick = function() {
		$http.get('http://api.openweathermap.org/data/2.5/weather?q=Nuremberg,de&units=metric&lang=de').
		success(function(data, status, headers, config) {
				console.log(data);
				weather = angular.fromJson(data);

				$scope.sunrise = weather.sys.sunrise * 1000;
				$scope.sunset = weather.sys.sunset * 1000;
				$scope.temp = weather.main.temp;

				$scope.icon = iconTable[weather.weather[0].icon];
		}).
		error(function(data, status, headers, config) {
				weather = "Uuhps";
		});

		$http.get('http://api.openweathermap.org/data/2.5/forecast?q=Nuremberg,de&units=metric&lang=de').
		success(function(data, status, headers, config) {
				console.log(data);
				$scope.forecast = angular.fromJson(data);
		}).
		error(function(data, status, headers, config) {
				weather = "Uuhps";
		});
		

		$timeout(tick, $scope.tickInterval); // reset the timer
	};

	tick();
}]);

