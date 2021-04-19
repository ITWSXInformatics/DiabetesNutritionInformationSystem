const mongoose = require('mongoose');

const HealthCheckSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  carbohydrate: {
    type: String,
  },
  fat: {
    type: String
  },
  protein: {
    type: String
  },
  caffeine: {
    type: String
  },
  alcohol: {
    type: String
  },
  water: {
    type: String
  },
  light: {
    type: String
  },
  high: {
    type: String
  },
  sleep: {
    type: String
  },
  stress: {
    type: String
  },
  temperature: {
    type: String
  },
  altitude: {
    type: String
  }
});

const HealthCheck = mongoose.model('HealthCheck', HealthCheckSchema);
module.exports = HealthCheck;