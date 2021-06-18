const express = require('express');
const bookRoutes = require('./routes/bookRouter');
const multer = require('multer');

const appConfig = express(),
    bodyParser = require("body-parser");
    port = 3080;

    appConfig.use(express.json());
    appConfig.use(multer().single('file'));
    appConfig.use('/book',bookRoutes);

const app =  appConfig;

module.exports = app
