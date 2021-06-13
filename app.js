const express = require('express');
const bookRoutes = require('./routes/bookRouter');

const appConfig = express(),
    bodyParser = require("body-parser");
    port = 3080;

    appConfig.use(express.json());
    appConfig.use('/book',bookRoutes);

const app =  appConfig;

module.exports = app
