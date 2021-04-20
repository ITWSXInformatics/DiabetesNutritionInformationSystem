const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const HealthCheck = require('../models/HealthCheck');


router.get('/', (req,res) => res.render('index', {
  scripts: ['js/index.js']
}));

router.get('/dashboard', ensureAuthenticated, (req, res) => {

  function getHealthChecks(){
    HealthCheck.find({ uid: req.user._id }).then((healthchecks) => {
      res.render('dashboard', {
        healthchecks: healthchecks,
        scripts: ['js/dashboard.js'],
        user: req.user
      });
    }).catch((err) => {console.log(err)})
  }

  getHealthChecks();

});

router.post('/dailyHealthCheck/add', ensureAuthenticated, (req, res) => {
  const uid = req.user._id;
  console.log(req.body);
  var {date, carbohydrate, fat, protein, caffeine, alcohol, water, light, high, sleep, stress, hypoglycemia, infusion, temperature, altitude} = req.body;
  (hypoglycemia == 'on') ? hypoglycemia = true : hypoglycemia = false;
  (infusion == 'on') ? infusion = true : infusion = false;

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
        carbohydrate, fat, protein, caffeine, alcohol, water, light, high, sleep, stress, hypoglycemia, infusion, temperature, altitude
      });
      newHealthCheck.save().then(healthCheck => {
        req.flash('success_msg', 'Successfully added Health Check.');
        res.redirect('/dashboard');
      }).catch(err => console.log(err));
    }
  })
});

router.post('/dailyHealthCheck/delete', ensureAuthenticated, (req, res) => {
  let uid = req.user._id;
  let date = req.body.date;
  HealthCheck.deleteOne({ uid: uid, date: date }).then((hc) =>{
    req.flash('success_msg', 'Successfully deleted health check.');
    res.send();
  }).catch((err) => {console.log(err)})
});

module.exports = router;