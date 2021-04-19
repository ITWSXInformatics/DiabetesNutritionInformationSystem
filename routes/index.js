const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const HealthCheck = require('../models/HealthCheck');


router.get('/', (req,res) => res.render('index', {
  scripts: ['js/index.js']
}));

router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
  scripts: ['js/dashboard.js'],
  user: req.user
}));

router.post('/dailyHealthCheck/add', ensureAuthenticated, (req, res) => {
  const uid = req.user._id;
  const {date, carbohydrate, fat, protein, caffeine, alcohol, water, light, high, sleep, stress, temperature, altitude} = req.body;

  let addHealthCheckErrors = [];
  
  HealthCheck.findOne({ uid: uid, date: date })
  .then(healthCheck => {
    if(healthCheck){
      addHealthCheckErrors.push({ msg: "Error: A Health Check for this date already exists." });
      res.render('dashboard', {
        scripts: ['js/dashboard.js'],
        user: req.user,
        addHealthCheckErrors,
        date, carbohydrate, fat, protein, caffeine, alcohol, water, light, high, sleep, stress, temperature, altitude
      });
    }else{
      const newHealthCheck = new HealthCheck({
        uid,
        date,
        carbohydrate, fat, protein, caffeine, alcohol, water, light, high, sleep, stress, temperature, altitude
      });
      newHealthCheck.save().then(healthCheck => {
        req.flash('success_msg', 'Successfully added Health Check.');
        res.redirect('/dashboard');
      }).catch(err => console.log(err));
    }
  })
});

module.exports = router;