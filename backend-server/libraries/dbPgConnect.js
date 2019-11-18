require('dotenv').config();
const Sequelize = require('sequelize');
const { DB_URL } = require('../config');

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: false
});

const models = {
  Application: sequelize.import('../models/Application'),
  DataSource: sequelize.import('../models/DataSource'),
  TargetAudience: sequelize.import('../models/TargetAudience'),
  Contributor: sequelize.import('../models/Contributor'),
  User: sequelize.import('../models/User'),
  Phase: sequelize.import('../models/Phase'),
  Comment: sequelize.import('../models/Comment'),
  Rating: sequelize.import('../models/Rating'),
  Metrics: sequelize.import('../models/Metrics'),
  Support: sequelize.import('../models/Support')
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
