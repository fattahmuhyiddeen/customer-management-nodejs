var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')
// Home page route.
router.post('/customer', customer.create);
router.get('/customer', customer.getAll);
router.get('/customer/:id', customer.getOne);
router.delete('/customer/:id', customer.remove);
router.post('/customer/:id', customer.update);
module.exports = router;