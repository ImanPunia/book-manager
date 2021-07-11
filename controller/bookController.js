const app = require('../app');
const BookDao = require('../dataAcessLayer/bookManagerDAO');
const Book = require('../model/book');
const BookResponse = require('../model/bookResponse');
const fs = require('fs'), path = require('path');


function handleSuccessError(err,success,res,books){
    if(err) {
        return res.send(err)
    } else {
        return fetchFiles(books,res);
     }
}

function fetchFiles(books,res){
    const bookData = [];
    books.forEach(book => {
        const _fileName = book.file.url;
        const file =  fs.readFileSync(_fileName).toString('base64');
        bookData.push(new BookResponse(book.name,book.author,book.copies,book.volume,book.file,file));
   })
  return res.send({'book':bookData});
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

function fetchBook(req,res){
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.fetchBooks(handleSuccessError,res);
}
module.exports = {addBooks , fetchBook};
