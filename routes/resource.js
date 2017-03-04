'use strict';
const Router = require('koa-router');

const defaultMethods = {
  findAll: ['get', '/'],
  findOne: ['get', '/:id'],
  create: ['post', '/'],
  update: ['put', '/:id'],
  delete: ['delete', '/:id']
};

module.exports = (parent, prefix, ctrl, scheme = [], methods = Object.keys(defaultMethods)) => {
  let router = new Router();

  const allowed = Object.keys(defaultMethods);

  methods
    .filter(method => allowed.includes(method))
    .forEach((method) => {
      const action = defaultMethods[method][0];
      const path = defaultMethods[method][1];
      if (scheme.hasOwnProperty(method)) {
        router = router[action]('', path, scheme[method], ctrl[method]);
      } else {
        router = router[action](path, ctrl[method]);
      }

    });

  parent.use(prefix, router.routes(), router.allowedMethods());

  return router;
};