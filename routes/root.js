'use strict';
const Router = require('koa-router');
const createResource = require('./resource');

const employeeController = require('../controllers/employee_controller');
const employeeScheme = require('./scheme/employee');

const departmentController = require('../controllers/department_controller');
const departmentScheme = require('./scheme/department');

let root = new Router({prefix: '/api'});

createResource(root, '/employees', employeeController, employeeScheme);
createResource(root, '/departments', departmentController, departmentScheme);

module.exports = root;
