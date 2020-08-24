const db = require('../database');
const moment = require('moment');
const task = require('../database/models/task');
function create(req, res) {
  const { name, phone, email, google_map_link, service, address, frequency, start_date, end_date } = req.body;
  db.customer.create({
    name,
    phone,
    email,
    google_map_link,
    address,
    service,
    frequency,
    start_date,
    end_date
  }).then(data => {
    if (!!frequency && !!start_date && !!end_date) {
      let num = 0;
      let unit = '';
      if (frequency == 'once') {
        // unit = 'w';
        // num = 2;
      } else if (frequency == '2weeks') {
        unit = 'w';
        num = 2;
      } else if (frequency == '1month') {
        unit = 'M';
        num = 1;
      } else if (frequency == '2months') {
        unit = 'M';
        num = 2;
      } else if (frequency == '3months') {
        unit = 'M';
        num = 3;
      } else if (frequency == '4months') {
        unit = 'M';
        num = 4;
      }

      console.log('unit', unit)
      console.log('num', num)


      const tasks = [{ CustomerId: data.id, date: start_date }];
      let iterate_date = moment(start_date).clone();
      while (iterate_date.isSameOrBefore(end_date)) {
        iterate_date = iterate_date.add(num, unit);
        tasks.push({ CustomerId: data.id, date: iterate_date.format('YYYY-MM-DD') });
      }

      console.log('tasks', tasks)

      db.task.bulkCreate(tasks).then(() => {
        res.send({ data });

      }).catch(function (error) {
        console.log("create failed with error: " + error);
        res.status(500).send({ error });
      });

    }
  }).catch(function (error) {
    console.log("create failed with error: " + error);
    res.status(500).send({ error });
    return 0;
  });

}

function getAll(req, res) {
  db.customer.findAll({
    order: [
      ['id', 'DESC'],
    ],
  }).then(data => {
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
  const { name, phone, email, google_map_link, address, service, frequency, start_date, end_date } = req.body;
  db.customer.update({
    name,
    phone,
    email,
    google_map_link,
    address,
    frequency,
    start_date,
    end_date,
    service
  }, { where: { id } })
    .then(() => {
      res.send({ data: 'success' });
    })
    .catch((error) => {
      res.status(400).send({ error });
    })
}



module.exports = { create, getAll, remove, update, getOne };