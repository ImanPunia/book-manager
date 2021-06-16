const app = require('../app');
const BookDao = require('../dataAcessLayer/bookManagerDAO');
const Book = require('../model/book')

function callBack(err,success,res){
    if(err) {
        return res.send(err)
    } else {
        return res.send(success)
    }
}

function addBooks(req,res){
    const bookData = req.body;
    const book = new Book(bookData.name, bookData.author,bookData.volume,bookData.copies);
    console.log(req.app.get('db'))
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.insertOneBook(book,callBack,res);
}

module.exports = addBooks;




