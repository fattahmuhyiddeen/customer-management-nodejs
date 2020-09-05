const db = require('../database');
const { Op } = require("sequelize");

function create(req, res) {
  const { customer_id, date, description, status } = req.body;
  db.task.create({ CustomerId: customer_id, date, description, status }).then(data => res.send({ data }))
    .catch(error => res.status(500).send({ error }));
}
function getAll(req, res) {
  const { from, to } = req.query;
  let params = {}
  if (!!from && !!to) {
    params = {
      where: {
        date: {
          [Op.between]: [from, to]
        }
      }
    }
  }
  db.task.findAll({
    ...params,
    include: [{
      model: db.customer,
      required: true
    }]
  }).then(data => res.send({ data }))
    .catch(e => res.status(500).send({ error: e }));
}

function remove(req, res) {
  const { id } = req.params;
  db.task.destroy({ where: { id } })
    .then(data => res.send({ data }))
    .catch(e => res.status(400).send({ error: e }));
}

function update(req, res) {
  const { id } = req.params;
  const { date, description, status } = req.body;
  db.task.update({ date, description, status }, { where: { id } })
    .then(d => res.send({ data: d }))
    .catch((error) => res.status(400).send({ error }))
}

function getOne(req, res) {
  const { id } = req.params;
  db.task.findOne({ where: { id }, include: db.customer })
    .then(data => res.send({ data }))
    .catch(e => res.status(500).send({ error: e }));
}


module.exports = { getAll, remove, update, getOne, create };