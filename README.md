# openseat
## Heading ##
  OpenSeat

## Sub-Heading ##
  The ride-sharing app for tomorrow.

## Summary ##
  Find drivers who will take you on a convenient route.
  Find passengers to fill up empty seats in your car. 

## Problem ##
  Driving is inefficient: a lot of cars have empty seats, and a lot of people want to go to destinations best reached by car.

## Solution ##
  OpenSeat pairs up passengers with compatible drivers on routes and times that are convenient for both parties.

## Quote from You ##
"Get to where you're going with openSeat"

## How to Get Started ##
  Use your facebook account and add a route right away.

## Customer Quote ##
  "I can always get convenient rides to the places I need to go."

## Closing and Call to Action ##
  "To join the commute of tomorrow, go to OpenSeat right now!"



  #Technical details
    OpenSeat is built using the MEAN stack. The main points:

  Server-side:  We use an Express server and router. 

    Models:
  In the database, we store DriverRoutes, PassengerRoutes, and Users. Each PassengerRoute has a start and end (expressed as [longitude, latitude]), a startlabel and endlabel (each one a string representing the address), a days field (an array of 7 Boolean entries, representing whether the passenger is looking for a certain ride on that day of the week or not), and start time and end time of the desired trip, represented as fromHour, fromMinute, toHour, and toMinute. Example: looking for a ride within the window 7:10am to 8:40am would give us: {fromHour: 7, fromMinute: 10, toHour: 8, toMinute: 40}. 7pm is represented as 19 (military time). The model contains three references to other models: driverRoutesIAmInterestedIn is an array of driverRoutes, confirmedDriverRoute is a single driverRoute (the one this passenger has chosen), and passengerInformation refers to the User who created this route.

  The driverRoutes model is similar to the passengerRoute model, but also has 'seats' and 'fee' fields, numbers representing how many open seats the driver has to offer and how much for a ride respectively. In addition, because a driver can sell several seats, confirmedPassengerRoutes is an array of PassengerRoutes (whereas the confirmedDriverRoute in  a passengerRoute model is a single driverRoute).

  The user model has a facebook ID (since our authentication relies on facebook), a name, photo (taken from facebook), email, phone number, gender, a Boolean called 'isDriver' (right now, a given user can be only a passenger or a driver, but not both), and two arrays: an array of passengerRoutes and an array of driverRoutes associated with that user. (So that we can add functionality later to allow users to be both drivers and passengers.)

  Controllers / Interacting with database:
    There are two server-side controllers, one for routes and one for users. The routes controller exports several functions as middleware.
      1) userInterestedInDriverRoute: assume a request with a DriverRoute and a passengerRoute. We look up those routes in the database, add the passengerRoute to the prospectivePassengerRoutes field of the driver and add the driverRoute to the driverRoutesIAmInterestedIn field. These changes are saved to the database.

      2) driverConfirmsPassenger: assume a request with a DriverRoute and a passengerRoute. We look up those routes in the database, add the passengerRoute to the confirmedPassengerRoutes field in the DriverRoute model and set the confirmedDriverRoute to the given DriverRoute in the PassengerRoute model. We remove the DriverRoute from the RoutesIAmInterestedIn field and the passengerRoute from the prospectivePassengerRoutes field.

      3) bestDriverRoutesforPassengerRouteID: assume a request with a passengerRoute. We find that passengerRoute in the database, then call the utility distance function on each driverRoute with open seats. We push an object with the driverRoute, the distance to the given passengerRoute, and the driver to a temporary array. We sort the array by distance and send it to the client.

      4) insertPassengerRoute: utility function to add a passengerRoute to the database, updating the User.

      5) getPassengerRoutes: utility function to query the database for passengerRoutes and send all of them to the client.

      6) insertDriverRoute: utility function to add a driverRoute to the database, updating the User.

      7) getDriverRoutes: utility function to query the database for driverRoute and send all of them to the client.

      8) getPassengerRoutesForUserID: utility function to query the database for all passengerRoutes corresponding to a given user and send all of them to the client.

      9) getDriverRoutesForUserID: utility function to query the database for all driverRoutes corresponding to a given user and send all of them to the client.

    The users controller similarly exports several functions as middleware.
      1) getUsers: utility function to query the database for all users and send the results to the client.

      2) getUser: utility function to query the database for one user by id and send that user to the client.

      3) findByFacebookId: utility function to query the database for one user by facebook id and return result.

      4) create: utility function to create user in the database.

      5) insertTestData: generates Leonel Messi and Tim Cook as drivers in the database.

    Router: helpers.js has some utility functions for error handling, middleware has generally useful server-side utility functions, passport.js sets up authentication via facebook, and routes.js is a router. The paths correspond to the methods defined in our controllers above.

    Server: server.js requires the right node modules, connects to the database, and starts listening. Everything else is delegated to other files.

  Client-side:
    The $routeProvider module configures routes on the client side, drawing an authentication barrier around everything but the login site. Otherwise, there are /home ('Dashboard'), /createRoute ('create Route'), and /selectDriver:id ('select Driver', visible from Dashboard) paths.

    index.html is the main html page, an Angular template

    Services: We define several factories, stored in appServices.js, to give multiple controllers access to the functions that make AJAX requests to the server. The 'RenderUser' factory exports the functions: getUser, which retrieves a specific user from the database from an id; renderDriver, which binds a dummy driver to $scope; renderPassenger, which binds the data from a dummy user to $scope.

      The 'postRoute' factory exports the function newRoute, which checks whether the creator of a route is a driver or a passenger and then sends a POST request to the appropriate path (/api/driverRoute and /api/passengerRoute respectively). If the user is a passenger, then this function redirects the user to the selectDriver view as soon as the new passengerRoute has posted.

      The 'Routes' factory exports several functions: bestOfDriverRoutesForPassengerRouteId, userInterestedInDriverRoute, driverConfirmsPassenger, getPassengerRoutesForUserId, and getDriverRoutesForUserId. In each case, the client sends a request to the corresponding path on the server. For userInterestedInDriverRoute and driverConfirmsPassenger, these are POST requests; otherwise, GET requests.

    Components: each component consists of a paired controller and view to generate one of the pages according to the Angular template. 
      The dashboard controller checks whether the logged-in user is a passenger or a driver. Depending on the answer, the controller either binds the driverRoutes corresponding to that user or the passengerRoutes corresponding to that user to the scope. (Notice that the user is stored on $rootScope on authentication, so that the user is available to all controllers.) The dashboard view lists all the user's passengerRoutes (if the user is a passenger) or driverRoutes (if the user is a driver) with relevant fields for each route. If the user is a driver, confirmed and prospective passengers are also listed out here.

      The selectDriver controller uses ng-map as a dependency so that we can include rendered maps showing the route in the list of available drivers. It binds a list of driverRoutes to $scope in ascending order of distance. In the selectDriver view, we use the ng-repeat directive to iterate over the driverRoutes. For each driverRoute, the view displays relevant fields from the driverRoute model and a map, generated by the ng-map directive. The controller also binds the function selectDriverRoute to $scope, so that clicking on one driverRoute selects that route.

      The routeSetup controller binds a submitRoute method to $scope. This function takes the information from the form on the routeSetup view, builds a route object out of that information, and passes the resulting object to the 'geocoderStart' method, which calls the 'geocoderEnd' method. This last method invokes newRoute, sending the data to the server. We need the geocoder methods to convert an address from the form into coordinates that we can use to calculate distance, and we break this functionality into two separate methods for the two sets of coordinates to handle asynchronicity. The routeSetup view is a form with a submit button, and clicking on that submit button invokes the submitRoute method.