'use strict'

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/config/config.js')[env];
const config = require('./config/config')
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize(process.env.DATABASE_URL, config[env])

// const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
//   host: env.DATABASE_HOST,
//   port: env.DATABASE_PORT,
//   dialect: env.DATABASE_DIALECT,
//   define: {
//     underscored: true
//   }
// });

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('./models/user.js')(sequelize, Sequelize);
db.customer = require('./models/customer.js')(sequelize, Sequelize);
db.task = require('./models/task.js')(sequelize, Sequelize);

//Relations
db.task.belongsTo(db.customer);
db.customer.hasMany(db.task);

module.exports = db;