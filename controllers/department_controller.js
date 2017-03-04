'use strict';
let Department = require('../models/database').department;
let helper = require('./helper');

module.exports = {
  findAll: (ctx, next) => {
    return Department.findAll().then((data) => {
      ctx.body = {ok: true, data};
      next();
    });
  },
  findOne: (ctx, next) => {
    return helper.findDepartment(ctx.params.id, ctx)
      .then((department) => {
        if (department) {
          ctx.body = { ok: true, data: department }
        }
        next();
      });
  },
  create: (ctx, next) => {
    return Department.create(ctx.request.body)
      .then((department) => {
        if (department) {
          ctx.status = 201;
          ctx.body = {ok: true, data: department};
        }
        next()
      });
  },
  update: (ctx, next) => {
    let id = ctx.params.id;
    return Department.update(ctx.request.body, { where: {id} })
      .then((result) => result && result[0] ? helper.findDepartment(id, ctx) : null)
      .then((department) => {
        ctx.body = department ? { ok: true, data: department } : ctx.body;
        next();
      })
  },
  delete: (ctx, next) => {
    let id = ctx.params.id;
    return Department.destroy({ where: {id} })
      .then((destroyedCount) => {
        if (destroyedCount) {
          ctx.body = { ok: true };
        } else {
          ctx.status = 404;
          ctx.body = { ok: false, message: 'Department not found '};
        }
        next();
      });
  }
};
