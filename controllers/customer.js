const db = require('../database');
function create(req, res) {
  const { name, phone, email, gps } = req.body;
  db.customer.create({
    name,
    phone,
    email,
    gps
  }).then(data => {
    console.log('data', data)
    // Send created user to client
    // res.send(data.id);
    res.send({ id: data.id });
  }).catch(function (err) {
    console.log("create failed with error: " + err);
    res.sendStatus(500);
    return 0;
  });
}

function getAll(req, res) {
  db.customer.findAll().then(data => {
    console.log('data', data)
    // Send created user to client
    // res.send(data.id);
    res.send({ data });
  }).catch(function (err) {
    console.log("create failed with error: " + err);
    res.sendStatus(500);
    return 0;
  });
}

module.exports = { create, getAll };