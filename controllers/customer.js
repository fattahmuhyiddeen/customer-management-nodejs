const db = require('../database');
function create(req, res) {
  const { name, phone, email, gps } = req.body;
  db.customer.create({
    name,
    phone,
    email,
    gps
  }).then(data => {
    res.send({ id: data.id });
  }).catch(function (err) {
    console.log("create failed with error: " + err);
    res.sendStatus(500);
    return 0;
  });
}

function getAll(req, res) {
  db.customer.findAll().then(data => {
    res.send({ data });
  }).catch(function (err) {
    console.log("create failed with error: " + err);
    res.sendStatus(500);
    return 0;
  });
}

function remove(req, res) {
  const id = req.params.id;
  db.customer.destroy({ where: { id } })
    .then(data => {
      res.send({ data });
    });
}

function update(req, res) {
  const id = req.params.id;
  const { updates } = req.body;
  db.customer.find({ where: { id } })
    .then(c => c.updateAttributes(updates)).then(data => {
      res.send({ data });
    });
}



module.exports = { create, getAll, remove, update };