const express = require('express');
const app = express();

const routers = require('./api/routers/api-routers');

app.use('/orders',routers);

module.exports = app;