require('dotenv').config();
const Sequelize = require('sequelize');
const { DB_URL } = require('../config');

//connect to postgresql
const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: false
});

const models = {
  User: sequelize.import('../models/User')
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
