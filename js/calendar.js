magic_mirror.controller('CalendarCtrl', ['$scope', '$timeout',
function CalendarCtrl($scope, $timeout) {
    $scope.events = ["loading events..."]; // initialise the time variable
    $scope.tickInterval = 1800000 //ms

    var tick = function() {
        $scope.events = [] // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    tick();
}]);