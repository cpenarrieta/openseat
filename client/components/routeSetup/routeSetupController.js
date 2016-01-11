angular.module('routeSetupModule', [])
	.controller('routeSetupCtrl', function(PostRoute, $scope, $rootScope) {
		var geocoder = initMap();
		$(document).ready(function() {
			$('body').click(function() {
				if ($('#isDriver').prop('checked')) {
					$(".driver").show();
				} else {
					$(".driver").hide();
				}
			});
		});

		$scope.submitRoute = function() {

			var monday = $('#monday').prop('checked');
			var tuesday = $('#tuesday').prop('checked');
			var wednesday = $('#wednesday').prop('checked');
			var thursday = $('#thursday').prop('checked');
			var friday = $('#friday').prop('checked');
			var saturday = $('#saturday').prop('checked');
			var sunday = $('#sunday').prop('checked');

			var routeObj = {};
			routeObj.days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
			routeObj.fromHour = Number($('#fromHour').val());
			routeObj.fromMinutes = Number($('#fromMinutes').val());
			routeObj.toHour = Number($('#toHour').val());
			routeObj.toMinutes = Number($('#toMinutes').val());
			routeObj.seats = Number($('#seats').val());
			routeObj.fee = Number($('#fee').val());
			routeObj.name = $rootScope.user.name;

			var newRoute = PostRoute.newRoute;
			var data = {};
			data.route = routeObj;
			data.userId = $rootScope.user._id;
			data.isDriver = $('#isDriver').prop('checked');

			geocodeAddressStart(geocoder, data, newRoute, function(geocoder, data, start, newRoute) {
				geocodeAddressEnd(geocoder, data, start, newRoute);
			});
		};
	});