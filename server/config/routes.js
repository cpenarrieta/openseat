var usersController = require('./../components/users/usersController');
var routesController = require('./../components/routes/routesController');
var passport = require('./passport');
var helpers = require('./helpers');

module.exports = function (app, express) {
  app.get('/api/keepalive', function(req, res){
    res.status(200).json({message: "all ok from the server"});
  });

  app.get('/api/users', usersController.getUsers);
  app.get('/api/users/:id', usersController.getUser);
  //typo: changed insertestData to insertTestData
  app.get('/api/insertTestData', usersController.insertTestData);

  app.post('/api/userInterestedInDriverRoute', routesController.userInterestedInDriverRoute);
  app.post('/api/driverConfirmsPassenger', routesController.driverConfirmsPassenger);

  app.post('/api/passengerRoute', routesController.insertPassengerRoute);
  app.get('/api/passengerRoute', routesController.getPassengerRoutes);
  app.get('/api/passengerRoute/:userId', routesController.getPassengerRoutesForUserId);

  app.post('/api/driverRoute', routesController.insertDriverRoute);
  app.get('/api/driverRoute', routesController.getDriverRoutes);
  app.get('/api/driverRoute/:userId', routesController.getDriverRoutesForUserId);

  app.get('/api/bestDriverRoutesForPassengerRouteId/:id', routesController.bestDriverRoutesForPassengerRouteId);

  app.get('/api/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.get('/api/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile'] }),
    function(req, res){});

  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/#/login' }),
    function(req, res) {
      res.redirect('/#/');
    });

  app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/#/login');
  });

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};