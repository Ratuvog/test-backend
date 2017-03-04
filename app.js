'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = module.exports =  new Koa();
const router = require('./routes/root');

require('./models/database');

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Application run at port: ' + PORT));