const app = require('../app');
const BookDao = require('../dataAcessLayer/bookManagerDAO');
const Book = require('../model/book');
const fs = require('fs'), path = require('path');


function handleSuccessError(err,success,res,book){
    if(err) {
        return res.send(err)
    } else {
        const _fileName = book[0].file.url;
        return fs.readFile(_fileName,function(err,data){
            if(err){
                console.log(err);
                res.send(err);
            } else {
                res.send({src: data.toString('base64')
                ,'book':book});
            }
        })
    }
}


/**
 * insert single book in database
 * @param {*} req request object
 * @param {*} res response object
 */
function addBooks(req,res){
    const bookData = JSON.parse(req.body.data);
    const imageData = req.file;
    const imageUrl = imageData.path;
    const imagetype = imageData.mimetype;
    const file = {url:imageUrl,mimetype: imagetype};
    const book = new Book(bookData.name, bookData.author,bookData.volume,bookData.copies,file);
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.insertOneBook(book,handleSuccessError,res);
}

module.exports = addBooks;
