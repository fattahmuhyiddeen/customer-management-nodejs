const { Sequelize } = require('sequelize');

const db_url = process.env.DATABASE_URL;
const sequelize = new Sequelize(db_url, { logging: console.log });