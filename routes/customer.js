var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')
// Home page route.
router.post('/', customer.create);
router.get('/', customer.getAll);
module.exports = router;