angular.module('selectDriverModule', ['ngMap'])

.controller('selectDriverCtrl', function($scope, $rootScope, $routeParams, Routes, NgMap){
    $(document).ready(function() {
      $('body').on('click', '#driverInfo' ,function() {
        console.log(this);
        $(this).removeClass('notChecked');
        $(this).addClass('checked');
      });
    });
    var passengerRouteId = $routeParams.id;
    $scope.driverRoutes = {};

    var initializeDriverRoutes = function(passengerRouteId){
      Routes.bestDriverRoutesForPassengerRouteId(passengerRouteId, function(driverRoutes){
        $scope.driverRoutes = driverRoutes;
      });
    };

    if (passengerRouteId) {
      initializeDriverRoutes(passengerRouteId);
    }

    NgMap.getMap().then(function (map) {
      $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBytwzUydYLU_mL4X0hN4WvGLDfTQkWNJs';
    });

    $scope.selectDriverRoute = function(driverRouteId){
      Routes.userInterestedInDriverRoute(passengerRouteId, driverRouteId);
      //TODO show something in the view that confirms the driverRoute was added
    };


  });