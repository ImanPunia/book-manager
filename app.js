const express = require('express');
const bookRoutes = require('./routes/bookRouter');
const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'images');
    },
    filename: (req,file,callback) => {
        callback(null,Math.random()+'-'+file.originalname);
    }
})


const appConfig = express(),
    bodyParser = require("body-parser");
    port = 3080;
    
    appConfig.use(express.json());
    appConfig.use(multer({storage:imageStorage}).single('file'));
    appConfig.use('/book',bookRoutes);

const app =  appConfig;

module.exports = app
