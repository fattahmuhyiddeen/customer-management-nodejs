var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')
// Home page route.
router.post('/', customer.create);

// About page route.
router.get('/about', function (req, res) {
  res.send('About this system');
})

module.exports = router;