const Sequelize = require('sequelize');
const fs = require('fs');
const path = require("path");
const env = process.env.NODE_ENV || 'dev';
const conf = require('../config/config.json')[env];

const sequelize = new Sequelize(conf.database, conf.username, conf.password, conf);

var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "database.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
