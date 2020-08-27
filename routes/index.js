var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer');
const task = require('../controllers/task');
// Home page route.
router.post('/customer', customer.create);
router.get('/customer', customer.getAll);
router.get('/task', task.getAll);
router.get('/customer/:id', customer.getOne);
router.get('/task/:id', task.getOne);
router.get('/task/:id', task.getOne);
router.delete('/customer/:id', customer.remove);
router.delete('/task/:id', task.remove);
router.post('/customer/:id', customer.update);
module.exports = router;