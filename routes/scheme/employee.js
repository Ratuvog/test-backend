'use strict';
const schema = require('./converted_schema');

const findObjectSchema = schema({
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number' }
  }
});

module.exports = {
  findOne: findObjectSchema,
  delete: findObjectSchema,
  create: schema({
    type: 'object',
    required: ['firstName', 'lastName', 'departmentId'],
    properties: {
      firstName: { type: 'string', pattern: '.{1,255}' },
      lastName: { type: 'string', pattern: '.{1,255}' },
      departmentId: { type: 'number' }
    }
  }),
  update: schema({
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
      firstName: { type: 'string', pattern: '.{1,255}' },
      lastName: { type: 'string', pattern: '.{1,255}' },
      departmentId: { type: 'number' }
    }
  })
};
