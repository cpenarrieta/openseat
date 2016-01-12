var assert = require('assert');
var distance = require('../algorithm/utility.js');

//example of using Mocha, just to make sure the testing suite works
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2 ,3].indexOf(5));
      assert.equal(-1, [1, 2,3].indexOf(0));
    });
  });
});

describe('utility', function() {
  before(function() {
    mockery.enable();
    mockery.registerAllowable('spherical');
  });

  it('should compute the distance between two sets of coordinates', function() {
    var firstDist =
    var secondDist = 
    var firstTime = 
    var secondTime = 
    var firstDays = 
    var secondDays =
  });

  it('should throw an error if the input is not in the correct format', function() {

  });

  it('should return an object of type number', function() {

  });

  it('should be accessible from other Node modules', function() {

  });

  after(function() {

  });
})