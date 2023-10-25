// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  bookedBy: {
    type: String,
    default: null,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
