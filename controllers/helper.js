'use strict';
let Employee = require('../models/database').employee;
let Department = require('../models/database').department;

module.exports = {
  findDepartment: (id, ctx) => {
    return Department.findByPrimary(id).then((department) => {
      if (department) {
        return department;
      } else {
        ctx.status = 404;
        ctx.body = {ok: false, message: 'Department not found'};
        return null;
      }
    });
  },
  findEmployee: (id, ctx) => {
    return Employee.findByPrimary(id).then((employee) => {
      if (employee) {
        return employee;
      } else {
        ctx.status = 404;
        ctx.body = {ok: false, message: 'Employee not found'};
        return null;
      }
    });
  }
};