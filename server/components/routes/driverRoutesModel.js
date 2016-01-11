var mongoose = require('mongoose');

var DriverRoutesSchema = new mongoose.Schema({
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
  seats: Number,
  fee: Number,
  prospectivePassengerRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passengerRoutes' }],
  confirmedPassengerRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passengerRoutes' }],
  driverInformation: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('driverRoutes', DriverRoutesSchema);