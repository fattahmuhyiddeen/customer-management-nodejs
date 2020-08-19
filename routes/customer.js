var express = require('express');
var router = express.Router();
var Customer = require('../database/models/customer')

// Home page route.
router.get('/', function (req, res) {
  // res.send('page');
  Customer.create({
    name: 'ABC SDN',
    phone: '0143435345',
    email: 'aa@gmail.com',
    gps: '3.132,101.23435'
  }).then(data => {
    // Send created user to client
    res.send(data.id);
    // return data.id;
  }).catch(function (err) {
    console.log("create failed with error: " + err);
    return 0;
  });
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this system');
})

module.exports = router;