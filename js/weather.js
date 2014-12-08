magic_mirror.controller('WeatherCtrl', ['$scope', '$timeout', '$http',
function WeatherCtrl($scope, $timeout, $http) {
    $scope.weather = "loading forecast..."; // initialise the time variable
    $scope.tickInterval = 1800000 //ms

    var tick = function() {
			$http.get('http://api.openweathermap.org/data/2.5/weather?q=Nuremberg,de&units=metric&lang=de').
			success(function(data, status, headers, config) {
				console.log(data);
				$scope.weather = angular.fromJson(data);
			}).
			error(function(data, status, headers, config) {
				$scope.weather = "Uuhps";
			});
		$timeout(tick, $scope.tickInterval); // reset the timer
	};

	tick();
}]);