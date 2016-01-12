angular.module('dashboardModule', [])

.controller('renderUserCtrl', function($scope, RenderUser, $rootScope, Routes) {


	// This function takes an array of routes and iterates over it replacing the array of booleans
	// that represend the days and returns a string with the requested days.

	var setDays = function(arrayOfRoutes, isDriver) {
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		for (var i = 0; i < arrayOfRoutes.length; i++) {
			if (isDriver) {
				setDays(arrayOfRoutes[i].confirmedPassengerRoutes);
				setDays(arrayOfRoutes[i].prospectivePassengerRoutes);
			}
			if (arrayOfRoutes[0]) {
				arrayOfRoutes[i].days = arrayOfRoutes[i].days.reduce(function(memo, day, index) {
					if (day) {
						memo = memo.concat(days[index] + ' ');
					}
					return memo;
				}, '');
			}
		}
		return arrayOfRoutes;
	};

	var initializePassengerRoutes = function(passengerId) {
		Routes.getPassengerRoutesForUserId(passengerId, function(passengerRoutes) {
      console.log('passengerRoutes', passengerRoutes);
			$scope.passengerRoutes = setDays(passengerRoutes);
		});
	};

	var initializeDriverRoutes = function(driverId) {
		Routes.getDriverRoutesForUserId(driverId, function(driverRoutes) {
      console.log('driverRoutes', driverRoutes);
			$scope.driverRoutes = setDays(driverRoutes, true);
		});
	};

	$scope.deleteConfirmedPassenger = function(passengerRouteId) {};

	$scope.confirmPassenger = function(passengerRouteId, driverRouteId) {
		var currArr = this.$parent.route.prospectivePassengerRoutes;
		for(var i = 0; i < currArr.length; i++){
			if (currArr[i]._id === passengerRouteId) {
				var addedRoute = this.$parent.route.prospectivePassengerRoutes.splice(i, 1);
				this.$parent.route.confirmedPassengerRoutes.push(addedRoute);
		}

		}
		Routes.driverConfirmsPassenger(driverRouteId, passengerRouteId, function() {
			initializeDriverRoutes($rootScope.user._id);
		});
	};


	$scope.username = 'Hello ' + $rootScope.user.name;
	if ($rootScope.user.IsDriver) {
		initializeDriverRoutes($rootScope.user._id);
	} else {
		initializePassengerRoutes($rootScope.user._id);
	}
});