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
    required: ['name'],
    properties: {
      name: { type: 'string', pattern: '.{1,255}' }
    }
  }),
  update: schema({
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string', pattern: '.{1,255}' }
    }
  })
};
