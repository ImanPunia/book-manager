var express = require('express');
var router = express.Router();

//controller module
const bookContoller  = require('../controller/bookController');

//book routes
router.post('/addBook',bookContoller.addBooks);
router.get('/fetchBooks', bookContoller.fetchBook);
router.delete('/deleteBook/:id' , bookContoller.deleteBook);

module.exports = router;
