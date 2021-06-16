var express = require('express');
var router = express.Router();

//controller module
const bookContoller  = require('../controller/bookController');

//book routes
router.post('/addBook',bookContoller);

module.exports = router;
