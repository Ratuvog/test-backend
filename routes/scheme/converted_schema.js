'use strict';
const Ajv = require('ajv');

module.exports = (schema, options = { coerceTypes: true }) => {
  const ajv = new Ajv(options);
  const validate = ajv.compile(schema);

  return function (ctx, next) {
    const data = Object.assign({}, ctx.request.query, ctx.request.body, ctx.params);
    const isValid = validate(data);
    if (!isValid) {
      ctx.status = 422;
      ctx.body = { ok: false, message: 'Invalid inputs', error_description: validate.errors};
      return;
    }
    return next();
  }
};