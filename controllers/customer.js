const db = require('../database');
function create(req, res) {
  const { name, phone, email, google_map_link, address } = req.body;
  db.customer.create({
    name,
    phone,
    email,
    google_map_link,
    address
  }).then(data => {
    res.send({ data });
  }).catch(function (error) {
    console.log("create failed with error: " + error);
    res.status(500).send({ error });
    return 0;
  });
}

function getAll(req, res) {
  db.customer.findAll().then(data => {
    res.send({ data });
  }).catch(function (error) {
    console.log("create failed with error: " + error);
    res.status(500).send({ error });
    return 0;
  });
}
function getOne(req, res) {
  const id = req.params.id;
  db.customer.findOne({ where: { id } }).then(data => {
    res.send({ data });
  }).catch(function (error) {
    console.log("create failed with error: " + error);
    res.status(500).send({ error });
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
  const body = req.body;
  console.log(body)
  db.customer.update(body, { where: { id } })
    .then(() => {
      res.send({ data: 'success' });
    })
    .catch((error) => {
      res.status(400).send({ error });
    })
}



module.exports = { create, getAll, remove, update, getOne };