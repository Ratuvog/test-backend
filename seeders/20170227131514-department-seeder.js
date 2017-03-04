'use strict';

const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departments',
      new Array(5).fill(0).map(() => { return { name: faker.commerce.department() } }),
      {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('departments', null, {});
  }
};
