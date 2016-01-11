var mongoose = require('mongoose');

var PassengerRoutesSchema = new mongoose.Schema({
  start: [Number],
  end: [Number],
  startLabel: String,
  endLabel: String,
  days: [{
    type: Boolean,
    default: [false, false, false, false, false, false, false]
  }],
  fromHour: {min: 0, max: 24, type: Number},
  fromMinutes: {min: 0, max: 60, type: Number},
  toHour: {min: 0, max: 24, type: Number},
  toMinutes: {min: 0, max: 60, type: Number},

  name: String,
  driverRoutesIAmInterestedIn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'driverroutes' }],
  confirmedDriverRoute: {type: mongoose.Schema.Types.ObjectId, ref: 'driverroutes'}

  passengerInformation: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('passengerRoutes', PassengerRoutesSchema);