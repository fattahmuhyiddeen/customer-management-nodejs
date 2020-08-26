const db = require('../database');
const { Op } = require("sequelize");

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
  }).then(data => {
    res.send({ data });
  }).catch(function (error) {
    console.log(error)
    res.status(500).send({ error });
    return 0;
  });
}

function remove(req, res) {
  const id = req.params.id;
  db.task.destroy({ where: { id } })
    .then(data => {
      res.send({ data });
    });
}

function update(req, res) {
  const id = req.params.id;
  const body = req.body;
  console.log(body)
  // db.task.update(body, { where: { id } })
  //   .then(() => {
  //     res.send({ data: 'success' });
  //   })
  //   .catch((error) => {
  //     res.status(400).send({ error });
  //   })
}



module.exports = { getAll, remove, update };