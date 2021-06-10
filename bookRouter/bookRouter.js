const express = require("express");
const router = express.Router();

router.use((req, res , next) => {
    console.log('request was made at :' , Date.now())
    next();
})

router.get('/',(req,res) => {
    res.send('welcome');
}) 

router.get('/books',(req,res) => {
    res.send('books are fetched successfully');
})




module.exports = router;
