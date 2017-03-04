'use strict';

const faker = require('faker');
const Department = require('../models/database').department;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Department.findAll()
      .then((departments) => {
        let ids = departments.map((d) => d.id);
        return queryInterface.bulkInsert('employees',
          new Array(15).fill(0).map(() => {
            return {
              firstName: faker.name.firstName(),
              lastName: faker.name.lastName(),
              departmentId: faker.random.arrayElement(ids)
            }
          }),
          {});
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees', null, {});
  }
};
