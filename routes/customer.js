var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')
// Home page route.
router.post('/', customer.create);
router.get('/', customer.getAll);
router.delete('/:id', customer.remove);
router.patch('/:id', customer.update);
module.exports = router;