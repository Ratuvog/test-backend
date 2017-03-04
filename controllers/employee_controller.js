'use strict';
let Employee = require('../models/database').employee;
let helper = require('./helper');

module.exports = {
  findAll: (ctx, next) => {
    return Employee.findAll().then((data) => {
      ctx.body = { ok: true, data };
      next();
    });
  },
  findOne: (ctx, next) => {
    return helper.findEmployee(ctx.params.id, ctx)
      .then((employee) => {
        ctx.body = employee ? { ok: true, data: employee } : ctx.body;
        next();
      });
  },
  create: (ctx, next) => {
    let params = ctx.request.body;
    return helper.findDepartment(params.departmentId, ctx)
      .then((department) => department ? Employee.create(params) : null)
      .then((employee) => {
        if (employee) {
          ctx.status = 201;
          ctx.body = {ok: true, data: employee};
        }
        next();
      });
  },
  update: (ctx, next) => {
    let params = ctx.request.body;
    let id = ctx.params.id;

    let flow = Promise.resolve(true);
    if (params.departmentId) {
      flow = flow.then(() => helper.findDepartment(params.departmentId, ctx));
    }
    return flow
      .then((ok) => ok ? Employee.update(params, { where: {id} }) : null)
      .then((result) => result && result[0] ? helper.findEmployee(id, ctx) : null)
      .then((employee) => {
        ctx.body = employee ? { ok: true, data: employee } : ctx.body;
        next();
      })
  },
  delete: (ctx, next) => {
    let id = ctx.params.id;

    return Employee.destroy({ where: {id} })
      .then((destroyedCount) => {
        if (destroyedCount) {
          ctx.body = { ok: true };
        } else {
          ctx.status = 404;
          ctx.body = { ok: false, message: 'Employee not found '};
        }
        next();
      });
  }
};
