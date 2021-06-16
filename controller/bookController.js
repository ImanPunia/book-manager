const app = require('../app');
const BookDao = require('../dataAcessLayer/bookManagerDAO');
const Book = require('../model/book')

function handleSuccessError(err,success,res){
    if(err) {
        return res.send(err)
    } else {
        return res.send(success)
    }
}

/**
 * insert single book in database
 * @param {*} req request object
 * @param {*} res response object
 */
function addBooks(req,res){
    const bookData = req.body;
    const book = new Book(bookData.name, bookData.author,bookData.volume,bookData.copies);
    const bookDao = new BookDao(req.app.get('db'));
    bookDao.insertOneBook(book,handleSuccessError,res);
}

module.exports = addBooks;




